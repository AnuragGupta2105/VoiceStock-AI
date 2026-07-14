import substitutes from "../data/substitutes";

export default function getSubstitute(product) {

  if (!product) return "";

  const items = substitutes[product];

  if (!items) return "";

  return `Alternative products: ${items.join(", ")}.`;

}