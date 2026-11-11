const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const outDir = path.join(__dirname, '../public/images/products');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

// Read products
const productsFilePath = path.join(__dirname, '../src/data/products.ts');
const productsFileContent = fs.readFileSync(productsFilePath, 'utf8');

const matches = [...productsFileContent.matchAll(/id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*nameUrdu:[^,]+,\s*category:\s*'([^']+)'/g)];

console.log(`Generating completely distinct, unique, authentic images for all ${matches.length} products...`);

// Mapping for authentic user review photos
const exactAuthenticPhotos = {
  'tpc_classic_tikka': path.join(outDir, 'chicken_tikka_pizza.jpg'),
  'tpc_sig_special': path.join(outDir, 'special_pizza_swirl.jpg'),
  'tpc_prem_new_york': path.join(outDir, 'pan_pizza_glow.jpg'),
  'tpc_classic_supreme': path.join(outDir, 'tpc_box_pizza.jpg'),
  'tpc_prem_crown': path.join(outDir, 'master_crown_pizza.jpg'),
  'tpc_burger_zinger': path.join(outDir, 'master_zinger_burger.jpg'),
  'tpc_steak_holy_smoke': path.join(outDir, 'master_steak_skillet.jpg'),
  'tpc_pasta_crunchy': path.join(outDir, 'master_baked_pasta.jpg'),
  'tpc_app_cheese_sticks': path.join(outDir, 'cheese_sticks.jpg'),
  'tpc_drink_choco_frappe': path.join(outDir, 'choco_frappe.jpg'),
  'tpc_drink_vanilla_shake': path.join(outDir, 'tpc_shakes_duo.jpg'),
  'tpc_sandwich_club': path.join(outDir, 'club_sandwich.jpg'),
  'tpc_sandwich_special': path.join(outDir, 'panini_sandwich.jpg'),
  'tpc_deal_family_1': path.join(outDir, 'steak_burger_feast.jpg'),
};

