// Interface para resposta padrão da API
export interface ApiResponse<T> {
  message: string
  data: T
  status: number
}

/**
 * Helper para extrair dados da resposta da API com segurança
 * Se a resposta tem o formato { message, data, status }, extrai o data
 * Caso contrário, retorna a resposta como está
 */
export function extractData<T>(response: unknown): T {
  if (response && typeof response === 'object' && 'data' in response) {
    return (response as ApiResponse<T>).data
  }
  // Se a resposta não tem o formato esperado, retorna como está
  return response as T
}
