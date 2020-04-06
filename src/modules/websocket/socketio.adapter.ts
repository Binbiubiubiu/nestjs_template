import { IoAdapter } from '@nestjs/platform-socket.io';
// import redisIoAdapter from 'socket.io-redis';

// const redisAdapter = redisIoAdapter({ host: 'localhost', port: 6379 });

export class SocketIoAdapter extends IoAdapter {
  createIOServer(port: number, options?: any): any {
    const server = super.createIOServer(port, options);
    // server.adapter(redisAdapter);
    return server;
  }
}
