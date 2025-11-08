import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server as SocketIOServer } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { config } from './config';
import { Database } from './db';
import { tenantMiddleware } from './middleware/auth';
import matchmakingRoutes from './routes/matchmaking';
import usersRoutes from './routes/users';

dotenv.config();

const app = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: config.corsOrigin,
    methods: ['GET', 'POST'],
  },
});

// Middleware
app.use(helmet());
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(tenantMiddleware);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// API Routes
app.use('/api/matchmaking', matchmakingRoutes);
app.use('/api/users', usersRoutes);

// WebSocket for real-time messaging
io.on('connection', (socket) => {
  console.log('User connected:', socket.id);

  socket.on('join-match', (matchId: string) => {
    socket.join(matchId);
    console.log(`User ${socket.id} joined match ${matchId}`);
  });

  socket.on('send-message', (data: { matchId: string; message: any }) => {
    io.to(data.matchId).emit('new-message', data.message);
  });

  socket.on('typing', (data: { matchId: string; userId: string }) => {
    socket.to(data.matchId).emit('user-typing', { userId: data.userId });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Error:', err);
  res.status(err.status || 500).json({
    error: err.message || 'Internal server error',
  });
});

// Initialize database and start server
async function start() {
  try {
    const db = Database.getInstance();
    await db.initialize();
    console.log('Database initialized');

    httpServer.listen(config.port, () => {
      console.log(`Server running on port ${config.port}`);
      console.log(`Environment: ${config.nodeEnv}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();

// Graceful shutdown
process.on('SIGTERM', async () => {
  console.log('SIGTERM received, shutting down gracefully...');
  const db = Database.getInstance();
  await db.close();
  httpServer.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});
