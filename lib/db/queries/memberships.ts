import { db } from "@/lib/db";
import { vipTier, vipMembership } from "@/lib/db/schema";
import { eq, desc, asc, and } from "drizzle-orm";

export async function getAllVipTiers() {
  const tiers = await db
    .select()
    .from(vipTier)
    .where(eq(vipTier.active, true))
    .orderBy(asc(vipTier.priority));

  return tiers;
}

export async function getVipTierByName(name: string) {
  const [tier] = await db
    .select()
    .from(vipTier)
    .where(and(eq(vipTier.name, name), eq(vipTier.active, true)))
    .limit(1);

  return tier;
}

export async function getUserMembership(userId: string) {
  const [membership] = await db
    .select()
    .from(vipMembership)
    .where(
      and(
        eq(vipMembership.userId, userId),
        eq(vipMembership.status, "active"),
        // Check if not expired
        // Note: Add date comparison in production
      ),
    )
    .orderBy(desc(vipMembership.startDate))
    .limit(1);

  return membership;
}

export async function getUserMembershipHistory(userId: string) {
  const memberships = await db
    .select()
    .from(vipMembership)
    .where(eq(vipMembership.userId, userId))
    .orderBy(desc(vipMembership.startDate));

  return memberships;
}

export async function getMembershipByDiscountCode(discountCode: string) {
  const normalizedCode = discountCode.trim().toUpperCase();

  const [membership] = await db
    .select()
    .from(vipMembership)
    .where(
      and(
        eq(vipMembership.discountCode, normalizedCode),
        eq(vipMembership.status, "active"),
      ),
    )
    .orderBy(desc(vipMembership.startDate))
    .limit(1);

  return membership;
}

export async function createVipMembership(data: {
  userId: string;
  tier: string;
  billingCycle: "monthly" | "yearly";
  price: string;
  startDate: Date;
  expiresAt: Date;
}) {
  const [membership] = await db
    .insert(vipMembership)
    .values({
      ...data,
      status: "active",
      expiresAt: data.expiresAt.toISOString(),
      startDate: data.startDate.toISOString(),
    } as any)
    .returning();

  return membership;
}

export async function updateMembershipStatus(
  id: string,
  status: "active" | "expired" | "cancelled" | "paused",
) {
  const [updated] = await db
    .update(vipMembership)
    .set({
      status,
      updatedAt: new Date(),
    })
    .where(eq(vipMembership.id, id))
    .returning();

  return updated;
}

export async function cancelMembership(id: string) {
  return updateMembershipStatus(id, "cancelled");
}

export async function getMembershipStats() {
  const [totalMembers] = await db
    .select({ count: vipMembership.id })
    .from(vipMembership)
    .where(eq(vipMembership.status, "active"));

  const bronzeCount = await db
    .select({ count: vipMembership.id })
    .from(vipMembership)
    .where(
      and(eq(vipMembership.tier, "bronze"), eq(vipMembership.status, "active")),
    );

  const silverCount = await db
    .select({ count: vipMembership.id })
    .from(vipMembership)
    .where(
      and(eq(vipMembership.tier, "silver"), eq(vipMembership.status, "active")),
    );

  const goldCount = await db
    .select({ count: vipMembership.id })
    .from(vipMembership)
    .where(
      and(eq(vipMembership.tier, "gold"), eq(vipMembership.status, "active")),
    );

  return {
    total: totalMembers?.count || 0,
    bronze: bronzeCount[0]?.count || 0,
    silver: silverCount[0]?.count || 0,
    gold: goldCount[0]?.count || 0,
  };
}
