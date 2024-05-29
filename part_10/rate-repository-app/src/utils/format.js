import { format } from "date-fns";

export const formatStatValue = (value) => {
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}k`;
  }
  return value;
};

export const formatDateValue = (value) =>
  format(new Date(value), "dd.MM.yyyy");
