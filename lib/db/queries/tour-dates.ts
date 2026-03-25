import { db } from "@/lib/db";
import { tourDate } from "@/lib/db/schema";
import { eq, desc, asc, and, gte, lte, sql } from "drizzle-orm";

export interface GetTourDatesParams {
  status?:
    | "announced"
    | "on_sale"
    | "sold_out"
    | "completed"
    | "cancelled"
    | "postponed";
  country?: string;
  featured?: boolean;
  active?: boolean;
  fromDate?: Date;
  toDate?: Date;
  limit?: number;
  offset?: number;
}

export async function getTourDates(params: GetTourDatesParams = {}) {
  const {
    status,
    country,
    featured,
    active = true,
    fromDate,
    toDate,
    limit = 10,
    offset = 0,
  } = params;

  const conditions = [];

  if (status) {
    conditions.push(eq(tourDate.status, status));
  }

  if (country) {
    conditions.push(eq(tourDate.country, country));
  }

  if (featured !== undefined) {
    conditions.push(eq(tourDate.featured, featured));
  }

  if (active !== undefined) {
    conditions.push(eq(tourDate.active, active));
  }

  if (fromDate) {
    conditions.push(gte(tourDate.date, fromDate.toISOString().split("T")[0]));
  }

  if (toDate) {
    conditions.push(lte(tourDate.date, toDate.toISOString().split("T")[0]));
  }

  const tourDatesData = await db
    .select()
    .from(tourDate)
    .where(conditions.length > 0 ? and(...conditions) : undefined)
    .orderBy(asc(tourDate.date))
    .limit(limit)
    .offset(offset);

  return tourDatesData;
}

export async function getTourDateById(id: string) {
  const [tourDateData] = await db
    .select()
    .from(tourDate)
    .where(eq(tourDate.id, id))
    .limit(1);

  return tourDateData;
}

export async function getUpcomingTourDates(limit = 10) {
  const today = new Date().toISOString().split("T")[0];

  const tourDatesData = await db
    .select()
    .from(tourDate)
    .where(
      and(
        gte(tourDate.date, today),
        eq(tourDate.active, true),
        eq(tourDate.status, "on_sale"),
      ),
    )
    .orderBy(asc(tourDate.date))
    .limit(limit);

  return tourDatesData;
}

export async function getFeaturedTourDates(limit = 5) {
  const today = new Date().toISOString().split("T")[0];

  const tourDatesData = await db
    .select()
    .from(tourDate)
    .where(
      and(
        gte(tourDate.date, today),
        eq(tourDate.featured, true),
        eq(tourDate.active, true),
      ),
    )
    .orderBy(asc(tourDate.date))
    .limit(limit);

  return tourDatesData;
}

export async function getTourDatesByCountry(country: string) {
  const today = new Date().toISOString().split("T")[0];

  const tourDatesData = await db
    .select()
    .from(tourDate)
    .where(
      and(
        eq(tourDate.country, country),
        gte(tourDate.date, today),
        eq(tourDate.active, true),
      ),
    )
    .orderBy(asc(tourDate.date));

  return tourDatesData;
}

export async function getTourDatesByTourName(tourName: string) {
  const tourDatesData = await db
    .select()
    .from(tourDate)
    .where(eq(tourDate.tourName, tourName))
    .orderBy(asc(tourDate.date));

  return tourDatesData;
}

export async function getSoldOutShows() {
  const tourDatesData = await db
    .select()
    .from(tourDate)
    .where(eq(tourDate.status, "sold_out"))
    .orderBy(desc(tourDate.date));

  return tourDatesData;
}

export async function getTourStats() {
  const [totalShows] = await db
    .select({ count: sql<number>`count(*)` })
    .from(tourDate)
    .where(eq(tourDate.active, true));

  const [upcomingShows] = await db
    .select({ count: sql<number>`count(*)` })
    .from(tourDate)
    .where(
      and(
        gte(tourDate.date, new Date().toISOString().split("T")[0]),
        eq(tourDate.active, true),
      ),
    );

  const [soldOutShows] = await db
    .select({ count: sql<number>`count(*)` })
    .from(tourDate)
    .where(eq(tourDate.status, "sold_out"));

  return {
    total: totalShows?.count || 0,
    upcoming: upcomingShows?.count || 0,
    soldOut: soldOutShows?.count || 0,
  };
}
