import { BadgeColorScheme } from "../components/badge";

const mapColorToStatus = {
  red: ["overdue", "none", "out-of-stock"],
  orange: ["almost-due", "low-stock"],
  green: ["complete", "full", "in-stock"],
  blue: ["pending", "partial"],
  grey: ["cancelled"],
};

export const getColorSchemeByStatus = (status: string): BadgeColorScheme => {
  const found = Object.entries(mapColorToStatus).find(([_, val]) =>
    val.includes(status)
  );

  return found ? (found[0] as BadgeColorScheme) : "grey";
};
