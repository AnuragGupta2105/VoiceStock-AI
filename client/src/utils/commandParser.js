import products from "../data/products";

const numbers = {
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
};

export function parseCommand(text) {

  const input = text.toLowerCase().trim();

  // ---------------- Quantity ----------------

  let quantity = 1;

  const digit = input.match(/\d+/);

  if (digit) {

    quantity = Number(digit[0]);

  } else {

    for (const word in numbers) {

      if (input.includes(word)) {

        quantity = numbers[word];
        break;

      }

    }

  }

  // ---------------- Action ----------------

  let action = "ADD";

  if (
    input.includes("remove") ||
    input.includes("delete")
  ) {

    action = "REMOVE";

  }

  else if (
    input.includes("find") ||
    input.includes("search")
  ) {

    action = "SEARCH";

  }

  // ---------------- Product Detection ----------------

  let productName = "";

  for (const product of products) {

    const name = product.name.toLowerCase();

    const singular = name.replace(/s$/, "");

    if (

      input.includes(name) ||

      input.includes(singular)

    ) {

      productName = product.name;

      break;

    }

  }

  // ---------------- Fallback ----------------

  if (!productName) {

    let cleaned = input
      .replace(
        /\b(add|buy|get|need|want|please|can|you|me|find|search|remove|delete|of|some|a|an|to)\b/g,
        ""
      )
      .replace(/\d+/g, "")
      .trim();

    productName =
      cleaned.charAt(0).toUpperCase() +
      cleaned.slice(1);

  }

  return {

    action,

    quantity,

    item: productName,

  };

}