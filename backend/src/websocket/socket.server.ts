import type { Server } from 'http';
import { Server as IOServer } from 'socket.io';

export function initSocketServer(httpServer: Server) {
  const io = new IOServer(httpServer, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    socket.on('join', (room: string) => {
      socket.join(room);
    });

    socket.on('message', (payload: { room: string; content: string; sender: string }) => {
      io.to(payload.room).emit('message', payload);
    });
  });

  return io;
}
