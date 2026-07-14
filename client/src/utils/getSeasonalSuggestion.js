import seasonalSuggestions from "../data/seasonalSuggestions";

export default function getSeasonalSuggestion() {

  const month = new Date().toLocaleString(
    "default",
    {
      month: "long",
    }
  );

  const items =
    seasonalSuggestions[month];

  if (!items) return "";

  return `Seasonal Picks: ${items.join(", ")}.`;

}