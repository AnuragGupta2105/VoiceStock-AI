import recommendations from "../data/recommendations";

export default function getRecommendation(product) {

  if (!product) return "";

  const suggestion =
    recommendations[product];

  if (!suggestion) return "";

  return `People also buy ${suggestion.join(", ")}.`;

}