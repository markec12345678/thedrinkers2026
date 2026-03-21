import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL!);

/**
 * Check and upgrade user membership tier based on total spent
 */
export async function checkAndUpgradeMembership(userId: string, amount: number) {
  try {
    // Get current user data
    const user = await sql`
      SELECT id, email, "membershipTier", "totalSpent"
      FROM "user"
      WHERE id = ${userId}
    `;

    if (!user || user.length === 0) {
      console.error('User not found:', userId);
      return;
    }

    const currentUser = user[0] as any;
    const newTotalSpent = (currentUser.totalSpent || 0) + amount;
    let newTier = currentUser.membershipTier || 'free';
    let upgraded = false;

    // Determine new tier
    if (newTotalSpent >= 200 && currentUser.membershipTier !== 'og') {
      newTier = 'og';
      upgraded = true;
      console.log(`Upgrading user ${userId} to OG tier`);
    } else if (newTotalSpent >= 50 && currentUser.membershipTier === 'free') {
      newTier = 'vip';
      upgraded = true;
      console.log(`Upgrading user ${userId} to VIP tier`);
    }

    // Update user if tier changed
    if (upgraded) {
      await sql`
        UPDATE "user"
        SET "membershipTier" = ${newTier},
            "totalSpent" = ${newTotalSpent},
            "updatedAt" = NOW()
        WHERE id = ${userId}
      `;

      // Send upgrade notification email
      await sendUpgradeEmail(currentUser.email, newTier);
      
      console.log(`User ${userId} upgraded to ${newTier}`);
    } else {
      // Just update total spent
      await sql`
        UPDATE "user"
        SET "totalSpent" = ${newTotalSpent},
            "updatedAt" = NOW()
        WHERE id = ${userId}
      `;
    }

    return { upgraded, newTier, totalSpent: newTotalSpent };
  } catch (error) {
    console.error('Error checking membership upgrade:', error);
    throw error;
  }
}

/**
 * Send upgrade notification email
 */
async function sendUpgradeEmail(email: string, tier: string) {
  const subject = `🎉 Čestitke! Nadgrajen si na ${tier.toUpperCase()} članstvo`;
  
  const benefits = {
    vip: [
      '10% popust na ves merchandise',
      'Zgodnji dostop do vstopnic (24h)',
      'Dostop do backstage videov',
      'Neobjavljene skladbe',
    ],
    og: [
      '20% popust na ves merchandise',
      'Zgodnji dostop do vstopnic (48h)',
      'Vedno brezplačna dostava',
      'Dostop do Meet & Greet',
      'Vse ekskluzivne vsebine',
    ],
  };

  // TODO: Integrate with email service (Resend, SendGrid, etc.)
  // For now, just log
  console.log(`Sending upgrade email to ${email}:`, {
    subject,
    tier,
    benefits: benefits[tier as keyof typeof benefits],
  });
}

/**
 * Get membership tier benefits
 */
export function getMembershipBenefits(tier: string) {
  const benefits = {
    free: {
      discount: 0,
      earlyAccessHours: 0,
      freeShipping: false,
      backstageVideos: false,
      unreleasedTracks: false,
      meetAndGreet: false,
    },
    vip: {
      discount: 10,
      earlyAccessHours: 24,
      freeShipping: false,
      backstageVideos: true,
      unreleasedTracks: true,
      meetAndGreet: false,
    },
    og: {
      discount: 20,
      earlyAccessHours: 48,
      freeShipping: true,
      backstageVideos: true,
      unreleasedTracks: true,
      meetAndGreet: true,
    },
  };

  return benefits[tier as keyof typeof benefits] || benefits.free;
}
