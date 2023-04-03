import express from 'express';
import cors from 'cors';
import * as trpcExpress from '@trpc/server/adapters/express';
import { router, createContext } from './trpc';
import { usersRouter } from './routers/users';

export const appRouter = router({
  users: usersRouter,
});

const app = express();

app.use(cors());

app.use(
  '/trpc',
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext,
  }),
);

export type AppRouter = typeof appRouter;
const port = 3001;
app.listen(port, () => console.log(`Server started in ${port}`));
