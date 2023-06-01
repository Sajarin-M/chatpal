import * as trpcExpress from '@trpc/server/adapters/express';
import { applyWSSHandler } from '@trpc/server/adapters/ws';
import cors from 'cors';
import express from 'express';
import ws from 'ws';
import { usersRouter } from './routers/users';
import { createContext, router } from './trpc';

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

const wss = new ws.Server({
  port: 3002,
});

applyWSSHandler({ wss, router: appRouter, createContext: createContext as any });
wss.on('connection', (ws) => {
  console.log(`➕➕ Connection (${wss.clients.size})`);
  ws.once('close', () => {
    console.log(`➖➖ Connection (${wss.clients.size})`);
  });
});

console.log('✅ WebSocket Server listening on ws://localhost:3002');

// process.on('SIGTERM', () => {
//   console.log('SIGTERM');
//   handler.broadcastReconnectNotification();
//   wss.close();
// });
