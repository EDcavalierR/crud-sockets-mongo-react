import app from './app';
import http from 'http';
import sockets from './sockets';
import { PORT } from './config';
import { connectDB } from './db';
import { Server as socketServer } from 'socket.io';

connectDB();

const server = http.createServer(app);
const io = new socketServer(server, {
    cors: {
        origin: 'http://localhost:3000'
    }
})
sockets(io);

server.listen(PORT, () => { console.log(`Server is running on port ${PORT}`) })
