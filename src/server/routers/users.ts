import { z } from 'zod';

import { t } from '../trpc';

const usersRouter = t.router({
  user: t.procedure.input(z.object({ username: z.string() })).query(async ({ input, ctx }) => {
    const user = await ctx.prisma.user.findFirst({
      where: {
        name: input.username,
      },
    });

    return user;
  }),
});

export default usersRouter;
