/**
 * Discord API Integration
 * OAuth2, role management, and server integration
 */

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar?: string;
  roles: string[];
  nick?: string;
}

export interface DiscordGuildMember {
  user?: DiscordUser;
  roles: string[];
  nick?: string;
  joined_at: string;
  premium_since?: string;
}

export interface DiscordRole {
  id: string;
  name: string;
  color: number;
  position: number;
  permissions: string;
}

/**
 * Discord OAuth2 Configuration
 */
export const DISCORD_CONFIG = {
  clientId: process.env.DISCORD_CLIENT_ID || '',
  clientSecret: process.env.DISCORD_CLIENT_SECRET || '',
  redirectUri: process.env.DISCORD_REDIRECT_URI || 'http://localhost:3000/api/discord/callback',
  botToken: process.env.DISCORD_BOT_TOKEN || '',
  guildId: process.env.DISCORD_GUILD_ID || '',
  scopes: ['identify', 'email', 'guilds', 'guilds.join'],
};

/**
 * Discord Role IDs (map to VIP tiers)
 */
export const DISCORD_ROLES = {
  free: process.env.DISCORD_ROLE_FREE || 'casual-fan',
  fan: process.env.DISCORD_ROLE_FAN || 'pravi-fan',
  vip: process.env.DISCORD_ROLE_VIP || 'vip-member',
  og: process.env.DISCORD_ROLE_OG || 'og-member',
};

/**
 * Get OAuth2 Authorization URL
 */
export function getDiscordAuthUrl(state: string): string {
  const params = new URLSearchParams({
    client_id: DISCORD_CONFIG.clientId,
    redirect_uri: DISCORD_CONFIG.redirectUri,
    response_type: 'code',
    scope: DISCORD_CONFIG.scopes.join(' '),
    state: state,
    prompt: 'consent',
  });

  return `https://discord.com/api/oauth2/authorize?${params.toString()}`;
}

/**
 * Exchange code for access token
 */
export async function exchangeCodeForToken(code: string): Promise<{
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}> {
  const response = await fetch('https://discord.com/api/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: DISCORD_CONFIG.clientId,
      client_secret: DISCORD_CONFIG.clientSecret,
      grant_type: 'authorization_code',
      code,
      redirect_uri: DISCORD_CONFIG.redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
}

/**
 * Get current user profile
 */
export async function getDiscordUser(accessToken: string): Promise<DiscordUser> {
  const response = await fetch('https://discord.com/api/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to get user profile');
  }

  return response.json();
}

/**
 * Get user's guild member info
 */
export async function getGuildMember(
  accessToken: string,
  guildId: string
): Promise<DiscordGuildMember | null> {
  try {
    const response = await fetch(`https://discord.com/api/guilds/${guildId}/members/@me`, {
      headers: {
        Authorization: `Bot ${DISCORD_CONFIG.botToken}`,
      },
    });

    if (!response.ok) {
      return null;
    }

    return response.json();
  } catch (error) {
    console.error('Failed to get guild member:', error);
    return null;
  }
}

/**
 * Add user to guild (server)
 */
export async function addUserToGuild(
  userId: string,
  accessToken: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${DISCORD_CONFIG.guildId}/members/${userId}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${DISCORD_CONFIG.botToken}`,
        },
        body: JSON.stringify({
          access_token: accessToken,
        }),
      }
    );

    return response.ok || response.status === 204;
  } catch (error) {
    console.error('Failed to add user to guild:', error);
    return false;
  }
}

/**
 * Assign role to user
 */
export async function assignRole(
  userId: string,
  roleId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${DISCORD_CONFIG.guildId}/members/${userId}/roles/${roleId}`,
      {
        method: 'PUT',
        headers: {
          Authorization: `Bot ${DISCORD_CONFIG.botToken}`,
        },
      }
    );

    return response.ok || response.status === 204;
  } catch (error) {
    console.error('Failed to assign role:', error);
    return false;
  }
}

/**
 * Remove role from user
 */
export async function removeRole(
  userId: string,
  roleId: string
): Promise<boolean> {
  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${DISCORD_CONFIG.guildId}/members/${userId}/roles/${roleId}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bot ${DISCORD_CONFIG.botToken}`,
        },
      }
    );

    return response.ok || response.status === 204;
  } catch (error) {
    console.error('Failed to remove role:', error);
    return false;
  }
}

/**
 * Sync user tier with Discord role
 */
export async function syncUserTier(
  userId: string,
  tier: 'free' | 'fan' | 'vip' | 'og'
): Promise<boolean> {
  try {
    // Remove all existing roles
    const currentRoles = Object.values(DISCORD_ROLES);
    for (const roleId of currentRoles) {
      await removeRole(userId, roleId);
    }

    // Assign new role based on tier
    const newRoleId = DISCORD_ROLES[tier];
    if (newRoleId) {
      return await assignRole(userId, newRoleId);
    }

    return false;
  } catch (error) {
    console.error('Failed to sync user tier:', error);
    return false;
  }
}

/**
 * Get all guild roles
 */
export async function getGuildRoles(): Promise<DiscordRole[]> {
  try {
    const response = await fetch(
      `https://discord.com/api/guilds/${DISCORD_CONFIG.guildId}/roles`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_CONFIG.botToken}`,
        },
      }
    );

    if (!response.ok) {
      return [];
    }

    return response.json();
  } catch (error) {
    console.error('Failed to get guild roles:', error);
    return [];
  }
}

/**
 * Send DM to user
 */
export async function sendDM(
  userId: string,
  message: string
): Promise<boolean> {
  try {
    // Create DM channel
    const channelResponse = await fetch('https://discord.com/api/users/@me/channels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bot ${DISCORD_CONFIG.botToken}`,
      },
      body: JSON.stringify({
        recipient_id: userId,
      }),
    });

    if (!channelResponse.ok) {
      return false;
    }

    const channel = await channelResponse.json();

    // Send message
    const messageResponse = await fetch(
      `https://discord.com/api/channels/${channel.id}/messages`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bot ${DISCORD_CONFIG.botToken}`,
        },
        body: JSON.stringify({
          content: message,
        }),
      }
    );

    return messageResponse.ok;
  } catch (error) {
    console.error('Failed to send DM:', error);
    return false;
  }
}

/**
 * Check if user has specific role
 */
export function hasRole(member: DiscordGuildMember | null, roleId: string): boolean {
  if (!member) return false;
  return member.roles.includes(roleId);
}

/**
 * Get user's highest tier
 */
export function getUserTier(member: DiscordGuildMember | null): 'free' | 'fan' | 'vip' | 'og' {
  if (!member) return 'free';

  const tierOrder = ['og', 'vip', 'fan', 'free'];
  
  for (const tier of tierOrder) {
    const roleId = DISCORD_ROLES[tier as keyof typeof DISCORD_ROLES];
    if (roleId && member.roles.includes(roleId)) {
      return tier as 'free' | 'fan' | 'vip' | 'og';
    }
  }

  return 'free';
}
