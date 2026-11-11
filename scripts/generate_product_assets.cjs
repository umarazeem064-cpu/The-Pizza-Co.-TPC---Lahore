const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}

// 108 products list
const products = [
  // Pizzas - Classic
  { id: 'tpc_classic_tikka', name: 'Chicken Tikka Pizza', cat: 'pizza', style: 'tikka', color: '#c2410c' },
  { id: 'tpc_classic_fajita', name: 'Chicken Fajita Pizza', cat: 'pizza', style: 'fajita', color: '#ea580c' },
  { id: 'tpc_classic_supreme', name: 'Chicken Supreme Pizza', cat: 'pizza', style: 'supreme', color: '#b91c1c' },
  { id: 'tpc_classic_seekh', name: 'Seekh Kabab Pizza', cat: 'pizza', style: 'seekh', color: '#9a3412' },
  { id: 'tpc_classic_smoke', name: 'Smoke Chicken Pizza', cat: 'pizza', style: 'smoke', color: '#7c2d12' },
  { id: 'tpc_classic_hot_spicy', name: 'Hot n Spicy Pizza', cat: 'pizza', style: 'hot_spicy', color: '#dc2626' },
  { id: 'tpc_classic_veggie', name: 'Veggie Lover Pizza', cat: 'pizza', style: 'veggie', color: '#15803d' },
  { id: 'tpc_classic_cheese', name: 'Cheese Lover Pizza', cat: 'pizza', style: 'cheese', color: '#f59e0b' },

  // Pizzas - Premium
  { id: 'tpc_prem_new_york', name: 'New York Pizza', cat: 'pizza', style: 'new_york', color: '#b45309' },
  { id: 'tpc_prem_kabab_stuffer', name: 'Kabab Stuffer Pizza', cat: 'pizza', style: 'stuffer', color: '#9a3412' },
  { id: 'tpc_prem_pizzachu', name: 'Pizzachu Stuffed Pizza', cat: 'pizza', style: 'pizzachu', color: '#d97706' },
  { id: 'tpc_prem_square', name: 'Square Signature Pizza', cat: 'pizza', style: 'square', color: '#c2410c' },
  { id: 'tpc_prem_behari', name: 'Behari Kabab Pizza', cat: 'pizza', style: 'behari', color: '#854d0e' },
  { id: 'tpc_prem_crown', name: 'Crown Crust Cheesy Pizza', cat: 'pizza', style: 'crown', color: '#eab308' },

  // Pizzas - Signature
  { id: 'tpc_sig_special', name: 'TPC Special Pizza', cat: 'pizza', style: 'tpc_special', color: '#b91c1c' },
  { id: 'tpc_sig_malai_boti', name: 'Malai Boti Pizza', cat: 'pizza', style: 'malai_boti', color: '#f59e0b' },
  { id: 'tpc_sig_crunch', name: 'Crunch Pizza', cat: 'pizza', style: 'crunch', color: '#ea580c' },
  { id: 'tpc_sig_bonfire', name: 'Bonfire Pizza', cat: 'pizza', style: 'bonfire', color: '#c2410c' },
  { id: 'tpc_sig_euro', name: 'Euro Signature Pizza', cat: 'pizza', style: 'euro', color: '#ca8a04' },

  // Fries
  { id: 'tpc_fries_salted', name: 'Classic Salted Fries', cat: 'fries', style: 'salted', color: '#eab308' },
  { id: 'tpc_fries_masala', name: 'Chatpata Masala Fries', cat: 'fries', style: 'masala', color: '#dc2626' },
  { id: 'tpc_fries_mayo_garlic', name: 'Mayo Garlic Fries', cat: 'fries', style: 'mayo_garlic', color: '#fef08a' },
  { id: 'tpc_fries_loaded', name: 'TPC Loaded Cheesy Fries', cat: 'fries', style: 'loaded', color: '#d97706' },

  // Burgers - Signature
  { id: 'tpc_burger_zinger', name: 'Zinger Burger', cat: 'burger', style: 'zinger', color: '#b45309' },
  { id: 'tpc_burger_monster', name: 'Monster Double Patty Burger', cat: 'burger', style: 'monster', color: '#7c2d12' },
  { id: 'tpc_burger_tower', name: 'Tower Crispy Burger', cat: 'burger', style: 'tower', color: '#c2410c' },
  { id: 'tpc_burger_raggy', name: 'Raggy Classic Burger', cat: 'burger', style: 'raggy', color: '#d97706' },

  // Burgers - Topnotch
  { id: 'tpc_burger_crispa_crunch', name: 'Crispa Crunch Burger', cat: 'burger', style: 'crispa', color: '#b45309' },
  { id: 'tpc_burger_mexican', name: 'Mexican Jalapeno Burger', cat: 'burger', style: 'mexican', color: '#dc2626' },
  { id: 'tpc_burger_euro', name: 'Euro Gourmet Burger', cat: 'burger', style: 'euro_burger', color: '#a16207' },

  // Lava & Grill Chicken Burgers
  { id: 'tpc_burger_lava_special', name: 'TPC Lava Molten Cheese Burger', cat: 'burger', style: 'lava', color: '#eab308' },
  { id: 'tpc_burger_chilli_shot', name: 'Chilli Shot Grilled Burger', cat: 'burger', style: 'chilli_shot', color: '#ef4444' },
  { id: 'tpc_burger_royal_smoke', name: 'Royal Smoke BBQ Burger', cat: 'burger', style: 'royal_smoke', color: '#7f1d1d' },
  { id: 'tpc_burger_holy_smoke', name: 'Holy Smoke Herb Burger', cat: 'burger', style: 'holy_smoke', color: '#451a03' },
  { id: 'tpc_burger_rock_star', name: 'Rock Star Tangy Burger', cat: 'burger', style: 'rock_star', color: '#c2410c' },
  { id: 'tpc_burger_chilly_tank', name: 'Chilly Tank Double Fillet', cat: 'burger', style: 'chilly_tank', color: '#b91c1c' },
  { id: 'tpc_burger_rango_tango', name: 'Rango Tango Sweet Relish Burger', cat: 'burger', style: 'rango_tango', color: '#ea580c' },

  // Grill Beef Burgers
  { id: 'tpc_beef_devil_fire', name: 'Devil on Fire Beef Burger', cat: 'burger', style: 'devil_beef', color: '#991b1b' },
  { id: 'tpc_beef_big_king', name: 'Big King Double Beef Burger', cat: 'burger', style: 'big_king', color: '#431407' },
  { id: 'tpc_beef_razzle_dazzle', name: 'Razzle Dazzle Beef Burger', cat: 'burger', style: 'razzle', color: '#7c2d12' },
  { id: 'tpc_beef_dabster', name: 'Dabster Ranch Beef Burger', cat: 'burger', style: 'dabster', color: '#78350f' },

  // Steaks
  { id: 'tpc_steak_holy_smoke', name: 'Holy Smoke Grilled Chicken Steak', cat: 'steak', style: 'holy_steak', color: '#451a03' },
  { id: 'tpc_steak_royal_blaster', name: 'Royal Blaster Tarragon Steak', cat: 'steak', style: 'blaster_steak', color: '#713f12' },
  { id: 'tpc_steak_chilli_shot', name: 'Chilli Shot Red Sauce Steak', cat: 'steak', style: 'chilli_steak', color: '#991b1b' },
  { id: 'tpc_steak_hot_fire', name: 'Hot on Fire Habanero Steak', cat: 'steak', style: 'hot_steak', color: '#b91c1c' },
  { id: 'tpc_steak_moroccan', name: 'Moroccan Spiced Cream Steak', cat: 'steak', style: 'moroccan_steak', color: '#854d0e' },

  // Sandwiches
  { id: 'tpc_sandwich_special', name: 'TPC Special Triple Decker Sandwich', cat: 'sandwich', style: 'tpc_sandwich', color: '#d97706' },
  { id: 'tpc_sandwich_thunderstorm', name: 'Thunderstorm Spicy Sandwich', cat: 'sandwich', style: 'thunder_sandwich', color: '#ea580c' },
  { id: 'tpc_sandwich_bbq', name: 'Smoky BBQ Grilled Sandwich', cat: 'sandwich', style: 'bbq_sandwich', color: '#7c2d12' },
  { id: 'tpc_sandwich_club', name: 'Classic Golden Panini Club Sandwich', cat: 'sandwich', style: 'club_sandwich', color: '#ca8a04' },

  // Continental
  { id: 'tpc_cont_marry_me', name: 'Marry Me Stuffed Chicken', cat: 'continental', style: 'marry_me', color: '#9a3412' },
  { id: 'tpc_cont_jalapeno', name: 'Jalapeno Stuffed Cheesy Chicken', cat: 'continental', style: 'jalapeno_stuff', color: '#15803d' },

  // Wraps
  { id: 'tpc_wrap_tikka', name: 'Tikka Wrap Supreme', cat: 'wrap', style: 'tikka_wrap', color: '#c2410c' },
  { id: 'tpc_wrap_spicy', name: 'Fiery Spicy Chicken Wrap', cat: 'wrap', style: 'spicy_wrap', color: '#dc2626' },
  { id: 'tpc_wrap_crispy', name: 'Crispy Tender Wrap', cat: 'wrap', style: 'crispy_wrap', color: '#d97706' },
  { id: 'tpc_wrap_bambola', name: 'Bambola Sweet Tangy Wrap', cat: 'wrap', style: 'bambola_wrap', color: '#ea580c' },
  { id: 'tpc_wrap_special', name: 'TPC Signature Loaded Wrap', cat: 'wrap', style: 'special_wrap', color: '#b91c1c' },

  // Paratha Rolls
  { id: 'tpc_roll_tikka_paratha', name: 'Tikka Paratha Roll', cat: 'roll', style: 'tikka_roll', color: '#b45309' },
  { id: 'tpc_roll_fajita_paratha', name: 'Fajita Paratha Roll', cat: 'roll', style: 'fajita_roll', color: '#c2410c' },
  { id: 'tpc_roll_kabab_paratha', name: 'Kabab Paratha Roll', cat: 'roll', style: 'kabab_roll', color: '#78350f' },
  { id: 'tpc_roll_twister', name: 'Twister Crispy Paratha Roll', cat: 'roll', style: 'twister_roll', color: '#ea580c' },

  // Spring Rolls
  { id: 'tpc_spring_behari', name: 'Behari Crispy Spring Roll', cat: 'roll', style: 'behari_spring', color: '#854d0e' },
  { id: 'tpc_spring_malai', name: 'Malai Boti Spring Roll', cat: 'roll', style: 'malai_spring', color: '#f59e0b' },
  { id: 'tpc_spring_twisted', name: 'Twisted Cheese Roll', cat: 'roll', style: 'twisted_spring', color: '#d97706' },
  { id: 'tpc_spring_honey', name: 'Honey Glazed Kebab Roll', cat: 'roll', style: 'honey_spring', color: '#b45309' },

  // Fried Chicken
  { id: 'tpc_chicken_quarter', name: 'Quarter Fried Chicken (3 PC)', cat: 'chicken', style: 'quarter_chicken', color: '#b45309' },
  { id: 'tpc_chicken_half', name: 'Half Fried Chicken (6 PC)', cat: 'chicken', style: 'half_chicken', color: '#9a3412' },
  { id: 'tpc_chicken_full', name: 'Full Fried Chicken (12 PC)', cat: 'chicken', style: 'full_chicken', color: '#7c2d12' },

  // Pastas
  { id: 'tpc_pasta_crunchy', name: 'Crunchy Chicken Oven Pasta', cat: 'pasta', style: 'crunchy_pasta', color: '#f59e0b' },
  { id: 'tpc_pasta_alfredo', name: 'Al Fredo Fettuccine Pasta', cat: 'pasta', style: 'alfredo_pasta', color: '#fef08a' },
  { id: 'tpc_pasta_flaming', name: 'Flaming Arrabbiata Pasta', cat: 'pasta', style: 'flaming_pasta', color: '#dc2626' },
  { id: 'tpc_pasta_creamy', name: 'Creamy White Macaroni Pasta', cat: 'pasta', style: 'creamy_pasta', color: '#fef9c3' },
  { id: 'tpc_pasta_special', name: 'TPC Special Sausage & Mushroom Pasta', cat: 'pasta', style: 'special_pasta', color: '#ea580c' },

  // Starters & Appetizers
  { id: 'tpc_app_cheese_sticks', name: 'Stuffed Cheesy Bread Sticks', cat: 'starter', style: 'cheese_sticks', color: '#eab308' },
  { id: 'tpc_app_baked_wings', name: 'Oven Baked Wings (10 PC)', cat: 'starter', style: 'baked_wings', color: '#c2410c' },
  { id: 'tpc_app_honey_wings', name: 'Honey Glazed Wings (10 PC)', cat: 'starter', style: 'honey_wings', color: '#d97706' },
  { id: 'tpc_app_bbq_wings', name: 'Hickory BBQ Wings (10 PC)', cat: 'starter', style: 'bbq_wings', color: '#7c2d12' },
  { id: 'tpc_app_peri_wings', name: 'Peri Peri Wings (10 PC)', cat: 'starter', style: 'peri_wings', color: '#dc2626' },
  { id: 'tpc_app_hot_wings', name: 'Crispy Hot Wings (10 PC)', cat: 'starter', style: 'hot_wings', color: '#b91c1c' },
  { id: 'tpc_app_hot_shot', name: 'Chicken Hot Shots Popcorn (10 PC)', cat: 'starter', style: 'hot_shot', color: '#ea580c' },
  { id: 'tpc_app_nuggets', name: 'Golden Chicken Nuggets (10 PC)', cat: 'starter', style: 'nuggets', color: '#f59e0b' },
  { id: 'tpc_app_fish_chips', name: 'Golden Fish & Chips (6 PC)', cat: 'starter', style: 'fish_chips', color: '#ca8a04' },

  // Kids Corner
  { id: 'tpc_kids_itsy_bitsy', name: 'Itsy Bitsy Kids Burger Combo', cat: 'kids', style: 'itsy_bitsy', color: '#f59e0b' },
  { id: 'tpc_kids_diddle_fiddle', name: 'Diddle Fiddle Nuggets & Fries', cat: 'kids', style: 'diddle_fiddle', color: '#ea580c' },
  { id: 'tpc_kids_hickory_dickory', name: 'Hickory Dickory Cheesy Tots', cat: 'kids', style: 'hickory_dickory', color: '#eab308' },

  // Beverages & Shakes
  { id: 'tpc_drink_choco_frappe', name: 'TPC Choco Fudge Frappe', cat: 'beverage', style: 'choco_frappe', color: '#3f1f0e' },
  { id: 'tpc_drink_vanilla_shake', name: 'Velvet Vanilla Bean Shake', cat: 'beverage', style: 'vanilla_shake', color: '#fef3c7' },
  { id: 'tpc_drink_strawberry_shake', name: 'Fresh Strawberry Bliss Shake', cat: 'beverage', style: 'strawberry_shake', color: '#f43f5e' },
  { id: 'tpc_drink_caramel_frappe', name: 'Butterscotch Caramel Frappe', cat: 'beverage', style: 'caramel_frappe', color: '#b45309' },
  { id: 'tpc_drink_mango_shake', name: 'Tropical Mango Tango Shake', cat: 'beverage', style: 'mango_shake', color: '#f59e0b' },
  { id: 'tpc_drink_oreo_shake', name: 'Oreo Crumble Overload Shake', cat: 'beverage', style: 'oreo_shake', color: '#1c1917' },
  { id: 'tpc_drink_pepsi_nr', name: 'Chilled Pepsi 250ml', cat: 'beverage', style: 'soda_nr', color: '#1e3a8a' },
  { id: 'tpc_drink_7up_nr', name: 'Chilled 7Up 250ml', cat: 'beverage', style: 'soda_7up', color: '#15803d' },
  { id: 'tpc_drink_1litre', name: 'Soda Bottle 1.0 Litre', cat: 'beverage', style: 'soda_1l', color: '#1e3a8a' },
  { id: 'tpc_drink_1_5litre', name: 'Family Soda 1.5 Litre', cat: 'beverage', style: 'soda_1_5l', color: '#1e3a8a' },
  { id: 'tpc_drink_water_large', name: 'Pure Mineral Water 1.5L', cat: 'beverage', style: 'water_large', color: '#0284c7' },
  { id: 'tpc_drink_water_small', name: 'Pure Mineral Water 500ml', cat: 'beverage', style: 'water_small', color: '#38bdf8' },
  { id: 'tpc_drink_juice', name: 'Citrus Fresh Fruit Juice', cat: 'beverage', style: 'fresh_juice', color: '#ea580c' },

  // Sauces
  { id: 'tpc_sauce_garlic_mayo', name: 'Signature Garlic Mayo Dip', cat: 'sauce', style: 'garlic_mayo', color: '#fef08a' },
  { id: 'tpc_sauce_coleslaw', name: 'Fresh Crunch Coleslaw Salad', cat: 'sauce', style: 'coleslaw', color: '#ecfdf5' },
  { id: 'tpc_sauce_chipotle', name: 'Smoky Chipotle Pepper Sauce', cat: 'sauce', style: 'chipotle', color: '#b91c1c' },
  { id: 'tpc_sauce_secret', name: 'TPC Secret Recipe House Sauce', cat: 'sauce', style: 'secret_sauce', color: '#c2410c' },
  { id: 'tpc_sauce_dipitt', name: 'Dipitt Hot Chili Garlic Dip', cat: 'sauce', style: 'dipitt', color: '#991b1b' },
  { id: 'tpc_sauce_honey_mustard', name: 'Tangy Honey Mustard Sauce', cat: 'sauce', style: 'honey_mustard', color: '#eab308' },

  // TPC Deals
  { id: 'tpc_deal_family_1', name: 'TPC Family Feast 1', cat: 'deal', style: 'family_1', color: '#b91c1c' },
  { id: 'tpc_deal_family_2', name: 'TPC Family Feast 2', cat: 'deal', style: 'family_2', color: '#c2410c' },
  { id: 'tpc_deal_mega_treat', name: 'TPC Mega Treat Combo', cat: 'deal', style: 'mega_treat', color: '#9a3412' },
  { id: 'tpc_deal_1', name: 'TPC Saver Deal 1', cat: 'deal', style: 'deal_1', color: '#ea580c' },
  { id: 'tpc_deal_2', name: 'TPC Duo Deal 2', cat: 'deal', style: 'deal_2', color: '#d97706' },
  { id: 'tpc_deal_3', name: 'TPC Party Deal 3', cat: 'deal', style: 'deal_3', color: '#b45309' },
  { id: 'tpc_deal_4', name: 'TPC Double Pizza Deal 4', cat: 'deal', style: 'deal_4', color: '#7c2d12' },
  { id: 'tpc_deal_5', name: 'TPC Twin Classic Deal 5', cat: 'deal', style: 'deal_5', color: '#991b1b' },
  { id: 'tpc_deal_value_bite', name: 'TPC Value Bite Deal', cat: 'deal', style: 'value_bite', color: '#eab308' },
  { id: 'tpc_deal_student_1', name: 'Student Meal 1 (Zinger Combo)', cat: 'deal', style: 'student_1', color: '#f59e0b' },
  { id: 'tpc_deal_student_2', name: 'Student Meal 2 (Regy Combo)', cat: 'deal', style: 'student_2', color: '#ea580c' },
  { id: 'tpc_deal_junior_bites', name: 'Junior Bites Mega Box', cat: 'deal', style: 'junior_bites', color: '#d97706' },
];

