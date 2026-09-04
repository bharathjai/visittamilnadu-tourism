# VisitTamilNadu — Tamil Nadu Tourism & Package Booking Platform 🌺🌴

A full-stack tourism booking web application modeled on the layout, structure, and editorial polish of **visitlondon.com**, tailored for Tamil Nadu's iconic destinations (Ooty, Madurai, Rameswaram, Kanyakumari, Chettinad, Mahabalipuram, Kodaikanal, Yercaud, Tanjore).

![VisitTamilNadu Preview](https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

### 1. VisitLondon-Inspired Homepage Layout
- **Hero Section**: Full-width scenic carousel with search bar (destination, dates, travelers).
- **"I Want To..." Quick Links Pill Row**: Task-oriented shortcuts ("Explore hill stations", "Visit ancient temples", "Find beach getaways", "Chettinad trail", "Festivals", "Family trips").
- **Trust Bar**: 3 stats highlight cards ("15,000+ Travelers", "Verified Local Guides", "Best Price Guarantee").
- **Must-See / Featured Packages**: Curated horizontal row of featured packages with tags ("Best Seller", "Limited Slots", "New").
- **Explore by Category**: Visual category grid (Hill Stations, Temples & Heritage, Beaches, Wildlife & Nature, Chettinad, Pilgrimage).
- **Best-Selling Packages Carousel**: Scrollable row of top-rated packages with rating badges.
- **Editorial Content ("What's Happening in TN")**: Seasonal guides pulled from the `articles` database table (e.g. "Pongal Festival Travel Guide", "Best Time to Visit Ooty", "Monsoon Getaways in Nilgiris").
- **Regional Highlights**: Editorial blurbs for Nilgiris, Madurai & Temple Towns, Coastal TN, and Chettinad.
- **Video/Reels Section**: Modal destination video shorts player.
- **Offers & Savings Section**: Highlight banner for seasonal early-bird discounts.
- **Comprehensive Footer**: Link columns, newsletter subscription, social badges.

### 2. Package Listing & Filtering
- Multi-faceted filter sidebar (Region, Category, Price Range, Duration, Rating).
- Dynamic sorting by price (Low to High / High to Low), popularity, and rating.
- Instant search bar and active filter pill tags.

### 3. Package Details & Dynamic Booking Engine
- Image gallery carousel, day-by-day expandable itinerary, inclusions/exclusions lists.
- Real-time date slot availability picker ("Only 4 slots left!").
- Dynamic price calculation based on traveler count.
- **Atomic Booking RPC**: Database stored procedure (`create_booking_atomic`) checks slot availability, decrements remaining slots, and inserts the booking record atomically to prevent overbooking.
- Booking reference generation (`TN-XXXXXX`).
- PDF Booking Confirmation E-Ticket download via `jsPDF`.

### 4. User Auth & Dashboard
- User Signup / Login via Supabase Auth (or interactive demo account switcher).
- **My Bookings Dashboard**: View upcoming, completed, and cancelled bookings.
- **Booking Cancellation**: Cancelling an upcoming trip automatically restores slot capacity in `package_availability`.

### 5. Review & Rating Engine
- Reviews section on package detail pages with breakdown stats.
- Postgres trigger auto-recalculates package `avg_rating` on review insertion.

### 6. Admin Management Panel
- Role-gated panel (`admin` role check).
- **Dashboard Overview**: Key metrics (total bookings, revenue, active packages, popular destinations).
- **Package Manager**: Add/edit packages, image URL / bucket file configuration, slots setup, featured toggle.
- **Booking Manager**: Filter and update booking statuses (`Confirmed`, `Completed`, `Cancelled`).
- **Articles / Editorial Publisher**: Create and publish seasonal guides and festival articles.
- **Reviews Moderation**: Delete or approve user reviews.
- **User Directory**: View registered users and promote user roles (`user` <-> `admin`).

---

## 🛠️ Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Lucide Icons, Framer Motion, jsPDF
- **Backend & Database**: Supabase (PostgreSQL, Supabase Auth, Row Level Security, Supabase Storage)
- **Email Dispatch**: Supabase Edge Function (`/supabase/functions/send-booking-confirmation`) + Resend API

---

## 📁 Database Schema

```sql
profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id),
  full_name text,
  role text DEFAULT 'user', -- 'user' | 'admin'
  created_at timestamptz DEFAULT now()
)

packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text,
  images text[],
  location text,
  category text,
  duration_days int,
  price numeric,
  itinerary jsonb,
  inclusions text[],
  exclusions text[],
  avg_rating numeric DEFAULT 5.0,
  is_featured boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
)

package_availability (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id uuid REFERENCES packages(id),
  date date NOT NULL,
  total_slots int NOT NULL,
  booked_slots int DEFAULT 0
)

bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_reference text UNIQUE NOT NULL,
  user_id uuid REFERENCES profiles(id),
  package_id uuid REFERENCES packages(id),
  travel_date date NOT NULL,
  travelers jsonb NOT NULL,
  total_price numeric NOT NULL,
  status text DEFAULT 'confirmed', -- 'confirmed' | 'completed' | 'cancelled'
  created_at timestamptz DEFAULT now()
)

reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id),
  package_id uuid REFERENCES packages(id),
  rating int CHECK (rating >= 1 AND rating <= 5),
  comment text,
  created_at timestamptz DEFAULT now()
)

articles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  cover_image text,
  content text,
  category text,
  published_at timestamptz DEFAULT now()
)
```

---

## ⚡ Quick Start & Setup Instructions

### 1. Local Development (Zero Setup Demo Mode)
The application comes pre-loaded with an interactive local demo engine. You can immediately run:
```bash
npm install
npm run dev
```
Open `http://localhost:3000` to browse packages, complete bookings, test admin functions, and download PDF tickets!

### 2. Supabase Integration Setup
To connect to your live Supabase cloud project:

1. Create a project at [supabase.com](https://supabase.com).
2. Copy your Project URL and Anon Key into a `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key
   ```
3. Run the database migration script in Supabase SQL Editor:
   - Copy content from `supabase/migrations/20260904_init_schema.sql` and run it.
4. Run the database seed script:
   - Copy content from `supabase/seed.sql` and run it to populate packages, articles, availability slots, and reviews.
5. Create a Storage Bucket named `package-images` and set its access to **Public**.
6. (Optional) Deploy the Email Edge Function:
   ```bash
   supabase functions deploy send-booking-confirmation --project-ref your-project-ref
   supabase secrets set RESEND_API_KEY=re_your_resend_key
   ```
