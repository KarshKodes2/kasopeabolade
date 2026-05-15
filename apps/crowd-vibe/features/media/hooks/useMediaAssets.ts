'use client';

import { useEffect } from 'react';
import { fetchMediaAssets } from '../api';
import { useMediaUploadStore } from '../store/media-upload.store';

export function useMediaAssets() {
  const { assets, setAssets } = useMediaUploadStore();

  useEffect(() => {
    fetchMediaAssets().then(setAssets).catch(console.error);
  }, [setAssets]);

  return { assets };
}