// Map cropped authentic images to the most prominent flagship items
const authenticMap = {
  'tpc_classic_tikka': 'chicken_tikka_pizza.jpg',
  'tpc_sig_special': 'special_pizza_swirl.jpg',
  'tpc_prem_new_york': 'pan_pizza_glow.jpg',
  'tpc_classic_supreme': 'tpc_box_pizza.jpg',
  'tpc_app_cheese_sticks': 'cheese_sticks.jpg',
  'tpc_drink_choco_frappe': 'choco_frappe.jpg',
  'tpc_drink_vanilla_shake': 'tpc_shakes_duo.jpg',
  'tpc_sandwich_club': 'club_sandwich.jpg',
  'tpc_sandwich_special': 'panini_sandwich.jpg',
  'tpc_steak_holy_smoke': 'steak_burger_feast.jpg',
};

async function generateAll() {
  console.log(`Generating distinct visual assets for ${products.length} products...`);

  for (let i = 0; i < products.length; i++) {
    const p = products[i];
    const filename = `${p.id}.jpg`;
    const targetPath = path.join(outDir, filename);

    // If an authentic photo is mapped and already exists, copy it
    if (authenticMap[p.id]) {
      const srcAuthentic = path.join(outDir, authenticMap[p.id]);
      if (fs.existsSync(srcAuthentic) && filename !== authenticMap[p.id]) {
        fs.copyFileSync(srcAuthentic, targetPath);
        console.log(`[Mapped Authentic] ${filename}`);
        continue;
      }
    }

    if (fs.existsSync(targetPath)) {
      continue;
    }

    // Generate high quality distinct food photography style image
    const width = 800;
    const height = 600;

    // Distinct SVG graphic representation with rich textures, lighting, toppings, and badges
    let svgContent = '';
    const hueOffset = (i * 27) % 360;

    if (p.cat === 'pizza') {
      svgContent = `
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#2a231f"/>
            <stop offset="100%" stop-color="#140f0c"/>
          </radialGradient>
          <radialGradient id="crust" cx="50%" cy="50%" r="48%">
            <stop offset="70%" stop-color="#c67d38"/>
            <stop offset="88%" stop-color="#a45922"/>
            <stop offset="100%" stop-color="#78350f"/>
          </radialGradient>
          <radialGradient id="cheese" cx="50%" cy="50%" r="42%">
            <stop offset="0%" stop-color="#fffbeb"/>
            <stop offset="60%" stop-color="#fef08a"/>
            <stop offset="85%" stop-color="#f59e0b"/>
            <stop offset="100%" stop-color="#d97706"/>
          </radialGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="16" stdDeviation="18" flood-color="#000" flood-opacity="0.6"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Board -->
        <circle cx="400" cy="300" r="240" fill="#382417" filter="url(#shadow)"/>
        <circle cx="400" cy="300" r="235" fill="none" stroke="#503322" stroke-width="4"/>
        <!-- Crust -->
        <circle cx="400" cy="300" r="215" fill="url(#crust)"/>
        <!-- Sauce & Cheese -->
        <circle cx="400" cy="300" r="190" fill="url(#cheese)"/>
        <!-- Pizza Slices lines -->
        <path d="M400,110 L400,490 M235,205 L565,395 M235,395 L565,205" stroke="#9a3412" stroke-width="2" opacity="0.35"/>
        <!-- Toppings -->
        <g fill="#991b1b">
          <circle cx="360" cy="240" r="18"/>
          <circle cx="450" cy="250" r="22"/>
          <circle cx="420" cy="340" r="20"/>
          <circle cx="330" cy="330" r="19"/>
          <circle cx="400" cy="210" r="17"/>
          <circle cx="470" cy="320" r="18"/>
        </g>
        <!-- Olives -->
        <g fill="#171717" stroke="#0a0a0a" stroke-width="5">
          <circle cx="380" cy="270" r="10" fill="none"/>
          <circle cx="440" cy="285" r="9" fill="none"/>
          <circle cx="350" cy="360" r="11" fill="none"/>
          <circle cx="430" cy="220" r="10" fill="none"/>
          <circle cx="340" cy="270" r="9" fill="none"/>
        </g>
        <!-- Green Capsicum -->
        <g stroke="#15803d" stroke-width="6" stroke-linecap="round" fill="none">
          <path d="M370,220 Q385,225 390,240"/>
          <path d="M430,330 Q445,340 460,335"/>
          <path d="M340,310 Q350,325 345,340"/>
          <path d="M420,260 Q430,270 425,280"/>
        </g>
        <!-- Ranch / Mayo Swirl -->
        <path d="M260,300 C300,200 500,210 520,320 C510,410 320,400 310,320 C320,260 460,260 460,320" 
              fill="none" stroke="#fefce8" stroke-width="7" stroke-linecap="round" opacity="0.88"/>
      `;
    } else if (p.cat === 'burger') {
      svgContent = `
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#241e1b"/>
            <stop offset="100%" stop-color="#0f0c0a"/>
          </radialGradient>
          <filter id="shadow">
            <feDropShadow dx="0" dy="18" stdDeviation="20" flood-color="#000" flood-opacity="0.6"/>
          </filter>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Cutting board -->
        <rect x="180" y="440" width="440" height="40" rx="8" fill="#451a03" opacity="0.6"/>
        <!-- Bottom Bun -->
        <ellipse cx="400" cy="420" rx="150" ry="45" fill="#d97706" filter="url(#shadow)"/>
        <!-- Sauce dripping -->
        <path d="M270,410 Q400,435 530,410 Q480,440 400,435 Q320,440 270,410" fill="#dc2626"/>
        <!-- Patty -->
        <rect x="250" y="355" width="300" height="50" rx="20" fill="#78350f"/>
        <!-- Crispy coating texture -->
        <rect x="245" y="345" width="310" height="45" rx="18" fill="#b45309"/>
        <!-- Melted Cheese -->
        <polygon points="260,340 380,365 420,340 520,370 540,335 440,335 340,330" fill="#facc15"/>
        <!-- Fresh Lettuce -->
        <path d="M240,330 Q270,300 300,325 Q340,295 380,325 Q420,290 460,325 Q500,295 530,320 Q550,305 560,330 Z" fill="#22c55e"/>
        <!-- Tomato Slices -->
        <ellipse cx="340" cy="305" rx="75" ry="16" fill="#ef4444"/>
        <ellipse cx="460" cy="305" rx="75" ry="16" fill="#dc2626"/>
        <!-- Top Bun -->
        <path d="M250,290 C250,170 550,170 550,290 Z" fill="#d97706" filter="url(#shadow)"/>
        <!-- Bun highlight -->
        <ellipse cx="400" cy="220" rx="100" ry="35" fill="#f59e0b" opacity="0.4"/>
        <!-- Sesame seeds -->
        <g fill="#fef3c7" opacity="0.9">
          <ellipse cx="360" cy="200" rx="4" ry="7" transform="rotate(20 360 200)"/>
          <ellipse cx="420" cy="190" rx="4" ry="7" transform="rotate(-15 420 190)"/>
          <ellipse cx="450" cy="230" rx="4" ry="7" transform="rotate(40 450 230)"/>
          <ellipse cx="340" cy="240" rx="4" ry="7" transform="rotate(-30 340 240)"/>
          <ellipse cx="390" cy="245" rx="4" ry="7" transform="rotate(10 390 245)"/>
          <ellipse cx="480" cy="210" rx="4" ry="7" transform="rotate(-25 480 210)"/>
          <ellipse cx="310" cy="230" rx="4" ry="7" transform="rotate(35 310 230)"/>
        </g>
      `;
    } else if (p.cat === 'steak') {
      svgContent = `
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#211b18"/>
            <stop offset="100%" stop-color="#0a0807"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Sizzling Cast Iron Skillet -->
        <rect x="150" y="160" width="500" height="300" rx="20" fill="#262626" stroke="#404040" stroke-width="6"/>
        <rect x="160" y="170" width="480" height="280" rx="15" fill="#171717"/>
        <!-- Wooden underliner -->
        <rect x="120" y="440" width="560" height="40" rx="8" fill="#78350f"/>
        <!-- Chicken Steak -->
        <path d="M220,240 C240,200 380,200 420,240 C440,290 380,360 320,360 C250,360 200,280 220,240 Z" fill="#b45309"/>
        <!-- Grill lines -->
        <path d="M240,230 L360,330 M280,220 L390,310 M320,215 L420,300" stroke="#451a03" stroke-width="7" stroke-linecap="round"/>
        <!-- White Cream / Mushroom Sauce -->
        <path d="M240,250 Q310,240 370,270 Q400,310 340,330 Q270,340 250,300 Z" fill="#fef08a" opacity="0.9"/>
        <circle cx="280" cy="280" r="9" fill="#78350f" opacity="0.5"/>
        <circle cx="330" cy="290" r="11" fill="#78350f" opacity="0.5"/>
        <!-- Side Fries & Veggies -->
        <g fill="#eab308">
          <rect x="440" y="220" width="12" height="100" rx="3" transform="rotate(15 440 220)"/>
          <rect x="460" y="210" width="12" height="110" rx="3" transform="rotate(5 460 210)"/>
          <rect x="485" y="220" width="12" height="95" rx="3" transform="rotate(-10 485 220)"/>
          <rect x="510" y="235" width="12" height="85" rx="3" transform="rotate(20 510 235)"/>
        </g>
        <circle cx="460" cy="360" r="18" fill="#ea580c"/>
        <circle cx="495" cy="350" r="16" fill="#15803d"/>
        <circle cx="525" cy="365" r="17" fill="#ea580c"/>
      `;
    } else if (p.cat === 'fries') {
      svgContent = `
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#261c16"/>
            <stop offset="100%" stop-color="#0d0907"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Wire Basket -->
        <polygon points="260,260 540,260 500,470 300,470" fill="none" stroke="#a3a3a3" stroke-width="4"/>
        <line x1="280" y1="330" x2="520" y2="330" stroke="#737373" stroke-width="2"/>
        <line x1="290" y1="400" x2="510" y2="400" stroke="#737373" stroke-width="2"/>
        <!-- Golden French Fries -->
        <g fill="#eab308" stroke="#ca8a04" stroke-width="1.5">
          <rect x="310" y="150" width="18" height="230" rx="4" transform="rotate(-15 310 150)"/>
          <rect x="350" y="140" width="18" height="240" rx="4" transform="rotate(-5 350 140)"/>
          <rect x="390" y="130" width="18" height="250" rx="4"/>
          <rect x="425" y="145" width="18" height="235" rx="4" transform="rotate(10 425 145)"/>
          <rect x="465" y="160" width="18" height="220" rx="4" transform="rotate(20 465 160)"/>
          <rect x="340" y="180" width="16" height="190" rx="4" transform="rotate(8 340 180)"/>
          <rect x="410" y="170" width="16" height="200" rx="4" transform="rotate(-12 410 170)"/>
        </g>
        <!-- Seasoning or Garlic Mayo Drizzle -->
        <path d="M280,260 Q380,310 520,250" stroke="#fef08a" stroke-width="9" stroke-linecap="round" fill="none" opacity="0.9"/>
        <path d="M300,290 Q400,340 500,280" stroke="#dc2626" stroke-width="4" stroke-linecap="round" fill="none" opacity="0.8"/>
      `;
    } else if (p.cat === 'pasta') {
      svgContent = `
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#261b17"/>
            <stop offset="100%" stop-color="#0c0907"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Ceramic Baking Dish -->
        <rect x="180" y="180" width="440" height="280" rx="30" fill="#fafaf9" stroke="#e5e5e5" stroke-width="4"/>
        <rect x="200" y="200" width="400" height="240" rx="20" fill="#f59e0b"/>
        <!-- Bubbling Golden Cheese crust -->
        <ellipse cx="400" cy="320" rx="180" ry="100" fill="#fef08a"/>
        <g fill="#b45309">
          <ellipse cx="320" cy="280" rx="35" ry="18"/>
          <ellipse cx="450" cy="270" rx="40" ry="22"/>
          <ellipse cx="380" cy="350" rx="45" ry="24"/>
          <ellipse cx="460" cy="360" rx="30" ry="15"/>
        </g>
        <!-- Olives & Chicken chunks -->
        <circle cx="340" cy="320" r="10" fill="#171717"/>
        <circle cx="430" cy="310" r="10" fill="#171717"/>
        <rect x="360" y="250" width="25" height="20" rx="5" fill="#78350f"/>
        <rect x="420" y="340" width="30" height="22" rx="5" fill="#78350f"/>
        <!-- Green Herb Garnish -->
        <g fill="#16a34a">
          <circle cx="370" cy="310" r="4"/>
          <circle cx="410" cy="280" r="4"/>
          <circle cx="440" cy="335" r="4"/>
          <circle cx="320" cy="340" r="4"/>
        </g>
      `;
    } else if (p.cat === 'beverage') {
      svgContent = `
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#1f2937"/>
            <stop offset="100%" stop-color="#0b0f19"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Cup / Glass -->
        <polygon points="300,180 500,180 470,480 330,480" fill="${p.color}" opacity="0.85"/>
        <polygon points="310,190 490,190 460,470 340,470" fill="${p.color}"/>
        <!-- Dome Lid / Foam -->
        <path d="M300,180 C300,110 500,110 500,180 Z" fill="#ffffff" opacity="0.9"/>
        <rect x="290" y="175" width="220" height="15" rx="5" fill="#e5e5e5"/>
        <!-- Straw -->
        <line x1="410" y1="80" x2="380" y2="460" stroke="#ef4444" stroke-width="12" stroke-linecap="round"/>
        <!-- Ice cubes -->
        <rect x="340" y="240" width="40" height="40" rx="6" fill="#ffffff" opacity="0.3"/>
        <rect x="420" y="290" width="45" height="45" rx="6" fill="#ffffff" opacity="0.3"/>
        <rect x="360" y="360" width="50" height="50" rx="6" fill="#ffffff" opacity="0.3"/>
        <!-- Brand logo ring -->
        <circle cx="400" cy="320" r="42" fill="#ffffff" opacity="0.95"/>
        <text x="400" y="328" font-family="Arial, sans-serif" font-weight="bold" font-size="20" text-anchor="middle" fill="#000">TPC</text>
      `;
    } else if (p.cat === 'deal') {
      svgContent = `
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#3b1511"/>
            <stop offset="100%" stop-color="#140605"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Deal combo box -->
        <rect x="150" y="150" width="500" height="320" rx="16" fill="#b91c1c"/>
        <rect x="160" y="160" width="480" height="300" rx="12" fill="#991b1b"/>
        <!-- Feast items preview -->
        <circle cx="280" cy="270" r="85" fill="#f59e0b" stroke="#78350f" stroke-width="6"/>
        <circle cx="280" cy="270" r="70" fill="#fef08a"/>
        <!-- Burger in deal -->
        <ellipse cx="440" cy="320" rx="80" ry="25" fill="#d97706"/>
        <path d="M370,300 C370,230 510,230 510,300 Z" fill="#d97706"/>
        <rect x="360" y="295" width="160" height="20" rx="8" fill="#78350f"/>
        <!-- Soda can -->
        <rect x="520" y="210" width="55" height="110" rx="8" fill="#1e3a8a"/>
        <!-- Fries pack -->
        <polygon points="340,320 380,320 370,410 350,410" fill="#dc2626"/>
        <rect x="350" y="300" width="8" height="40" fill="#eab308"/>
        <rect x="362" y="295" width="8" height="45" fill="#eab308"/>
        <!-- Deal Banner -->
        <rect x="220" y="380" width="360" height="60" rx="30" fill="#facc15"/>
        <text x="400" y="420" font-family="'Outfit', sans-serif" font-weight="900" font-size="28" text-anchor="middle" fill="#78350f">SPECIAL VALUE MEAL</text>
      `;
    } else {
      // Wraps, rolls, chicken, sandwiches, starters
      svgContent = `
        <defs>
          <radialGradient id="bg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stop-color="#2a201a"/>
            <stop offset="100%" stop-color="#0f0a07"/>
          </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#bg)"/>
        <!-- Serving Platter -->
        <rect x="180" y="180" width="440" height="260" rx="20" fill="#451a03"/>
        <rect x="190" y="190" width="420" height="240" rx="16" fill="#582407"/>
        <!-- Food item representation -->
        <ellipse cx="400" cy="300" rx="160" ry="75" fill="#d97706"/>
        <ellipse cx="400" cy="290" rx="145" ry="65" fill="#f59e0b"/>
        <!-- Char grill marks & fillings -->
        <path d="M280,260 L320,330 M340,250 L380,335 M400,250 L440,335 M460,255 L500,325" stroke="#78350f" stroke-width="8" stroke-linecap="round"/>
        <!-- Fresh dip / salad -->
        <circle cx="530" cy="240" r="32" fill="#ffffff"/>
        <circle cx="530" cy="240" r="26" fill="#15803d"/>
      `;
    }

    // Add category title & brand watermark
    svgContent += `
      <g>
        <rect x="24" y="24" width="180" height="34" rx="6" fill="#000000" opacity="0.65"/>
        <text x="36" y="47" font-family="'Plus Jakarta Sans', sans-serif" font-weight="700" font-size="14" fill="#facc15" letter-spacing="1">THE PIZZA &amp; CO.</text>
        <text x="400" y="555" font-family="'Outfit', sans-serif" font-weight="700" font-size="22" text-anchor="middle" fill="#ffffff" letter-spacing="0.5">${p.name.toUpperCase().replace(/&/g, 'AND')}</text>
      </g>
    </svg>`;

    const finalSvg = `<?xml version="1.0" encoding="UTF-8"?>
    <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
      ${svgContent}
    `;

    await sharp(Buffer.from(finalSvg))
      .jpeg({ quality: 90 })
      .toFile(targetPath);
  }

  console.log('Successfully prepared all 108 products JPG images!');
}

generateAll().catch(err => {
  console.error(err);
  process.exit(1);
});
