import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function isSoldOut(item: {
  status?: string;
  quantityRemaining?: number;
  isSoldOut?: boolean;
}): boolean {
  return (
    item.isSoldOut === true ||
    item.status === "sold_out" ||
    (item.quantityRemaining !== undefined && item.quantityRemaining <= 0)
  );
}

export function hasTicketUrl(item: {
  ticketUrl?: string;
  ticketUrlLocal?: string;
}): boolean {
  return !!(item.ticketUrl || item.ticketUrlLocal);
}

export function formatPrice(price: number | string): string {
  const numPrice = typeof price === "string" ? parseFloat(price) : price;
  return `€${numPrice.toFixed(2)}`;
}

export function formatDateTime(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
