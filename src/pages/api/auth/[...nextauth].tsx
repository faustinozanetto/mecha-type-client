import NextAuth from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import DiscordProvider from 'next-auth/providers/discord';
import GoogleProvider from 'next-auth/providers/google';
import { prisma } from '@lib/prisma/prisma';
import { PrismaAdapter } from '@lib/prisma/prismaAdapter';

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'read:user',
        },
      },
    }),
    DiscordProvider({
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        url: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
      },
    }),
  ],

  theme: 'dark',

  // jwt: {
  //   // A secret to use for key generation - you should set this explicitly
  //   // Defaults to NextAuth.js secret if not explicitly specified.
  //   // This is used to generate the actual signingKey and produces a warning
  //   // message if not defined explicitly.
  //   secret: process.env.JWT_SECRET,
  //   // You can generate a signing key using `jose newkey -s 512 -t oct -a HS512`
  //   // This gives you direct knowledge of the key used to sign the token so you can use it
  //   // to authenticate indirectly (eg. to a database driver)
  //   // signingKey: process.env.JWT_SIGNING_PRIVATE_KEY,
  //   // If you chose something other than the default algorithm for the signingKey (HS512)
  //   // you also need to configure the algorithm
  //   verificationOptions: {
  //     algorithms: ['HS256'],
  //   },
  //   // Set to true to use encryption. Defaults to false (signing only).
  //   encryption: true,
  //   encryptionKey: process.env.JWT_ENCRYPT as string,
  // },

  cookies: {
    sessionToken: {
      name: `session-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: `callback-url`,
      options: {
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: `csrf-token`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
});
