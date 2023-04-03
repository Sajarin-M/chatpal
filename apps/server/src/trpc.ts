import { User } from '@prisma/client';
import { initTRPC, TRPCError } from '@trpc/server';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { prisma } from './prisma';

export function createContext({ req, res }: { req: Request; res: Response }) {
  const token = req.headers.authorization;
  return { req, res, token, prisma, verify: jwt.verify };
}

export type Context = ReturnType<typeof createContext>;

const privateKey = 'temp-key';

export const t = initTRPC.context<Context>().create();

const isAuthed = t.middleware(({ next, ctx }) => {
  if (!ctx.token) {
    throw new TRPCError({ code: 'FORBIDDEN', message: 'Access denied' });
  }

  try {
    const decoded = ctx.verify(ctx.token, privateKey) as Pick<User, 'id' | 'email' | 'name'>;
    console.log(decoded);
    return next({
      ctx: {
        ...ctx,
        user: decoded,
      },
    });
  } catch (error) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid access token' });
  }
});

export const router = t.router;
export const middleware = t.middleware;
export const publicProcedure = t.procedure;
export const protectedProcedure = t.procedure.use(isAuthed);
