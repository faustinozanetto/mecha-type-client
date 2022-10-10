import { z } from 'zod';
import { t } from '../trpc';

const typingTestEntries = t.router({
  create: t.procedure
    .input(
      z.object({
        userId: z.string(),
        wpm: z.number(),
        cpm: z.number(),
        keystrokes: z.number(),
        correctChars: z.number(),
        incorrectChars: z.number(),
        accuracy: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const typingTestEntry = await ctx.prisma.typingTestEntry.create({
        data: {
          userId: input.userId,
          wpm: input.wpm,
          cpm: input.cpm,
          keystrokes: input.keystrokes,
          correctChars: input.correctChars,
          incorrectChars: input.incorrectChars,
          accuracy: input.accuracy,
        },
      });

      return typingTestEntry;
    }),
});

export default typingTestEntries;
