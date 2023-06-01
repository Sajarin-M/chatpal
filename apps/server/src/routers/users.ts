import { TRPCError } from '@trpc/server';
import { observable } from '@trpc/server/observable';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import ee from '../events';
import { publicProcedure, router } from '../trpc';

const privateKey = 'temp-key';

export const usersRouter = router({
  signup: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.create({
        data: input,
        select: {
          id: true,
          name: true,
          email: true,
        },
      });

      return { token: jwt.sign(user, privateKey) };
    }),
  login: publicProcedure
    .input(
      z.object({
        username: z.string(),
        password: z.string(),
      }),
    )
    .mutation(async ({ ctx, input: { username, password } }) => {
      const user = await ctx.prisma.user.findFirst({
        where: {
          email: username,
          password,
        },
        select: {
          id: true,
          name: true,
          email: true,
        },
      });
      if (!user) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Invalid username or password',
        });
      }

      ee.emit('loggedIn', user.name);

      return { token: jwt.sign(user, privateKey) };
    }),
  onLogin: publicProcedure.subscription(() =>
    observable<string>((emit) => {
      function onLogin(str: string) {
        emit.next(str);
      }

      ee.on('loggedIn', onLogin);
      // unsubscribe function when client disconnects or stops subscribing
      return () => {
        ee.off('loggedIn', onLogin);
      };
    }),
  ),
});
