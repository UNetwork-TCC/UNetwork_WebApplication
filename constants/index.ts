/**
 * Extrai o tipo de ação do Redux Toolkit
 * @param type - O tipo completo da ação (ex: "user/fetchUser/fulfilled")
 * @returns O status da ação (fulfilled, rejected, pending)
 */
export const GET_TYPE = (type: string): string => {
  const parts = type.split('/');
  return parts[parts.length - 1];
};
