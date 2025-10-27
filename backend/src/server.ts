import 'reflect-metadata';
import { createServer } from 'http';
import app from './app';
import { initSocketServer } from './websocket/socket.server';
import { dataSource } from './config/typeorm';

const port = process.env.PORT ? Number(process.env.PORT) : 4000;

async function bootstrap() {
  await dataSource.initialize();
  const httpServer = createServer(app);
  initSocketServer(httpServer);
  httpServer.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Brethren API running on port ${port}`);
  });
}

void bootstrap();
