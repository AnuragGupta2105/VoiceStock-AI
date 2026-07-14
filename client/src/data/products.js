const products = [

  // Dairy
// Dairy
{ name: "Milk", brand: "Amul", category: "Dairy", price: 65 },
{ name: "Eggs", brand: "Farm Fresh", category: "Dairy", price: 8 },
{ name: "Cheese", brand: "Amul", category: "Dairy", price: 140 },
{ name: "Butter", brand: "Amul", category: "Dairy", price: 58 },
{ name: "Paneer", brand: "Amul", category: "Dairy", price: 90 },
{ name: "Curd", brand: "Amul", category: "Dairy", price: 35 },
{ name: "Yogurt", brand: "Nestle", category: "Dairy", price: 45 },
  // Bakery
  { name: "Bread", brand: "Britannia", category: "Bakery", price: 45 },
  { name: "Brown Bread", brand: "Harvest Gold", category: "Bakery", price: 55 },
  { name: "Cookies", brand: "Sunfeast", category: "Snacks", price: 35 },
  { name: "Cake", brand: "Monginis", category: "Bakery", price: 250 },

  // Grocery
  { name: "Rice", brand: "India Gate", category: "Grains", price: 70 },
  { name: "Sugar", brand: "Madhur", category: "Grocery", price: 48 },
  { name: "Salt", brand: "Tata", category: "Grocery", price: 28 },
  { name: "Tea", brand: "Tata Tea", category: "Beverages", price: 180 },
  { name: "Coffee", brand: "Nescafe", category: "Beverages", price: 320 },
  { name: "Oil", brand: "Fortune", category: "Grocery", price: 160 },
  { name: "Dal", brand: "24 Mantra", category: "Grains", price: 120 },

  // Fruits
  { name: "Apple", brand: "Fresh Farm", category: "Fruits", price: 120 },
  { name: "Banana", brand: "Fresh Farm", category: "Fruits", price: 60 },
  { name: "Orange", brand: "Fresh Farm", category: "Fruits", price: 90 },
  { name: "Mango", brand: "Fresh Farm", category: "Fruits", price: 150 },
  { name: "Grapes", brand: "Fresh Farm", category: "Fruits", price: 80 },

  // Vegetables
  { name: "Tomato", brand: "Fresh Farm", category: "Vegetables", price: 40 },
  { name: "Potato", brand: "Fresh Farm", category: "Vegetables", price: 35 },
  { name: "Onion", brand: "Fresh Farm", category: "Vegetables", price: 45 },
  { name: "Carrot", brand: "Fresh Farm", category: "Vegetables", price: 60 },
  { name: "Spinach", brand: "Fresh Farm", category: "Vegetables", price: 30 },

  // Snacks
  { name: "Chocolate", brand: "Cadbury", category: "Snacks", price: 90 },
  { name: "Chips", brand: "Lays", category: "Snacks", price: 20 },
  { name: "Popcorn", brand: "ACT II", category: "Snacks", price: 40 },
  { name: "Nachos", brand: "Doritos", category: "Snacks", price: 60 },

  // Personal Care
  { name: "Soap", brand: "Lux", category: "Personal Care", price: 38 },
  { name: "Shampoo", brand: "Clinic Plus", category: "Personal Care", price: 170 },
  { name: "Toothpaste", brand: "Colgate", category: "Personal Care", price: 95 },
  { name: "Toothbrush", brand: "Oral-B", category: "Personal Care", price: 80 },
  { name: "Face Wash", brand: "Himalaya", category: "Personal Care", price: 145 },
// Beverages
{ name: "Juice", brand: "Real", category: "Beverages", price: 120 },
{ name: "Cold Drink", brand: "Coca Cola", category: "Beverages", price: 45 },

// Stationery
{ name: "Notebook", brand: "Classmate", category: "Stationery", price: 70 },
{ name: "Pen", brand: "Reynolds", category: "Stationery", price: 10 },

// Cleaning
{ name: "Detergent", brand: "Surf Excel", category: "Cleaning", price: 180 },
{ name: "Dishwash", brand: "Vim", category: "Cleaning", price: 55 },

// Baby Care
{ name: "Diapers", brand: "Pampers", category: "Baby Care", price: 650 },

// Frozen
{ name: "Ice Cream", brand: "Amul", category: "Frozen", price: 180 },

// Electronics
{ name: "Batteries", brand: "Duracell", category: "Electronics", price: 120 },
// Dairy Alternatives
{ name: "Almond Milk", brand: "Sofit", category: "Dairy", price: 120 },
{ name: "Soy Milk", brand: "Sofit", category: "Dairy", price: 110 },
{ name: "Oat Milk", brand: "Oatly", category: "Dairy", price: 180 },
{ name: "Greek Yogurt", brand: "Epigamia", category: "Dairy", price: 85 },
{ name: "Buttermilk", brand: "Amul", category: "Dairy", price: 30 },
{ name: "Margarine", brand: "Nutralite", category: "Dairy", price: 95 },
{ name: "Tofu", brand: "Urban Platter", category: "Dairy", price: 130 },
{ name: "Mozzarella", brand: "Amul", category: "Dairy", price: 150 },
{ name: "Cheddar", brand: "Britannia", category: "Dairy", price: 160 },

// Bakery
{ name: "Whole Wheat Bread", brand: "Harvest Gold", category: "Bakery", price: 60 },
{ name: "Multigrain Bread", brand: "Harvest Gold", category: "Bakery", price: 70 },
{ name: "White Bread", brand: "Britannia", category: "Bakery", price: 45 },

// Grocery
{ name: "Brown Rice", brand: "India Gate", category: "Grains", price: 90 },
{ name: "Basmati Rice", brand: "India Gate", category: "Grains", price: 140 },
{ name: "Quinoa", brand: "True Elements", category: "Grains", price: 250 },
{ name: "Brown Sugar", brand: "Organic India", category: "Grocery", price: 65 },
{ name: "Jaggery", brand: "24 Mantra", category: "Grocery", price: 70 },
{ name: "Honey", brand: "Dabur", category: "Grocery", price: 210 },
{ name: "Rock Salt", brand: "Tata", category: "Grocery", price: 35 },
{ name: "Pink Salt", brand: "Urban Platter", category: "Grocery", price: 90 },
{ name: "Sea Salt", brand: "Keya", category: "Grocery", price: 75 },
{ name: "Green Tea", brand: "Tetley", category: "Beverages", price: 220 },
{ name: "Herbal Tea", brand: "Organic India", category: "Beverages", price: 250 },
{ name: "Black Tea", brand: "Twinings", category: "Beverages", price: 280 },
{ name: "Instant Coffee", brand: "Nescafe", category: "Beverages", price: 340 },
{ name: "Olive Oil", brand: "Figaro", category: "Grocery", price: 450 },
{ name: "Sunflower Oil", brand: "Fortune", category: "Grocery", price: 180 },
{ name: "Mustard Oil", brand: "Fortune", category: "Grocery", price: 190 },
{ name: "Moong Dal", brand: "24 Mantra", category: "Grains", price: 130 },
{ name: "Masoor Dal", brand: "24 Mantra", category: "Grains", price: 125 },
{ name: "Chana Dal", brand: "24 Mantra", category: "Grains", price: 120 },

// Fruits
{ name: "Pear", brand: "Fresh Farm", category: "Fruits", price: 110 },
{ name: "Guava", brand: "Fresh Farm", category: "Fruits", price: 80 },
{ name: "Papaya", brand: "Fresh Farm", category: "Fruits", price: 70 },
{ name: "Peach", brand: "Fresh Farm", category: "Fruits", price: 150 },
{ name: "Watermelon", brand: "Fresh Farm", category: "Fruits", price: 60 },
{ name: "Blueberries", brand: "Fresh Farm", category: "Fruits", price: 280 },

// Vegetables
{ name: "Cherry Tomato", brand: "Fresh Farm", category: "Vegetables", price: 70 },
{ name: "Capsicum", brand: "Fresh Farm", category: "Vegetables", price: 80 },
{ name: "Sweet Potato", brand: "Fresh Farm", category: "Vegetables", price: 60 },
{ name: "Yam", brand: "Fresh Farm", category: "Vegetables", price: 90 },
{ name: "Spring Onion", brand: "Fresh Farm", category: "Vegetables", price: 45 },
{ name: "Shallots", brand: "Fresh Farm", category: "Vegetables", price: 60 },
{ name: "Beetroot", brand: "Fresh Farm", category: "Vegetables", price: 50 },
{ name: "Radish", brand: "Fresh Farm", category: "Vegetables", price: 35 },
{ name: "Lettuce", brand: "Fresh Farm", category: "Vegetables", price: 90 },
{ name: "Kale", brand: "Fresh Farm", category: "Vegetables", price: 120 },

// Snacks
{ name: "Dark Chocolate", brand: "Amul", category: "Snacks", price: 120 },
{ name: "Crackers", brand: "Sunfeast", category: "Snacks", price: 45 },
{ name: "Biscuits", brand: "Britannia", category: "Snacks", price: 35 },

// Personal Care
{ name: "Body Wash", brand: "Nivea", category: "Personal Care", price: 220 },
{ name: "Hand Wash", brand: "Dettol", category: "Personal Care", price: 110 },
{ name: "Conditioner", brand: "Clinic Plus", category: "Personal Care", price: 180 },
{ name: "Hair Oil", brand: "Parachute", category: "Personal Care", price: 160 },
{ name: "Cleanser", brand: "Cetaphil", category: "Personal Care", price: 350 },

// Miscellaneous
{ name: "Jam", brand: "Kissan", category: "Grocery", price: 150 },
{ name: "Peanut Butter", brand: "Pintola", category: "Grocery", price: 260 },
{ name: "Corn Flakes", brand: "Kellogg's", category: "Breakfast", price: 220 },
{ name: "Muesli", brand: "Bagrry's", category: "Breakfast", price: 280 },
{ name: "Granola", brand: "Yoga Bar", category: "Breakfast", price: 320 },
{ name: "Kulfi", brand: "Amul", category: "Frozen", price: 60 },
{ name: "Smoothie", brand: "Real", category: "Beverages", price: 130 },
{ name: "Sparkling Water", brand: "Bisleri", category: "Beverages", price: 45 },
{ name: "Iced Tea", brand: "Lipton", category: "Beverages", price: 90 }
];

export default products;