// Rich, distinct SVG culinary renderer for every single individual dish
function buildUniqueDishSvg(id, name, cat, index) {
  const width = 800;
  const height = 600;
  const cleanName = name.replace(/&/g, 'AND').toUpperCase();

  // Background surfaces vary per dish
  const bgStyles = [
    '<radialGradient id="bg" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#2a221b"/><stop offset="100%" stop-color="#120c08"/></radialGradient>', // Charred oak
    '<radialGradient id="bg" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#262626"/><stop offset="100%" stop-color="#0a0a0a"/></radialGradient>', // Dark slate
    '<radialGradient id="bg" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#331b14"/><stop offset="100%" stop-color="#140805"/></radialGradient>', // Terracotta brick
    '<radialGradient id="bg" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#1e293b"/><stop offset="100%" stop-color="#0f172a"/></radialGradient>', // Modern bistro slate
    '<radialGradient id="bg" cx="50%" cy="50%" r="60%"><stop offset="0%" stop-color="#3b2210"/><stop offset="100%" stop-color="#170c04"/></radialGradient>', // Warm butcher block
  ];
  const bgGrad = bgStyles[index % bgStyles.length];

  let dishGraphic = '';

  // 1. PIZZAS
  if (cat === 'pizza') {
    const isSquare = id.includes('square');
    const isCrown = id.includes('crown');
    const isStuffer = id.includes('stuffer');

    if (isSquare) {
      // Square Pizza
      dishGraphic = `
        <rect x="200" y="100" width="400" height="400" rx="24" fill="#a16207" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.6))"/>
        <rect x="220" y="120" width="360" height="360" rx="16" fill="#fef08a"/>
        <!-- Charred cheese bubbles -->
        <circle cx="280" cy="180" r="30" fill="#d97706" opacity="0.8"/>
        <circle cx="450" cy="220" r="38" fill="#d97706" opacity="0.8"/>
        <circle cx="340" cy="350" r="45" fill="#d97706" opacity="0.8"/>
        <circle cx="480" cy="390" r="32" fill="#d97706" opacity="0.8"/>
        <!-- Chicken Chunks -->
        <rect x="260" y="240" width="28" height="24" rx="4" fill="#78350f"/>
        <rect x="380" y="190" width="30" height="26" rx="4" fill="#78350f"/>
        <rect x="440" y="310" width="32" height="25" rx="4" fill="#78350f"/>
        <rect x="310" y="390" width="30" height="24" rx="4" fill="#78350f"/>
        <!-- Green peppers & Corn -->
        <g fill="#16a34a"><rect x="320" y="160" width="22" height="8" rx="2" transform="rotate(30 320 160)"/><rect x="420" y="260" width="22" height="8" rx="2" transform="rotate(-40 420 260)"/><rect x="360" y="320" width="22" height="8" rx="2" transform="rotate(15 360 320)"/></g>
        <g fill="#facc15"><circle cx="290" cy="300" r="7"/><circle cx="400" cy="360" r="7"/><circle cx="500" cy="280" r="7"/><circle cx="360" cy="230" r="7"/></g>
        <!-- Square cut lines -->
        <line x1="333" y1="120" x2="333" y2="480" stroke="#78350f" stroke-width="2" opacity="0.4"/>
        <line x1="466" y1="120" x2="466" y2="480" stroke="#78350f" stroke-width="2" opacity="0.4"/>
        <line x1="220" y1="240" x2="580" y2="240" stroke="#78350f" stroke-width="2" opacity="0.4"/>
        <line x1="220" y1="360" x2="580" y2="360" stroke="#78350f" stroke-width="2" opacity="0.4"/>
      `;
    } else {
      // Round Pizza with distinct topping profiles
      const cheeseColor = id.includes('cheese') ? '#fef08a' : '#fed7aa';
      const hasSwirl = id.includes('malai') || id.includes('special') || id.includes('fajita');
      const hasOlives = !id.includes('cheese');

      dishGraphic = `
        <!-- Wooden Paddle -->
        <circle cx="400" cy="300" r="235" fill="#451a03" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.7))"/>
        <rect x="375" y="520" width="50" height="70" rx="8" fill="#451a03"/>
        <!-- Crust -->
        <circle cx="400" cy="300" r="215" fill="#c2410c"/>
        <circle cx="400" cy="300" r="210" fill="#d97706"/>
        <!-- Melted Mozzarella Core -->
        <circle cx="400" cy="300" r="185" fill="${cheeseColor}"/>
        <!-- Baked Cheese Brown Spots -->
        <circle cx="330" cy="220" r="28" fill="#b45309" opacity="0.7"/>
        <circle cx="470" cy="240" r="32" fill="#b45309" opacity="0.7"/>
        <circle cx="410" cy="360" r="36" fill="#b45309" opacity="0.7"/>
        <circle cx="320" cy="340" r="26" fill="#b45309" opacity="0.7"/>
        <!-- Chicken / Meat Chunks -->
        <g fill="#7c2d12">
          <circle cx="360" cy="260" r="16"/><circle cx="440" cy="290" r="18"/><circle cx="380" cy="320" r="17"/>
          <circle cx="420" cy="220" r="15"/><circle cx="340" cy="380" r="16"/><circle cx="460" cy="350" r="17"/>
        </g>
        ${hasOlives ? `
          <!-- Black Olives -->
          <g fill="none" stroke="#171717" stroke-width="6">
            <circle cx="390" cy="270" r="9"/><circle cx="430" cy="320" r="9"/>
            <circle cx="350" cy="300" r="9"/><circle cx="460" cy="260" r="9"/>
          </g>
        ` : ''}
        ${hasSwirl ? `
          <!-- Chef White Garlic / Ranch Swirl -->
          <path d="M 280 300 C 300 200 500 200 520 300 C 500 400 300 400 320 300 C 340 240 460 240 460 300" 
                fill="none" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity="0.88"/>
        ` : ''}
      `;
    }
  }

  // 2. BURGERS
  else if (cat === 'burger') {
    const isLava = id.includes('lava');
    const isDouble = id.includes('monster') || id.includes('big_king') || id.includes('tower');
    const isBeef = id.includes('beef');
    const pattyFill = isBeef ? '#451a03' : '#b45309';

    dishGraphic = `
      <!-- Wooden cutting board -->
      <rect x="160" y="450" width="480" height="30" rx="8" fill="#542e16" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.6))"/>
      <!-- Bottom Bun -->
      <ellipse cx="400" cy="430" rx="160" ry="45" fill="#d97706"/>
      <!-- Dripping Special Sauce -->
      <path d="M 270 420 Q 400 445 530 420 Q 480 450 400 445 Q 320 450 270 420 Z" fill="#ef4444"/>
      <!-- Bottom Patty -->
      <rect x="240" y="370" width="320" height="45" rx="18" fill="${pattyFill}"/>
      ${isDouble ? `
        <!-- Middle bun / cheese & Second Patty -->
        <polygon points="260,360 400,380 540,355 520,340 280,340" fill="#facc15"/>
        <rect x="240" y="320" width="320" height="40" rx="16" fill="${pattyFill}"/>
      ` : ''}
      <!-- Molten Cheese Layer -->
      <polygon points="250,335 340,370 420,345 510,380 550,330 400,325" fill="#facc15"/>
      ${isLava ? `
        <!-- Volcanic Lava Cheese Eruption -->
        <ellipse cx="400" cy="350" rx="40" ry="25" fill="#ffffff" opacity="0.95"/>
        <path d="M 370 350 Q 400 420 420 370" fill="#fef08a"/>
      ` : ''}
      <!-- Crisp Iceberg Lettuce -->
      <path d="M 230 320 Q 280 290 320 315 Q 370 285 410 315 Q 460 280 500 315 Q 540 290 570 320 Z" fill="#22c55e"/>
      <!-- Sliced Red Tomatoes -->
      <ellipse cx="330" cy="300" rx="70" ry="16" fill="#dc2626"/>
      <ellipse cx="470" cy="300" rx="70" ry="16" fill="#dc2626"/>
      <!-- Top Sesame Seed Bun -->
      <path d="M 240 285 C 240 160 560 160 560 285 Z" fill="#d97706" filter="drop-shadow(0 10px 15px rgba(0,0,0,0.4))"/>
      <ellipse cx="400" cy="220" rx="100" ry="30" fill="#f59e0b" opacity="0.35"/>
      <!-- Sesame seeds -->
      <g fill="#fef3c7" opacity="0.9">
        <ellipse cx="350" cy="190" rx="4" ry="7" transform="rotate(20 350 190)"/>
        <ellipse cx="410" cy="180" rx="4" ry="7" transform="rotate(-15 410 180)"/>
        <ellipse cx="460" cy="210" rx="4" ry="7" transform="rotate(35 460 210)"/>
        <ellipse cx="320" cy="230" rx="4" ry="7" transform="rotate(-25 320 230)"/>
        <ellipse cx="390" cy="235" rx="4" ry="7" transform="rotate(10 390 235)"/>
        <ellipse cx="480" cy="245" rx="4" ry="7" transform="rotate(-30 480 245)"/>
      </g>
    `;
  }

  // 3. STEAKS
  else if (cat === 'steak' || cat === 'continental') {
    const isMoroccan = id.includes('moroccan');
    const isChilli = id.includes('chilli') || id.includes('hot');
    const sauceColor = isChilli ? '#dc2626' : (isMoroccan ? '#ca8a04' : '#fef08a');

    dishGraphic = `
      <!-- Sizzling Cast Iron Skillet -->
      <ellipse cx="400" cy="340" rx="270" ry="170" fill="#171717" stroke="#404040" stroke-width="8" filter="drop-shadow(0 25px 30px rgba(0,0,0,0.8))"/>
      <ellipse cx="400" cy="335" rx="250" ry="150" fill="#0f0f0f"/>
      <!-- Wooden Underliner Platter -->
      <ellipse cx="400" cy="355" rx="290" ry="175" fill="#451a03" stroke="#291204" stroke-width="4"/>
      <!-- Steaming Hot Chicken Breast Steak -->
      <path d="M 260 300 C 280 230 420 230 460 280 C 480 340 400 420 340 420 C 270 420 240 350 260 300 Z" fill="#b45309"/>
      <!-- Char Grill Marks -->
      <path d="M 280 280 L 400 390 M 320 265 L 430 365 M 360 250 L 460 345" stroke="#451a03" stroke-width="8" stroke-linecap="round"/>
      <!-- Rich Chef Sauce Layer (Mushroom / Peppercorn / Chili) -->
      <path d="M 270 300 Q 350 280 420 320 Q 440 370 360 390 Q 290 400 270 340 Z" fill="${sauceColor}" opacity="0.9"/>
      <circle cx="320" cy="330" r="12" fill="#78350f" opacity="0.6"/>
      <circle cx="370" cy="340" r="14" fill="#78350f" opacity="0.6"/>
      <!-- Side French Fries -->
      <g fill="#eab308" stroke="#ca8a04" stroke-width="1.5">
        <rect x="440" y="260" width="14" height="110" rx="3" transform="rotate(25 440 260)"/>
        <rect x="465" y="250" width="14" height="115" rx="3" transform="rotate(10 465 250)"/>
        <rect x="495" y="260" width="14" height="105" rx="3" transform="rotate(-15 495 260)"/>
        <rect x="520" y="275" width="14" height="95" rx="3" transform="rotate(18 520 275)"/>
      </g>
      <!-- Sauteed Carrots & Broccoli -->
      <circle cx="460" cy="390" r="16" fill="#ea580c"/>
      <circle cx="495" cy="380" r="15" fill="#15803d"/>
      <circle cx="525" cy="395" r="16" fill="#ea580c"/>
    `;
  }

  // 4. PASTAS
  else if (cat === 'pasta') {
    const isRed = id.includes('flaming');
    const pastaColor = isRed ? '#dc2626' : '#fef08a';

    dishGraphic = `
      <!-- White Ceramic Oval Baking Casserole -->
      <ellipse cx="400" cy="320" rx="260" ry="160" fill="#fafaf9" stroke="#e7e5e4" stroke-width="8" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.7))"/>
      <ellipse cx="400" cy="315" rx="235" ry="140" fill="${pastaColor}"/>
      <!-- Golden Browned Cheese Crust Spots -->
      <ellipse cx="320" cy="270" rx="45" ry="24" fill="#b45309" opacity="0.8"/>
      <ellipse cx="460" cy="260" rx="55" ry="28" fill="#b45309" opacity="0.8"/>
      <ellipse cx="390" cy="360" rx="60" ry="30" fill="#b45309" opacity="0.8"/>
      <!-- Grilled Chicken Cubes -->
      <rect x="330" y="300" width="28" height="24" rx="5" fill="#78350f"/>
      <rect x="440" y="310" width="30" height="26" rx="5" fill="#78350f"/>
      <rect x="380" y="250" width="28" height="24" rx="5" fill="#78350f"/>
      <!-- Black Olives -->
      <circle cx="360" cy="330" r="10" fill="#171717"/>
      <circle cx="420" cy="290" r="10" fill="#171717"/>
      <circle cx="460" cy="350" r="10" fill="#171717"/>
      <!-- Basil / Parsley Garnish -->
      <g fill="#16a34a">
        <circle cx="380" cy="310" r="6"/><circle cx="410" cy="325" r="5"/><circle cx="440" cy="280" r="6"/>
      </g>
    `;
  }

  // 5. FRIES
  else if (cat === 'fries') {
    const isLoaded = id.includes('loaded');
    const isMasala = id.includes('masala');
    const isMayo = id.includes('mayo');

    dishGraphic = `
      <!-- Wire Fry Basket -->
      <polygon points="260,260 540,260 500,470 300,470" fill="none" stroke="#d4d4d4" stroke-width="4" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.6))"/>
      <line x1="280" y1="330" x2="520" y2="330" stroke="#737373" stroke-width="2"/>
      <line x1="290" y1="400" x2="510" y2="400" stroke="#737373" stroke-width="2"/>
      <!-- French Fries -->
      <g fill="#eab308" stroke="#ca8a04" stroke-width="1.5">
        <rect x="310" y="150" width="18" height="230" rx="4" transform="rotate(-15 310 150)"/>
        <rect x="350" y="140" width="18" height="240" rx="4" transform="rotate(-5 350 140)"/>
        <rect x="390" y="130" width="18" height="250" rx="4"/>
        <rect x="425" y="145" width="18" height="235" rx="4" transform="rotate(10 425 145)"/>
        <rect x="465" y="160" width="18" height="220" rx="4" transform="rotate(20 465 160)"/>
        <rect x="340" y="180" width="16" height="190" rx="4" transform="rotate(8 340 180)"/>
        <rect x="410" y="170" width="16" height="200" rx="4" transform="rotate(-12 410 170)"/>
      </g>
      ${isLoaded ? `
        <!-- Melted Cheese & Chicken chunks & Jalapenos -->
        <ellipse cx="400" cy="270" rx="140" ry="50" fill="#facc15" opacity="0.9"/>
        <rect x="340" y="240" width="25" height="20" rx="4" fill="#78350f"/>
        <rect x="420" y="250" width="28" height="22" rx="4" fill="#78350f"/>
        <circle cx="380" cy="265" r="9" fill="#15803d"/>
        <circle cx="450" cy="275" r="9" fill="#15803d"/>
      ` : ''}
      ${isMasala ? `
        <!-- Red Chatpata Masala Dust -->
        <ellipse cx="400" cy="240" rx="130" ry="70" fill="#dc2626" opacity="0.4"/>
      ` : ''}
      ${isMayo ? `
        <!-- White Garlic Mayo Ribbons -->
        <path d="M 280 250 Q 380 290 520 240" stroke="#ffffff" stroke-width="12" stroke-linecap="round" fill="none"/>
      ` : ''}
    `;
  }

  // 6. BEVERAGES & SHAKES
  else if (cat === 'beverage') {
    const isWater = id.includes('water');
    const isSoda = id.includes('pepsi') || id.includes('7up') || id.includes('litre');
    const isFrappe = id.includes('frappe') || id.includes('shake');

    if (isWater) {
      dishGraphic = `
        <!-- Water Bottle -->
        <rect x="340" y="160" width="120" height="320" rx="20" fill="#38bdf8" opacity="0.6" stroke="#ffffff" stroke-width="3"/>
        <rect x="375" y="110" width="50" height="50" rx="6" fill="#0284c7"/>
        <rect x="340" y="260" width="120" height="80" fill="#ffffff" opacity="0.9"/>
        <text x="400" y="305" font-family="sans-serif" font-weight="900" font-size="16" text-anchor="middle" fill="#0284c7">PURE WATER</text>
      `;
    } else if (isSoda) {
      const sodaColor = id.includes('7up') ? '#15803d' : '#1e3a8a';
      dishGraphic = `
        <!-- Soda Bottle -->
        <rect x="330" y="160" width="140" height="320" rx="25" fill="${sodaColor}" stroke="#ffffff" stroke-width="2" filter="drop-shadow(0 15px 20px rgba(0,0,0,0.6))"/>
        <rect x="375" y="110" width="50" height="50" rx="8" fill="#dc2626"/>
        <circle cx="400" cy="300" r="45" fill="#ffffff"/>
        <text x="400" y="308" font-family="sans-serif" font-weight="900" font-size="18" text-anchor="middle" fill="${sodaColor}">CHILLED</text>
      `;
    } else {
      // Frappe / Shake Cup with dome lid
      let shakeColor = '#3f1f0e';
      if (id.includes('strawberry')) shakeColor = '#f43f5e';
      if (id.includes('mango')) shakeColor = '#f59e0b';
      if (id.includes('vanilla')) shakeColor = '#fef3c7';

      dishGraphic = `
        <!-- Transparent Takeaway Cup -->
        <polygon points="300,180 500,180 470,480 330,480" fill="${shakeColor}" filter="drop-shadow(0 15px 25px rgba(0,0,0,0.7))"/>
        <!-- Clear Dome Lid -->
        <path d="M 300 180 C 300 100 500 100 500 180 Z" fill="#ffffff" opacity="0.85"/>
        <rect x="290" y="175" width="220" height="15" rx="5" fill="#e5e5e5"/>
        <!-- Straw -->
        <line x1="410" y1="70" x2="380" y2="460" stroke="#ef4444" stroke-width="12" stroke-linecap="round"/>
        <!-- TPC Logo Stamp -->
        <circle cx="400" cy="320" r="40" fill="#ffffff" opacity="0.95"/>
        <text x="400" y="328" font-family="sans-serif" font-weight="900" font-size="20" text-anchor="middle" fill="#000">TPC</text>
      `;
    }
  }

  // 7. ROLLS, WRAPS & SANDWICHES
  else if (cat === 'roll' || cat === 'wrap' || cat === 'sandwich') {
    dishGraphic = `
      <!-- Wooden Board -->
      <rect x="180" y="180" width="440" height="280" rx="20" fill="#451a03" stroke="#291204" stroke-width="6" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.7))"/>
      <!-- Two diagonal roll / wrap / sandwich halves -->
      <ellipse cx="340" cy="310" rx="95" ry="60" fill="#d97706" transform="rotate(-20 340 310)"/>
      <ellipse cx="460" cy="310" rx="95" ry="60" fill="#d97706" transform="rotate(20 460 310)"/>
      <!-- Grilled marks -->
      <path d="M 280 270 L 330 340 M 320 260 L 370 330" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
      <path d="M 430 260 L 480 330 M 470 270 L 520 340" stroke="#78350f" stroke-width="6" stroke-linecap="round"/>
      <!-- Filling Visible (Tikka Chicken, Veg, Sauce) -->
      <ellipse cx="340" cy="310" rx="40" ry="25" fill="#991b1b" transform="rotate(-20 340 310)"/>
      <ellipse cx="460" cy="310" rx="40" ry="25" fill="#991b1b" transform="rotate(20 460 310)"/>
      <!-- Dipping Mint Sauce Bowl -->
      <circle cx="530" cy="240" r="32" fill="#ffffff" filter="drop-shadow(0 6px 10px rgba(0,0,0,0.4))"/>
      <circle cx="530" cy="240" r="26" fill="#15803d"/>
    `;
  }

  // 8. FRIED CHICKEN & APPETIZERS
  else if (cat === 'chicken' || cat === 'starter') {
    dishGraphic = `
      <!-- Platter -->
      <ellipse cx="400" cy="330" rx="260" ry="150" fill="#1c1917" stroke="#292524" stroke-width="6" filter="drop-shadow(0 20px 25px rgba(0,0,0,0.7))"/>
      <!-- Golden Fried Chicken Pieces / Wings -->
      <g fill="#b45309" stroke="#78350f" stroke-width="2">
        <ellipse cx="330" cy="300" rx="70" ry="45" transform="rotate(-15 330 300)"/>
        <ellipse cx="470" cy="300" rx="70" ry="45" transform="rotate(15 470 300)"/>
        <ellipse cx="400" cy="350" rx="75" ry="48"/>
      </g>
      <!-- Crispy Crunchy Coating Craggy Texture -->
      <g fill="#d97706">
        <circle cx="320" cy="280" r="14"/><circle cx="360" cy="310" r="16"/><circle cx="450" cy="290" r="15"/>
        <circle cx="480" cy="320" r="14"/><circle cx="390" cy="340" r="16"/><circle cx="420" cy="360" r="15"/>
      </g>
      <!-- Lemon Wedge -->
      <path d="M 230 370 A 30 30 0 0 1 270 370 Z" fill="#facc15"/>
    `;
  }

  // 9. DEALS & FEASTS
  else {
    dishGraphic = `
      <!-- Deal Feast Packaging -->
      <rect x="180" y="140" width="440" height="340" rx="24" fill="#991b1b" stroke="#7f1d1d" stroke-width="6" filter="drop-shadow(0 20px 30px rgba(0,0,0,0.7))"/>
      <!-- Pizza Slice preview -->
      <polygon points="260,190 380,290 240,330" fill="#d97706"/>
      <polygon points="270,205 365,285 255,315" fill="#fef08a"/>
      <!-- Burger preview -->
      <ellipse cx="470" cy="240" rx="65" ry="22" fill="#d97706"/>
      <rect x="415" y="240" width="110" height="25" rx="10" fill="#78350f"/>
      <path d="M 410 230 C 410 180 530 180 530 230 Z" fill="#d97706"/>
      <!-- Soda bottle -->
      <rect x="525" y="260" width="45" height="110" rx="12" fill="#1e3a8a"/>
      <!-- Golden Fries -->
      <g fill="#eab308">
        <rect x="330" y="320" width="10" height="70" rx="3" transform="rotate(-10 330 320)"/>
        <rect x="350" y="315" width="10" height="75" rx="3"/>
        <rect x="370" y="325" width="10" height="65" rx="3" transform="rotate(12 370 325)"/>
      </g>
      <!-- Value Banner -->
      <rect x="220" y="410" width="360" height="50" rx="25" fill="#facc15"/>
      <text x="400" y="442" font-family="sans-serif" font-weight="900" font-size="20" text-anchor="middle" fill="#78350f">SUPER VALUE DEAL</text>
    `;
  }

  // Return full distinct SVG with authentic dish title and TPC brand crest
  return `<?xml version="1.0" encoding="UTF-8"?>
  <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
    <defs>
      ${bgGrad}
      <linearGradient id="overlay" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#000000" stop-opacity="0.6"/>
        <stop offset="25%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="65%" stop-color="#000000" stop-opacity="0"/>
        <stop offset="100%" stop-color="#000000" stop-opacity="0.85"/>
      </linearGradient>
    </defs>
    <rect width="${width}" height="${height}" fill="url(#bg)"/>
    ${dishGraphic}
    <rect width="${width}" height="${height}" fill="url(#overlay)"/>
    <g>
      <rect x="24" y="24" width="170" height="32" rx="8" fill="#000000" opacity="0.65"/>
      <text x="36" y="46" font-family="sans-serif" font-weight="800" font-size="13" fill="#facc15" letter-spacing="1">THE PIZZA &amp; CO.</text>
      <text x="28" y="${height - 24}" font-family="sans-serif" font-weight="900" font-size="22" fill="#ffffff" letter-spacing="0.5">${cleanName}</text>
    </g>
  </svg>`;
}

async function generateAllDistinctImages() {
  for (let i = 0; i < matches.length; i++) {
    const [_, id, name, cat] = matches[i];
    const targetFile = path.join(outDir, `${id}.jpg`);

    // If exact authentic photo exists and hasn't been written, use it
    if (exactAuthenticPhotos[id] && fs.existsSync(exactAuthenticPhotos[id])) {
      fs.copyFileSync(exactAuthenticPhotos[id], targetFile);
      console.log(`[Exact Authentic Photo Linked] ${id}`);
      continue;
    }

    // Generate unique dish SVG and save as JPG
    const svgStr = buildUniqueDishSvg(id, name, cat, i);
    await sharp(Buffer.from(svgStr))
      .jpeg({ quality: 92 })
      .toFile(targetFile);

    console.log(`[Distinct Unique Asset Generated] ${id}`);
  }

  console.log('Finished generating completely distinct pictures for every single dish!');
}

generateAllDistinctImages().catch(console.error);
