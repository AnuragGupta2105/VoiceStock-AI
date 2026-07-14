import productAliases from "./productAliases";

// ==========================
// Quantity Words
// ==========================

const quantityWords = {
  zero: 0,
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10,

  ek: 1,
  do: 2,
  teen: 3,
  char: 4,
  chaar: 4,
  paanch: 5,
  paanchh: 5,
  cheh: 6,
  saat: 7,
  aath: 8,
  nau: 9,
  dus: 10,
};

// ==========================
// Actions
// ==========================

const addWords = [
  "add",
  "buy",
  "purchase",
  "need",
  "want",
  "get",
  "bring",
  "include",
  "put",

  "chahiye",
  "kharid",
  "kharido",
  "kharidna",
  "le",
  "lao",
  "laana",
  "add karo",
  "daal do",
  "dal do",
];

const removeWords = [
  "remove",
  "delete",
  "discard",
  "erase",

  "hatao",
  "nikal",
  "nikal do",
  "remove karo",
  "delete karo",
];

const searchWords = [
  "find",
  "search",
  "locate",
  "show",
  "look",

  "dhoondo",
  "dikhao",
  "search karo",
];

// ==========================
// Fillers
// ==========================

const fillers = [
  "please",
  "can",
  "could",
  "would",
  "kindly",

  "i",
  "me",
  "my",
  "to",

  "want",
  "need",

  "mujhe",
  "mere",
  "liye",
  "zara",
  "kripya",

  "please",

  "shopping",
  "list",
  "cart",

  "of",
  "some",
  "a",
  "an",
];

// ==========================
export function parseCommand(text) {

  let input = text.toLowerCase().trim();

  input = input.replace(/[.,!?]/g, "");

  // ======================
  // Quantity
  // ======================

  let quantity = 1;

  const digit = input.match(/\d+/);

  if (digit) {

    quantity = Number(digit[0]);

  } else {

    for (const word in quantityWords) {

      if (input.includes(word)) {

        quantity = quantityWords[word];
        break;

      }

    }

  }

  // ======================
  // Action
  // ======================

  let action = "ADD";

  if (removeWords.some(word => input.includes(word))) {

    action = "REMOVE";

  }

  else if (searchWords.some(word => input.includes(word))) {

    action = "SEARCH";

  }

  else if (addWords.some(word => input.includes(word))) {

    action = "ADD";

  }

  // ======================
  // Price Filter
  // ======================

  let price = null;

  const priceMatch =
    input.match(/under\s*₹?\s*(\d+)/i) ||
    input.match(/below\s*₹?\s*(\d+)/i) ||
    input.match(/less than\s*₹?\s*(\d+)/i);

  if (priceMatch) {

    price = Number(priceMatch[1] || priceMatch[2]);

  }

  // ======================
  // Brand Detection
  // ======================

  let brand = "";

  const brands = [

    "amul",
    "britannia",
    "nestle",
    "nescafe",
    "parle",
    "tata",
    "fortune",
    "cadbury",
    "lays",
    "doritos",
    "lux",
    "colgate",
    "oral-b",
    "himalaya",
    "real",
    "coca cola",
    "classmate",
    "reynolds",
    "surf excel",
    "vim",
    "pampers"

  ];

  for (const b of brands) {

    if (input.includes(b)) {

      brand = b
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      break;

    }

  }

  // ======================
  // Category Detection
  // ======================

  let category = "";

  const categories = [

    "dairy",
    "bakery",
    "grains",
    "grocery",
    "fruits",
    "vegetables",
    "snacks",
    "beverages",
    "personal care",
    "cleaning",
    "baby care",
    "electronics",
    "frozen",
    "stationery"

  ];

  for (const cat of categories) {

    if (input.includes(cat)) {

      category = cat
        .split(" ")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      break;

    }

  }

  // ======================
  // Product Detection
  // ======================

  let item = "";

  for (const alias in productAliases) {

    if (input.includes(alias)) {

      item = productAliases[alias];

      break;

    }

  }

  // ======================
  // Fallback
  // ======================

  if (!item) {

    let cleaned = input;

    fillers.forEach(word => {

      cleaned = cleaned.replace(

        new RegExp("\\b" + word + "\\b", "g"),

        ""

      );

    });

    cleaned = cleaned
      .replace(/\d+/g, "")
      .replace(/\s+/g, " ")
      .trim();

    if (cleaned.length > 0) {

      item =
        cleaned.charAt(0).toUpperCase() +
        cleaned.slice(1);

    }

  }

  return {

    action,

    item,

    quantity,

    brand,

    category,

    price,

  };

}