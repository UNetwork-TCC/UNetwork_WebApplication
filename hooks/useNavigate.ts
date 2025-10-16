'use client';

import { useRouter } from 'next/navigation';

/**
 * Hook de compatibilidade para migração de react-router-dom para Next.js
 * Simula o comportamento do useNavigate do react-router-dom
 */
export function useNavigate() {
  const router = useRouter();

  return (path: string) => {
    router.push(path);
  };
}
