import products from "../data/products";
import productAliases from "./productAliases";

export function findProduct(sentence) {

  if (!sentence) return null;

  let input = sentence
    .toLowerCase()
    .trim();

  // remove punctuation
  input = input.replace(/[.,!?]/g, "");

  // look for aliases anywhere in sentence
  for (const alias in productAliases) {

    if (input.includes(alias)) {

      const actualName = productAliases[alias];

      return products.find(
        product => product.name === actualName
      );

    }

  }

  return null;

}