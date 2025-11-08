import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3001';

class SocketService {
  private socket: Socket | null = null;

  connect() {
    if (!this.socket) {
      this.socket = io(SOCKET_URL, {
        autoConnect: true,
      });

      this.socket.on('connect', () => {
        console.log('Socket connected');
      });

      this.socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }

  joinMatch(matchId: string) {
    if (this.socket) {
      this.socket.emit('join-match', matchId);
    }
  }

  sendMessage(matchId: string, message: any) {
    if (this.socket) {
      this.socket.emit('send-message', { matchId, message });
    }
  }

  onNewMessage(callback: (message: any) => void) {
    if (this.socket) {
      this.socket.on('new-message', callback);
    }
  }

  sendTyping(matchId: string, userId: string) {
    if (this.socket) {
      this.socket.emit('typing', { matchId, userId });
    }
  }

  onUserTyping(callback: (data: { userId: string }) => void) {
    if (this.socket) {
      this.socket.on('user-typing', callback);
    }
  }

  removeAllListeners() {
    if (this.socket) {
      this.socket.removeAllListeners();
    }
  }
}

export const socketService = new SocketService();
