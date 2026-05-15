'use client';

import { useState } from 'react';
import { updateTenantSettings } from '../api';
import type { TenantSettings } from '../types';

export function useTenantSettings() {
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(settings: TenantSettings) {
    setSaving(true);
    setSaved(false);
    setError(null);
    try {
      await updateTenantSettings(settings);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Save failed');
    } finally {
      setSaving(false);
    }
  }

  return { save, saving, saved, error };
}
