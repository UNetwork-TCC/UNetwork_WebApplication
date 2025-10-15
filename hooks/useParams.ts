'use client';

import { useParams as useNextParams } from 'next/navigation';

/**
 * Hook de compatibilidade para migração de react-router-dom para Next.js
 * Simula o comportamento do useParams do react-router-dom
 */
export function useParams() {
  return useNextParams();
}
