-- Seed Script for VisitTamilNadu Database

-- 1. SEED PACKAGES
INSERT INTO public.packages (id, title, description, images, location, category, duration_days, price, itinerary, inclusions, exclusions, avg_rating, is_featured)
VALUES
(
  'e1b2c3d4-0001-4000-8000-000000000001',
  'Queen of Hill Stations: Ooty & Coonoor Deluxe Trail',
  'Immerse yourself in lush tea gardens, mist-clad peaks, colonial heritage, and a ride on the UNESCO World Heritage Nilgiri Mountain Railway.',
  ARRAY[
    'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1626014903708-6a56c07b7b15?auto=format&fit=crop&w=1200&q=80'
  ],
  'Ooty & Nilgiris',
  'Hill Stations',
  4,
  14999.00,
  '[
    {"day": 1, "title": "Arrival in Ooty & Botanical Gardens", "details": "Check into luxury resort, visit Government Botanical Garden and Ooty Lake evening boating."},
    {"day": 2, "title": "Doddabetta Peak & Tea Factory", "details": "Ascend Doddabetta (highest peak), visit Tea Museum & Factory with fresh tea tasting."},
    {"day": 3, "title": "Heritage Toy Train to Coonoor", "details": "Board Nilgiri Mountain Railway to Coonoor. Explore Sim’s Park and Dolphin’s Nose viewpoint."},
    {"day": 4, "title": "Pykara Lake & Waterfalls", "details": "Visit Pykara Lake, boat house, and pine forest before departure."}
  ]'::jsonb,
  ARRAY['3 Nights Luxury Stay', 'Breakfast & Dinner Included', 'Nilgiri Toy Train First Class Ticket', 'Private AC Transport', 'Sightseeing & Entry Fees'],
  ARRAY['Airfare/Train to Coimbatore', 'Personal Expenses', 'Lunch'],
  4.9,
  true
),
(
  'e1b2c3d4-0002-4000-8000-000000000002',
  'Madurai Meenakshi & Sacred Rameswaram Circuit',
  'Experience the grand temple architecture of Madurai, cross the Iconic Pamban Bridge, and visit sacred coastal Rameswaram and Dhanushkodi ghost town.',
  ARRAY[
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600100397608-f090742f4cc0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1621831307365-5be56cd343a6?auto=format&fit=crop&w=1200&q=80'
  ],
  'Madurai & Rameswaram',
  'Pilgrimage Circuits',
  3,
  11499.00,
  '[
    {"day": 1, "title": "Madurai Meenakshi Temple & Palace", "details": "VIP Darshan at Sri Meenakshi Amman Temple, visit Thirumalai Nayakkar Palace, and sample Famous Madurai Jigarthanda."},
    {"day": 2, "title": "Scenic Drive to Rameswaram & Pamban Bridge", "details": "Cross Pamban Bridge, visit Ramanathaswamy Temple (22 Holy Wells darshan) and Agnitheertham beach."},
    {"day": 3, "title": "Dhanushkodi Ocean Tip & Departure", "details": "4x4 jeep safari to Dhanushkodi beach where Bay of Bengal meets Indian Ocean. Return transfer to Madurai."}
  ]'::jsonb,
  ARRAY['2 Nights Deluxe Hotel Stay', 'Special VIP Temple Darshan Passes', 'Private AC Vehicle', 'Daily Breakfast', 'Dhanushkodi Jeep Safari'],
  ARRAY['Personal Pooja items', 'GST 5%', 'Tips to local guides'],
  4.8,
  true
),
(
  'e1b2c3d4-0003-4000-8000-000000000003',
  'Chettinad Heritage Mansion & Culinary Expedition',
  'Step into the opulent world of Chettiar mansions, handcrafted Athangudi tiles, antique markets, and world-renowned spicy Chettinad gastronomy.',
  ARRAY[
    'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80'
  ],
  'Chettinad / Karaikudi',
  'Chettinad Trail',
  3,
  16500.00,
  '[
    {"day": 1, "title": "Heritage Mansion Check-in & Cooking Class", "details": "Stay in 100-year-old restored heritage mansion. Traditional banana leaf feast and live cooking demonstration by Master Chettinad Chefs."},
    {"day": 2, "title": "Athangudi Tile Factory & Antique Street", "details": "Watch handmade Athangudi tile making, visit Karaikudi Antique Lane and Kanadukathan Palace."},
    {"day": 3, "title": "Saree Weaving Workshop & Departure", "details": "Visit Kandangi cotton saree weaving unit and local spice markets before departure."}
  ]'::jsonb,
  ARRAY['Heritage Palace Resort Stay', 'All Meals Included (Chettinad Gourmet)', 'Tile Craft & Saree Studio Tours', 'Local Heritage Guide'],
  ARRAY['Alcoholic beverages', 'Personal Shopping Expenses'],
  4.95,
  true
),
(
  'e1b2c3d4-0004-4000-8000-000000000004',
  'Kanyakumari Sunset & Sunrise Coastal Escape',
  'Stand at Lands End where the Arabian Sea, Bay of Bengal, and Indian Ocean unite. Visit Vivekananda Rock Memorial and Thiruvalluvar Statue.',
  ARRAY[
    'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80'
  ],
  'Kanyakumari',
  'Beaches',
  2,
  7999.00,
  '[
    {"day": 1, "title": "Triveni Sangam & Sunset Point", "details": "Check into sea-facing hotel. Ferry ride to Vivekananda Rock Memorial and sunset at Triveni Sangam."},
    {"day": 2, "title": "Sunrise & Padmanabhapuram Palace", "details": "Witness rare sunrise over 3 oceans, visit wooden Padmanabhapuram Palace and Suchindram Temple."}
  ]'::jsonb,
  ARRAY['1 Night Sea-View Resort Stay', 'Ferry Tickets to Memorial', 'Breakfast Included', 'Sightseeing Transfers'],
  ARRAY['Lunch & Dinner', 'Personal Expenses'],
  4.7,
  true
),
(
  'e1b2c3d4-0005-4000-8000-000000000005',
  'Mahabalipuram Shore Temples & French Pondicherry Trail',
  'Explore UNESCO coastal rock-cut monuments in Mahabalipuram followed by the French Quarter colonial charm, cobble streets, and beaches of Pondicherry.',
  ARRAY[
    'https://images.unsplash.com/photo-1600100397608-f090742f4cc0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
  ],
  'Mahabalipuram & East Coast',
  'Temples & Heritage',
  3,
  12999.00,
  '[
    {"day": 1, "title": "UNESCO Shore Temple & Pancha Rathas", "details": "Guided tour of Shore Temple, Arjuna’s Penance, Krishna’s Butter Ball, and coastal seafood lunch."},
    {"day": 2, "title": "French Quarter & Promenade Beach", "details": "Drive down scenic ECR road to Pondicherry. Heritage walking tour of White Town and Promenade sunset."},
    {"day": 3, "title": "Auroville Matrimandir & Craft Village", "details": "Morning visit to Auroville Visitor Center & Matrimandir viewing point. Return transfer."}
  ]'::jsonb,
  ARRAY['2 Nights Boutique Hotel Stay', 'Private Transport', 'Heritage Walking Guide', 'Breakfast'],
  ARRAY['Auroville Inner Chamber Passes (Must book direct)', 'Dinner'],
  4.85,
  false
),
(
  'e1b2c3d4-0006-4000-8000-000000000006',
  'Mist & Magic of Kodaikanal Hill Station',
  'Discover the Princess of Hill Stations. Stroll around star-shaped Kodai Lake, walk the Coaker’s Walk cliff path, and explore Silver Cascade waterfalls.',
  ARRAY[
    'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
  ],
  'Kodaikanal',
  'Hill Stations',
  3,
  11999.00,
  '[
    {"day": 1, "title": "Kodai Lake & Boating", "details": "Check into mountain lodge. Evening cycle ride around Kodai Lake and pedal boating."},
    {"day": 2, "title": "Pillar Rocks & Pine Forest", "details": "Visit Pillar Rocks, Guna Caves (Devil’s Kitchen), and walk through romantic Pine Forest."},
    {"day": 3, "title": "Bryant Park & Departure", "details": "Morning walk at Bryant Botanical Park and souvenir shopping for homemade chocolates."}
  ]'::jsonb,
  ARRAY['2 Nights Mountain Lodge Stay', 'Boating Vouchers', 'Daily Breakfast & Dinner', 'Private Sightseeing Cabs'],
  ARRAY['Personal Chocolate Purchases', 'Tips'],
  4.75,
  false
);


