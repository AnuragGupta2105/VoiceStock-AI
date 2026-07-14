import products from "../data/products";
import productAliases from "./productAliases";

export function findProduct(sentence) {

  if (!sentence) return null;

  let input = sentence
    .toLowerCase()
    .trim()
    .replace(/[.,!?]/g, "");

  // ==========================
  // 1. Exact Alias Match
  // ==========================

  for (const alias in productAliases) {

    if (input.includes(alias)) {

      const actualName = productAliases[alias];

      const product = products.find(
        p => p.name.toLowerCase() === actualName.toLowerCase()
      );

      if (product) return product;

    }

  }

  // ==========================
  // 2. Exact Product Name
  // ==========================

  for (const product of products) {

    if (
      input === product.name.toLowerCase()
    ) {

      return product;

    }

  }

  // ==========================
  // 3. Product Name Inside Sentence
  // ==========================

  for (const product of products) {

    if (
      input.includes(product.name.toLowerCase())
    ) {

      return product;

    }

  }

  // ==========================
  // 4. Brand + Product Match
  // ==========================

  for (const product of products) {

    const brand =
      product.brand?.toLowerCase() || "";

    const name =
      product.name.toLowerCase();

    if (

      input.includes(brand) &&

      input.includes(name)

    ) {

      return product;

    }

  }

  // ==========================
  // 5. Partial Word Match
  // ==========================

  const words = input.split(" ");

  for (const word of words) {

    const product = products.find(

      p =>
        p.name
          .toLowerCase()
          .includes(word)

    );

    if (product) return product;

  }

  // ==========================
  // 6. Category Match
  // ==========================

  for (const product of products) {

    if (

      input.includes(

        product.category.toLowerCase()

      )

    ) {

      return product;

    }

  }

  return null;

}