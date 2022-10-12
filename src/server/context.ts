import { PrismaClient } from '@prisma/client';
import type * as trpc from '@trpc/server';
import type * as trpcNext from '@trpc/server/adapters/next';
import type { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import type { IncomingMessage } from 'http';
import { getSession } from 'next-auth/react';
import type ws from 'ws';

export const prisma: PrismaClient = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});
/**

/**
 * Creates context for an incoming request
 * @link https://trpc.io/docs/context
 */
export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
  const session = await getSession({ req });
  console.log('createContext for', session?.user?.name ?? 'unknown user');
  return {
    req,
    res,
    prisma,
    session,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
