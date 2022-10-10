/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from '../trpc';
import typingTestEntries from './typing-test-entry';
import usersRouter from './users';

export const appRouter = t.router({
  users: usersRouter,
  typingTestEntries: typingTestEntries,
});

export type AppRouter = typeof appRouter;
