'use client';

import { useState } from 'react';

export function useGoogleCalendar() {
  const [connecting, setConnecting] = useState(false);
  const [disconnecting, setDisconnecting] = useState(false);

  async function connect() {
    setConnecting(true);
    try {
      const res = await fetch('/api/auth/google-calendar');
      const { url } = await res.json();
      window.location.href = url;
    } finally {
      setConnecting(false);
    }
  }

  async function disconnect() {
    setDisconnecting(true);
    try {
      await fetch('/api/auth/google-calendar', { method: 'DELETE' });
      window.location.reload();
    } finally {
      setDisconnecting(false);
    }
  }

  return { connect, disconnect, connecting, disconnecting };
}