-- 2. SEED ARTICLES (EDITORIAL CONTENT FOR "WHAT'S HAPPENING IN TAMIL NADU")
INSERT INTO public.articles (id, title, slug, cover_image, content, category, published_at)
VALUES
(
  'a1b2c3d4-0001-4000-8000-000000000001',
  'Pongal Festival Travel Guide: Celebrating Harvest in Harvest Land',
  'pongal-festival-travel-guide',
  'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
  'Pongal is Tamil Nadu’s grandest 4-day harvest celebration held annually in mid-January. From boiling fresh rice with jaggery in terracotta pots to decorating sugarcane stalks and watching colorful Jallikattu bull-taming tradition in Madurai rural villages, Pongal offers an unmatched immersive cultural trip. Discover village homestays, Kolam competition lanes in Mylapore Chennai, and special festive feasts.',
  'Festival',
  NOW() - INTERVAL '5 days'
),
(
  'a1b2c3d4-0002-4000-8000-000000000002',
  'Best Time to Visit Ooty: Seasons, Weather & Blossom Guide',
  'best-time-to-visit-ooty',
  'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
  'Planning a getaway to the Nilgiris? March to June brings pleasant summer temperatures ideal for sightseeing and the famous Annual Flower Show at Botanical Gardens. October to February brings crisp chilly winter mornings with temperatures dropping to 5°C, creating misty mountain magic.',
  'Seasonal Guide',
  NOW() - INTERVAL '12 days'
),
(
  'a1b2c3d4-0003-4000-8000-000000000003',
  'Chettinad Architecture & Gastronomy: 10 Secrets of Karaikudi',
  'chettinad-architecture-gastronomy-guide',
  'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
  'Did you know Chettinad mansions were constructed using Burmese teak pillars, Italian marble floors, and handmade Athangudi tiles egg-white polished to perfection? Dive into 10 secrets of Chettinad merchant history and where to get the most authentic Pepper Chicken and Seepu Seevai.',
  'Travel Tips',
  NOW() - INTERVAL '20 days'
);


-- 3. SEED PACKAGE AVAILABILITY (NEXT 30 DAYS)
INSERT INTO public.package_availability (package_id, date, total_slots, booked_slots)
SELECT
  p.id,
  CURRENT_DATE + (i || ' day')::interval,
  12,
  FLOOR(RANDOM() * 6)::int
FROM public.packages p
CROSS JOIN generate_series(0, 30) AS i
ON CONFLICT (package_id, date) DO NOTHING;
