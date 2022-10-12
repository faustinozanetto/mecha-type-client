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
  find: t.procedure
  .input(
    z.object({
      id:z.string()
    })
    ).query(async ({ input, ctx }) => {
      return await ctx.prisma.typingTestEntry.findFirst({
      where: {
        id: input.id
      }
    });
  }),
  findByUser: t.procedure.input(z.object({userId:z.string()})).query(async ({input,ctx}) => {
    const testEntries = await ctx.prisma.typingTestEntry.findMany({
      where: {
        userId:input.userId
      }
    })

    return testEntries;
  })
});

export default typingTestEntries;
