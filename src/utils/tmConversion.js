import { formatRelative, subDays, format } from "date-fns";
import { es } from "date-fns/locale";

export const tmConversion = (utc) => {
  const date = new Date(utc);
  return formatRelative(subDays(date, 3), new Date(), { locale: es });
};

export const getFormalDay = (date) => {
  return format(date, "d MMMM yyyy", { locale: es });
};
