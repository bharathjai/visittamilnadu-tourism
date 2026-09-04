-- Migration: Initial Schema for VisitTamilNadu Tourism Platform

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user', 'admin')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles
  FOR SELECT USING (true);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Auto-create profile trigger on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, COALESCE(new.raw_user_meta_data->>'full_name', 'Traveler'), 'user');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();


-- 2. PACKAGES TABLE
CREATE TABLE IF NOT EXISTS public.packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  images TEXT[] NOT NULL DEFAULT '{}',
  location TEXT NOT NULL,
  category TEXT NOT NULL,
  duration_days INT NOT NULL DEFAULT 1,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  itinerary JSONB NOT NULL DEFAULT '[]'::jsonb,
  inclusions TEXT[] NOT NULL DEFAULT '{}',
  exclusions TEXT[] NOT NULL DEFAULT '{}',
  avg_rating NUMERIC(3, 2) NOT NULL DEFAULT 5.0,
  is_featured BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Packages are viewable by everyone" ON public.packages
  FOR SELECT USING (true);

CREATE POLICY "Only admins can insert packages" ON public.packages
  FOR INSERT WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can update packages" ON public.packages
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Only admins can delete packages" ON public.packages
  FOR DELETE USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 3. PACKAGE AVAILABILITY TABLE
CREATE TABLE IF NOT EXISTS public.package_availability (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  total_slots INT NOT NULL DEFAULT 10,
  booked_slots INT NOT NULL DEFAULT 0,
  CONSTRAINT unique_package_date UNIQUE(package_id, date)
);

ALTER TABLE public.package_availability ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Availability viewable by everyone" ON public.package_availability
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage package availability" ON public.package_availability
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 4. BOOKINGS TABLE
CREATE TABLE IF NOT EXISTS public.bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference TEXT UNIQUE NOT NULL,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE RESTRICT,
  travel_date DATE NOT NULL,
  travelers JSONB NOT NULL DEFAULT '{"adults": 1, "children": 0}'::jsonb,
  total_price NUMERIC(10, 2) NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed' CHECK (status IN ('confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own bookings or admins view all" ON public.bookings
  FOR SELECT USING (
    auth.uid() = user_id OR EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );

CREATE POLICY "Users can create bookings for themselves" ON public.bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

CREATE POLICY "Users can cancel their own bookings or admins update all" ON public.bookings
  FOR UPDATE USING (
    auth.uid() = user_id OR EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 5. REVIEWS TABLE
CREATE TABLE IF NOT EXISTS public.reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  package_id UUID NOT NULL REFERENCES public.packages(id) ON DELETE CASCADE,
  rating INT NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews viewable by everyone" ON public.reviews
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can post reviews" ON public.reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews or admins moderate" ON public.reviews
  FOR DELETE USING (
    auth.uid() = user_id OR EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 6. ARTICLES TABLE (EDITORIAL SECTION)
CREATE TABLE IF NOT EXISTS public.articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  cover_image TEXT NOT NULL,
  content TEXT NOT NULL,
  category TEXT NOT NULL DEFAULT 'Travel Tips',
  published_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

ALTER TABLE public.articles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Articles viewable by everyone" ON public.articles
  FOR SELECT USING (true);

CREATE POLICY "Only admins can manage articles" ON public.articles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.profiles WHERE profiles.id = auth.uid() AND profiles.role = 'admin'
    )
  );


-- 7. RATING RECALCULATION TRIGGER
CREATE OR REPLACE FUNCTION public.recalculate_package_rating()
RETURNS TRIGGER AS $$
DECLARE
  target_package_id UUID;
  new_avg NUMERIC(3, 2);
BEGIN
  IF TG_OP = 'DELETE' THEN
    target_package_id := OLD.package_id;
  ELSE
    target_package_id := NEW.package_id;
  END IF;

  SELECT COALESCE(ROUND(AVG(rating)::numeric, 1), 5.0)
  INTO new_avg
  FROM public.reviews
  WHERE package_id = target_package_id;

  UPDATE public.packages
  SET avg_rating = new_avg
  WHERE id = target_package_id;

  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS trigger_recalculate_rating ON public.reviews;
CREATE TRIGGER trigger_recalculate_rating
  AFTER INSERT OR UPDATE OR DELETE ON public.reviews
  FOR EACH ROW EXECUTE PROCEDURE public.recalculate_package_rating();


-- 8. ATOMIC BOOKING FUNCTION (RPC) WITH OVERBOOKING PREVENTION
CREATE OR REPLACE FUNCTION public.create_booking_atomic(
  p_user_id UUID,
  p_package_id UUID,
  p_travel_date DATE,
  p_travelers JSONB,
  p_total_price NUMERIC,
  p_requested_slots INT,
  p_booking_ref TEXT
)
RETURNS JSONB AS $$
DECLARE
  v_avail_id UUID;
  v_total_slots INT;
  v_booked_slots INT;
  v_booking_id UUID;
BEGIN
  -- Lock availability row for update
  SELECT id, total_slots, booked_slots
  INTO v_avail_id, v_total_slots, v_booked_slots
  FROM public.package_availability
  WHERE package_id = p_package_id AND date = p_travel_date
  FOR UPDATE;

  -- If no availability record exists, create one with default 10 slots
  IF v_avail_id IS NULL THEN
    INSERT INTO public.package_availability (package_id, date, total_slots, booked_slots)
    VALUES (p_package_id, p_travel_date, 10, 0)
    RETURNING id, total_slots, booked_slots INTO v_avail_id, v_total_slots, v_booked_slots;
  END IF;

  -- Check remaining slot capacity
  IF (v_booked_slots + p_requested_slots) > v_total_slots THEN
    RETURN jsonb_build_object(
      'success', false,
      'error', 'Insufficient slots available for selected date'
    );
  END IF;

  -- Decrement available capacity by incrementing booked slots
  UPDATE public.package_availability
  SET booked_slots = booked_slots + p_requested_slots
  WHERE id = v_avail_id;

  -- Insert booking record
  INSERT INTO public.bookings (
    booking_reference,
    user_id,
    package_id,
    travel_date,
    travelers,
    total_price,
    status
  ) VALUES (
    p_booking_ref,
    p_user_id,
    p_package_id,
    p_travel_date,
    p_travelers,
    p_total_price,
    'confirmed'
  ) RETURNING id INTO v_booking_id;

  RETURN jsonb_build_object(
    'success', true,
    'booking_id', v_booking_id,
    'booking_reference', p_booking_ref
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
