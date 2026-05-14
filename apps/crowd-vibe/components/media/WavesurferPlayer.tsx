'use client';

import { useEffect, useRef, useState } from 'react';

interface WavesurferPlayerProps {
  url: string;
}

type WS = { destroy(): void; playPause(): void; on(event: string, cb: () => void): void };

export function WavesurferPlayer({ url }: WavesurferPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wsRef = useRef<WS | null>(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    let ws: WS | null = null;

    import('wavesurfer.js').then(({ default: WaveSurfer }) => {
      const instance = WaveSurfer.create({
        container: containerRef.current!,
        waveColor: 'rgba(124,58,237,0.4)',
        progressColor: 'rgba(124,58,237,1)',
        cursorColor: '#F59E0B',
        barWidth: 2,
        barGap: 1,
        barRadius: 2,
        height: 64,
        url,
      });

      instance.on('ready', () => setReady(true));
      instance.on('play', () => setPlaying(true));
      instance.on('pause', () => setPlaying(false));
      instance.on('finish', () => setPlaying(false));

      ws = instance as unknown as WS;
      wsRef.current = ws;
    });

    return () => { ws?.destroy(); };
  }, [url]);

  const toggle = () => wsRef.current?.playPause();

  return (
    <div className="flex items-center gap-4">
      <button
        onClick={toggle}
        disabled={!ready}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white transition-all hover:opacity-80 disabled:opacity-30"
        style={{ background: 'var(--cv-brand)' }}
        aria-label={playing ? 'Pause' : 'Play'}
      >
        {playing ? (
          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>
        ) : (
          <svg className="h-4 w-4 fill-white" viewBox="0 0 24 24"><polygon points="5,3 19,12 5,21"/></svg>
        )}
      </button>
      <div ref={containerRef} className="flex-1" />
    </div>
  );
}
