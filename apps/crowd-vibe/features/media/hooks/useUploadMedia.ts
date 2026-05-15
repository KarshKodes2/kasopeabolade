'use client';

import { uploadMediaAsset, fetchMediaAssets } from '../api';
import { useMediaUploadStore } from '../store/media-upload.store';

export function useUploadMedia() {
  const { setUploading, setAssets } = useMediaUploadStore();

  async function upload(file: File) {
    setUploading(true);
    try {
      await uploadMediaAsset(file);
      const fresh = await fetchMediaAssets();
      setAssets(fresh);
    } finally {
      setUploading(false);
    }
  }

  return { upload };
}
