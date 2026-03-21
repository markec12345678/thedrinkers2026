import { NextRequest, NextResponse } from 'next/server';
import { exchangeCodeForToken, getDiscordUser, addUserToGuild, syncUserTier } from '@/lib/discord-api';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * GET /api/discord/callback
 * Handle Discord OAuth2 callback
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Check for errors
    if (error) {
      return NextResponse.redirect(new URL('/vip-lounge?error=discord_denied', request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/vip-lounge?error=no_code', request.url));
    }

    // Exchange code for token
    const tokenData = await exchangeCodeForToken(code);

    // Get user info
    const user = await getDiscordUser(tokenData.access_token);

    // Add user to guild (if not already member)
    await addUserToGuild(user.id, tokenData.access_token);

    // TODO: Get user's tier from database and sync Discord role
    // For now, assign default 'fan' role
    // await syncUserTier(user.id, 'fan');

    // Redirect back to VIP lounge with success
    const redirectUrl = new URL('/vip-lounge?discord_connected=true', request.url);
    
    // Set cookie with user info (in production, use secure HTTP-only cookie)
    redirectUrl.searchParams.set('discord_user', JSON.stringify({
      id: user.id,
      username: user.username,
      discriminator: user.discriminator,
    }));

    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error('Discord callback error:', error);
    return NextResponse.redirect(new URL('/vip-lounge?error=discord_error', request.url));
  }
}

/**
 * POST /api/discord/sync
 * Sync user tier with Discord role
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, discordId, tier } = body;

    if (!userId || !discordId || !tier) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Sync tier with Discord
    const success = await syncUserTier(discordId, tier);

    if (!success) {
      return NextResponse.json(
        { error: 'Failed to sync Discord role' },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Discord sync error:', error);
    return NextResponse.json(
      { error: 'Failed to sync Discord role' },
      { status: 500 }
    );
  }
}
