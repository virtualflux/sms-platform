'use client';

import { io, Socket } from 'socket.io-client';

// ENV
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || '';

// Types
interface RegisterPayload {
  id: string;
  role: string;
  status?: string;
}

interface StatusUpdatePayload {
  id: string;
  status: 'online' | 'offline' | 'idle';
}

// Globals
let userId: string | null = null;
let socket: Socket | null = null;
let idleTimer: NodeJS.Timeout | null = null;
let isIdle = false;

export const initializeSocket = (id: string): Socket | null => {
  if (!id) {
    return null;
  }

  userId = id;

  if (!socket) {
    socket = io(SOCKET_URL, {
      query: { userId },
      transports: ['websocket'],
    });


    /** CONNECTED */
    socket.on('connect', () => {

      const payload: RegisterPayload = {
        id: userId!,
        role: 'user',
        status: 'online',
      };

      socket?.emit('register', payload);
      startIdleTracker();
    });

    /** DISCONNECTED */
    socket.on('disconnect', () => {
      clearIdleTracker();
    });

    /** RECONNECTED */
    socket.on('reconnect', () => {

      const payload: RegisterPayload = {
        id: userId!,
        role: 'user',
      };

      socket?.emit('register', payload);
    });

    /** BEFORE PAGE CLOSE */
    window.addEventListener('beforeunload', handleOffline);
  }

  return socket;
};

/** Emit online/offline/idle status */
const emitOnlineStatus = (status: StatusUpdatePayload['status']) => {
  if (socket && userId) {
    const payload: StatusUpdatePayload = {
      id: userId,
      status,
    };
    socket.emit('status:update', payload);
  }
};

/** When user closes tab */
const handleOffline = () => {
  emitOnlineStatus('offline');
};

/** Idle tracking (3 minutes) */
const startIdleTracker = () => {
  const idleLimit = 3 * 60 * 1000;

  const resetTimer = () => {
    if (idleTimer) clearTimeout(idleTimer);

    if (isIdle) {
      isIdle = false;
      emitOnlineStatus('online');
    }

    idleTimer = setTimeout(() => {
      if (socket && userId) {
        emitOnlineStatus('idle');
        isIdle = true;
      }
    }, idleLimit);
  };

  // Listen for activity
  const events = ['mousemove', 'keydown', 'click', 'scroll'] as const;
  events.forEach((event) => window.addEventListener(event, resetTimer));

  resetTimer();
};

/** Cleanup */
const clearIdleTracker = () => {
  if (idleTimer) clearTimeout(idleTimer);

  if (typeof window !== 'undefined') {
    const events = ['mousemove', 'keydown', 'click', 'scroll'] as const;
    events.forEach((event) =>
      window.removeEventListener(event, () => {})
    );
  }
};

/** Get current socket instance */
export const getSocket = (): Socket | null => {
  if (!socket) {
    return null;
  }
  return socket;
};

/** Disconnect socket safely */
export const disconnectSocket = () => {
  if (socket) {
    handleOffline();
    clearIdleTracker();
    socket.disconnect();

    socket = null;
    userId = null;
  }
};
