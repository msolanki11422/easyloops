'use client';

import React, { Suspense } from 'react';
import { App } from '@/components';

export default function Home() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <App />
    </Suspense>
  );
}
