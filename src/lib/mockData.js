// Initial Mock Data for VisitTamilNadu Platform

export const INITIAL_PACKAGES = [
  {
    id: 'pkg-ooty-01',
    title: 'Queen of Hill Stations: Ooty & Coonoor Deluxe Trail',
    description: 'Immerse yourself in lush tea gardens, mist-clad peaks, colonial heritage, and a ride on the UNESCO World Heritage Nilgiri Mountain Railway. Experience crisp mountain air and majestic Doddabetta views.',
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1626014903708-6a56c07b7b15?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Ooty & Nilgiris',
    category: 'Hill Stations',
    duration_days: 4,
    price: 14999,
    tag: 'Best Seller',
    is_featured: true,
    avg_rating: 4.9,
    review_count: 128,
    itinerary: [
      { day: 1, title: 'Arrival in Ooty & Botanical Gardens', details: 'Check into luxury resort, visit Government Botanical Garden and enjoy an evening boat ride on Ooty Lake.' },
      { day: 2, title: 'Doddabetta Peak & Tea Factory', details: 'Ascend Doddabetta Peak (2,637m), tour the Highfield Tea Factory with fresh tea tasting, and visit Rose Garden.' },
      { day: 3, title: 'Heritage Toy Train to Coonoor', details: 'Board Nilgiri Mountain Railway steam train to Coonoor. Explore Sim’s Park, Lamb’s Rock, and Dolphin’s Nose.' },
      { day: 4, title: 'Pykara Lake & Pine Forests', details: 'Visit Pykara Lake, boat house, Pykara Falls, and walk through Shooting Point Pine Forest before departure.' }
    ],
    inclusions: ['3 Nights Luxury Resort Stay', 'Breakfast & Dinner Included', 'Nilgiri Toy Train 1st Class Ticket', 'Private AC Transport', 'Sightseeing & Entry Passes'],
    exclusions: ['Airfare/Train to Coimbatore', 'Personal Expenses & Souvenirs', 'Lunch', 'Tips to guide & driver']
  },
  {
    id: 'pkg-madurai-02',
    title: 'Madurai Meenakshi & Sacred Rameswaram Circuit',
    description: 'Experience the grand temple architecture of Madurai, cross the iconic Pamban Ocean Bridge, and visit sacred coastal Rameswaram and Dhanushkodi ghost town.',
    images: [
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1600100397608-f090742f4cc0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1621831307365-5be56cd343a6?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Madurai & Rameswaram',
    category: 'Pilgrimage Circuits',
    duration_days: 3,
    price: 11499,
    tag: 'Limited Slots',
    is_featured: true,
    avg_rating: 4.8,
    review_count: 94,
    itinerary: [
      { day: 1, title: 'Madurai Meenakshi Temple & Nayakkar Palace', details: 'VIP Darshan at Sri Meenakshi Sundareswarar Temple, visit Thirumalai Nayakkar Palace, and enjoy authentic Madurai Jigarthanda.' },
      { day: 2, title: 'Pamban Ocean Bridge & Rameswaram Temple', details: 'Drive across Pamban Bridge, visit Ramanathaswamy Temple (22 Holy Wells ritual bath) and Agnitheertham sacred beach.' },
      { day: 3, title: 'Dhanushkodi Ocean Tip Safari', details: '4x4 Jeep safari to Dhanushkodi where Bay of Bengal meets Indian Ocean. Dr. APJ Abdul Kalam Memorial visit and return.' }
    ],
    inclusions: ['2 Nights Deluxe Hotel Stay', 'VIP Temple Darshan Passes', 'Private AC Sedan / SUV', 'Daily Breakfast', 'Dhanushkodi Jeep Safari'],
    exclusions: ['Pooja items', 'GST 5%', 'Personal Expenses']
  },
  {
    id: 'pkg-chettinad-03',
    title: 'Chettinad Heritage Mansion & Culinary Expedition',
    description: 'Step into the opulent world of Chettiar merchant princes, 100-year-old teak wood mansions, handcrafted Athangudi tile studios, and fiery Chettinad gastronomy.',
    images: [
      'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1610192244261-3f33de3f55e4?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Chettinad / Karaikudi',
    category: 'Chettinad Trail',
    duration_days: 3,
    price: 16500,
    tag: 'Heritage Special',
    is_featured: true,
    avg_rating: 4.95,
    review_count: 76,
    itinerary: [
      { day: 1, title: 'Palace Check-in & Master Cooking Workshop', details: 'Stay in a restored 1920s Chettinad palace. Enjoy traditional banana leaf lunch and live spice blending workshop.' },
      { day: 2, title: 'Athangudi Tiles & Antique Street Walk', details: 'Watch handmade eco-friendly tile crafting, explore Kanadukathan Palace, and shop vintage teak artifacts.' },
      { day: 3, title: 'Kandangi Handloom & Temple Architecture', details: 'Visit cotton saree weaving units and Pillayarpatti Cave Temple before departure.' }
    ],
    inclusions: ['Heritage Palace Suite Stay', 'All Meals Included (Authentic Chettinad Cuisine)', 'Craft Studio Tours & Cooking Masterclass', 'Heritage Guide'],
    exclusions: ['Alcoholic Beverages', 'Personal Shopping Purchases']
  },
  {
    id: 'pkg-kanyakumari-04',
    title: 'Kanyakumari Sunset & Sunrise Coastal Escape',
    description: 'Stand at Lands End where three oceans unite — Arabian Sea, Bay of Bengal, and Indian Ocean. Visit Vivekananda Rock Memorial and Thiruvalluvar Statue.',
    images: [
      'https://images.unsplash.com/photo-1588668214407-6ea9a6d8c272?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Kanyakumari',
    category: 'Beaches',
    duration_days: 2,
    price: 7999,
    tag: 'Popular',
    is_featured: true,
    avg_rating: 4.7,
    review_count: 110,
    itinerary: [
      { day: 1, title: 'Triveni Sangam & Sunset Memorial', details: 'Check into ocean-view hotel. Ferry ride to Vivekananda Rock Memorial, Thiruvalluvar Statue, and Triveni Sangam sunset.' },
      { day: 2, title: 'Ocean Sunrise & Padmanabhapuram Wooden Palace', details: 'Witness 3-ocean sunrise, visit 400-year-old teak wood Padmanabhapuram Palace and Suchindram Temple.' }
    ],
    inclusions: ['1 Night Ocean View Hotel Stay', 'Ferry Tickets to Memorial', 'Daily Breakfast', 'Sightseeing Transfers'],
    exclusions: ['Lunch & Dinner', 'Personal Expenses']
  },
  {
    id: 'pkg-mahabs-05',
    title: 'Mahabalipuram Shore Temples & French Pondicherry Trail',
    description: 'Explore UNESCO coastal rock-cut monuments in Mahabalipuram followed by the French Quarter colonial charm, cobble streets, and beaches of Pondicherry.',
    images: [
      'https://images.unsplash.com/photo-1600100397608-f090742f4cc0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Mahabalipuram & East Coast',
    category: 'Temples & Heritage',
    duration_days: 3,
    price: 12999,
    tag: 'Coastal Heritage',
    is_featured: false,
    avg_rating: 4.85,
    review_count: 82,
    itinerary: [
      { day: 1, title: 'UNESCO Shore Temple & Pancha Rathas', details: 'Guided tour of Shore Temple, Arjuna’s Penance, Krishna’s Butter Ball, and coastal seafood lunch.' },
      { day: 2, title: 'French Quarter & Promenade Beach', details: 'Drive down scenic ECR road to Pondicherry. Heritage walking tour of White Town and Promenade sunset.' },
      { day: 3, title: 'Auroville Matrimandir & Craft Village', details: 'Morning visit to Auroville Visitor Center & Matrimandir viewing point. Return transfer.' }
    ],
    inclusions: ['2 Nights Boutique Hotel Stay', 'Private AC Vehicle', 'Heritage Walking Guide', 'Breakfast'],
    exclusions: ['Auroville Inner Chamber Passes', 'Dinner']
  },
  {
    id: 'pkg-kodai-06',
    title: 'Mist & Magic of Kodaikanal Hill Station',
    description: 'Discover the Princess of Hill Stations. Stroll around star-shaped Kodai Lake, walk the Coaker’s Walk cliff path, and explore Silver Cascade waterfalls.',
    images: [
      'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Kodaikanal',
    category: 'Hill Stations',
    duration_days: 3,
    price: 11999,
    tag: 'Romantic Getaway',
    is_featured: false,
    avg_rating: 4.75,
    review_count: 65,
    itinerary: [
      { day: 1, title: 'Kodai Lake & Boating', details: 'Check into mountain lodge. Evening cycle ride around Kodai Lake and pedal boating.' },
      { day: 2, title: 'Pillar Rocks & Pine Forest', details: 'Visit Pillar Rocks, Guna Caves (Devil’s Kitchen), and walk through romantic Pine Forest.' },
      { day: 3, title: 'Bryant Park & Departure', details: 'Morning walk at Bryant Botanical Park and souvenir shopping for homemade chocolates.' }
    ],
    inclusions: ['2 Nights Mountain Lodge Stay', 'Boating Vouchers', 'Daily Breakfast & Dinner', 'Private Sightseeing Cabs'],
    exclusions: ['Personal Chocolate Purchases', 'Tips']
  },
  {
    id: 'pkg-mudumalai-07',
    title: 'Mudumalai Tiger Reserve & Wildlife Safari',
    description: 'Embark on an exhilarating jungle safari in Mudumalai National Park, spot wild elephants, tigers, Indian gaur, and visit The Elephant Whisperers center.',
    images: [
      'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1534188753412-3e26d0d618d6?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Mudumalai / Nilgiris',
    category: 'Wildlife & Nature',
    duration_days: 2,
    price: 9800,
    tag: 'Wild Safari',
    is_featured: false,
    avg_rating: 4.88,
    review_count: 45,
    itinerary: [
      { day: 1, title: 'Jungle Resort Check-in & Evening Jeep Safari', details: 'Check into eco jungle resort. 3-hour open 4x4 safari deep in Mudumalai Tiger Reserve.' },
      { day: 2, title: 'Elephant Feeding Center & Departure', details: 'Visit Theppakadu Elephant Camp (Oscar-winning Elephant Whisperers location). Return transfer.' }
    ],
    inclusions: ['1 Night Eco Resort Stay', '2 Wildlife Safaris with Forest Permits', 'All Meals (Farm to Table)', 'Naturalist Guide'],
    exclusions: ['Camera fees', 'Personal Expenses']
  },
  {
    id: 'pkg-tanjore-08',
    title: 'Thanjavur Brihadisvara & Chola Great Living Temples',
    description: 'Be awe-inspired by the 1,000-year-old Big Temple built by Raja Raja Chola I. Admire Tanjore art paintings, bronze sculpting, and royal palace archives.',
    images: [
      'https://images.unsplash.com/photo-1600100397608-f090742f4cc0?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80'
    ],
    location: 'Thanjavur & Kumbakonam',
    category: 'Temples & Heritage',
    duration_days: 3,
    price: 13500,
    tag: 'UNESCO World Heritage',
    is_featured: false,
    avg_rating: 4.92,
    review_count: 58,
    itinerary: [
      { day: 1, title: 'Brihadisvara Temple Architectural Wonder', details: 'Sunset walk around the 216 ft granite tower of Brihadisvara Temple with Chola historian guide.' },
      { day: 2, title: 'Dharasuram & Gangaikonda Cholapuram', details: 'Tour Darasuram Airavatesvara Temple and Gangaikonda Cholapuram.' },
      { day: 3, title: 'Tanjore Painting Studio & Royal Palace', details: 'Visit Saraswathi Mahal Library and authentic gold leaf Tanjore painting workshop.' }
    ],
    inclusions: ['2 Nights Heritage Hotel Stay', 'Expert Archeologist Guide', 'Breakfast & Dinner', 'Private AC Transport'],
    exclusions: ['Personal Souvenirs', 'Tips']
  }
]

export const INITIAL_ARTICLES = [
  {
    id: 'art-pongal-01',
    title: 'Pongal Festival Travel Guide: Celebrating Harvest in Harvest Land',
    slug: 'pongal-festival-travel-guide',
    cover_image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?auto=format&fit=crop&w=1200&q=80',
    category: 'Festival',
    published_at: '2026-01-10',
    summary: 'Pongal is Tamil Nadu’s grandest 4-day harvest celebration. Discover village homestays, Kolam competition lanes, and traditional sugarcane feasts.',
    content: `
# Pongal Festival Travel Guide: Celebrating Harvest in Harvest Land

Pongal is the beating heart of Tamil Nadu's festive calendar. Celebrated over four days in mid-January, this ancient harvest festival thanks the Sun God (Surya) and livestock for a bountiful crop yield.

### The Four Days of Pongal

1. **Bhogi Pongal**: Homes are thoroughly cleaned and old household belongings are burnt in ritual bonfires to symbolize fresh beginnings.
2. **Thai Pongal**: The main festival day! Families gather outdoors at sunrise to boil fresh rice, milk, and jaggery in newly decorated clay pots. When the milk boils over, everyone shouts happily *"Pongalo Pongal!"*
3. **Mattu Pongal**: Dedicated to cows and bulls. Animals are bathed, their horns are painted in vivid colors, and flower garlands are placed around their necks.
4. **Kaanum Pongal**: A day for family reunions, picnics, and traditional folk dances like Karagattam and Oyilattam.

### Where to Experience Pongal as a Traveler

- **Madurai Rural Belt**: Witness traditional Mattu Pongal celebrations and iconic Jallikattu bull-taming events in Alanganallur and Palamedu.
- **Mylapore, Chennai**: Stroll through Mada Streets during the annual Mylapore Festival to witness miles of intricate *Kolam* (rice-flour powder floor art) competitions.
- **Chettinad Villages**: Stay in a rural heritage mansion to experience cooking sweet *Chakkarai Pongal* over firewood in earthen pots.
    `
  },
  {
    id: 'art-ooty-02',
    title: 'Best Time to Visit Ooty: Seasons, Weather & Blossom Guide',
    slug: 'best-time-to-visit-ooty',
    cover_image: 'https://images.unsplash.com/photo-1589182373726-e4f658ab50f0?auto=format&fit=crop&w=1200&q=80',
    category: 'Seasonal Guide',
    published_at: '2026-02-15',
    summary: 'Planning a getaway to the Nilgiris? From crisp winter mist to summer flower shows, here is your season-by-season guide to Ooty.',
    content: `
# Best Time to Visit Ooty: Seasons, Weather & Blossom Guide

Nestled in the Nilgiri hills at 2,240 meters above sea level, Ooty (Udhagamandalam) is South India's favorite hill station. Depending on whether you crave flower blooms or chilly fireside nights, here is when to visit.

### ☀️ Summer (March to June): Peak Blossom Season (15°C – 25°C)
- **Highlights**: Pleasant weather, ideal for sightseeing, boating, and trekking.
- **Events**: The world-famous **Annual Flower Show** at the Government Botanical Gardens in May attracts over 100,000 visitors.
- **Tip**: Book your packages and toy train tickets 45 days in advance!

### 🌧️ Monsoon (July to September): Misty Tea Trails (12°C – 20°C)
- **Highlights**: Lush emerald tea estates, cascading waterfalls, and romantic fog.
- **Best For**: Travelers seeking peaceful luxury resort stays without crowds.

### ❄️ Winter (October to February): Frosty Mornings & Bonfires (5°C – 18°C)
- **Highlights**: Crisp morning frost on tea leaves, clear blue skies, and cozy fireplace evenings.
- **Best For**: Couples and honeymooners.
    `
  },
  {
    id: 'art-chettinad-03',
    title: 'Chettinad Architecture & Gastronomy: 10 Secrets of Karaikudi',
    slug: 'chettinad-architecture-gastronomy-guide',
    cover_image: 'https://images.unsplash.com/photo-1609766857041-ed402ea8069a?auto=format&fit=crop&w=1200&q=80',
    category: 'Travel Tips',
    published_at: '2026-02-28',
    summary: 'Burmese teak pillars, Italian marble floors, and fiery pepper chicken — explore the 10 secrets of Chettinad merchant history.',
    content: `
# Chettinad Architecture & Gastronomy: 10 Secrets of Karaikudi

The Chettinad region, comprising 73 villages anchored around Karaikudi, is a treasure trove of architectural splendour and world-famous cuisine built by the Nattukottai Chettiars.

### Architectural Marvels
1. **Burmese Teak & Italian Marble**: Chettiar traders imported raw materials from their overseas trade routes in Malaya, Burma, and Europe.
2. **Athangudi Tiles**: Handmade tiles made from local sand, cement, and natural oxide pigments, polished with egg-white glaze.
3. **Rainwater Harvesting Courtyards**: Double-courtyard mansions designed with sloping tile roofs to direct every drop of rainwater into underground granite cisterns.

### Gastronomic Delights
- **Pepper Chicken (Milagu Kozhi)**: Fresh ground black pepper, dry red chillies, and shallots simmered in gingelly oil.
- **Seepu Seevai**: Delicate ribbon-shaped steamed rice noodles served with coconut milk.
- **Banana Leaf Banquet**: Up to 18 courses served in strict traditional sequence.
    `
  }
]

export const INITIAL_REVIEWS = [
  {
    id: 'rev-01',
    package_id: 'pkg-ooty-01',
    user_name: 'Ananya Sharma',
    rating: 5,
    comment: 'The Nilgiri Toy Train experience was out of this world! Our guide was extremely knowledgeable, and the stay at the tea estate resort was pure luxury.',
    created_at: '2026-02-20'
  },
  {
    id: 'rev-02',
    package_id: 'pkg-ooty-01',
    user_name: 'Karthik Raja',
    rating: 5,
    comment: 'Flawless arrangements. Pykara lake boating and Doddabetta peak views were stunning. Highly recommended!',
    created_at: '2026-02-24'
  },
  {
    id: 'rev-03',
    package_id: 'pkg-madurai-02',
    user_name: 'Dr. Meera Nambiar',
    rating: 5,
    comment: 'The VIP darshan at Meenakshi temple saved us hours in queue. Crossing Pamban Bridge was a dream come true.',
    created_at: '2026-03-01'
  },
  {
    id: 'rev-04',
    package_id: 'pkg-chettinad-03',
    user_name: 'David Miller',
    rating: 5,
    comment: 'As an architect, staying in a restored 1920 Chettinad palace was the highlight of my trip to India. The food was spectacular!',
    created_at: '2026-02-18'
  }
]
