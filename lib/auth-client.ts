// Mock auth client - placeholder for future implementation
// In production, integrate with NextAuth or Better-Auth

export const authClient = {
  signIn: {
    email: async (data: { email: string; password: string; callbackURL?: string }) => {
      // Mock login
      return {
        data: {
          user: {
            email: data.email,
            name: 'Mock User',
            membershipTier: 'free' as const
          }
        },
        error: null
      };
    },
    social: async ({ provider }: { provider: string }) => {
      console.log(`Mock social login with ${provider}`);
      return { error: null };
    }
  },
  signUp: {
    email: async (data: { email: string; password: string; name?: string; callbackURL?: string }) => {
      return {
        data: {
          user: {
            email: data.email,
            name: data.name || 'Mock User',
            membershipTier: 'free' as const
          }
        },
        error: null
      };
    }
  },
  signOut: async () => {
    console.log('Mock sign out');
    return { error: null };
  },
  useSession: () => {
    // Mock session - in real app would use context
    return {
      data: null as any,
      isPending: false
    };
  },
  getSession: async () => {
    return null;
  }
};

export const { signIn, signUp, signOut, useSession, getSession } = authClient;
