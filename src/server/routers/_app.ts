/**
 * This file contains the root router of your tRPC-backend
 */
import { t } from '../trpc';
import { z } from 'zod';

export const appRouter = t.router({
  hello: t.procedure
    // using zod schema to validate and infer input values
    .input(
      z
        .object({
          text: z.string().nullish(),
        })
        .nullish()
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`,
      };
    }),
});

export type AppRouter = typeof appRouter;
