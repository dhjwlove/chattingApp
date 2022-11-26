import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io();

export default function ChatTest() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [lastPong, setLastPong] = useState(null);

  useEffect(() => {
    socket.on('connection', () => {
      console.log('connected');
      setIsConnected(true);
    });

    socket.on('disconnect', () => {
      console.log('disconnected');
      setIsConnected(false);
    });

    socket.on('pong', () => {
      console.log('pong');
      setLastPong(new Date().toISOString());
    });

    return () => {
      socket.off('connect');
      socket.off('disconnect');
      socket.off('pong');
    };
  }, []);

  const sendPing = () => {
    socket.emit('ping');
  };

  return (
    <div>
      <p>
        Connected:
        {' '}
        { `${isConnected}` }
      </p>
      <p>
        Last pong:
        {' '}
        { lastPong || '-' }
      </p>
      <button type="button" onClick={sendPing}>Send ping</button>
    </div>
  );
}
