import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';

import '@/lib/i18n';
import { loadSavedLanguage } from '@/lib/i18n';

export default function RootLayout() {
  const [i18nReady, setI18nReady] = useState(false);

  useEffect(() => {
    loadSavedLanguage().finally(() => setI18nReady(true));
  }, []);

  if (!i18nReady) return null;

  return <Stack />;
}
