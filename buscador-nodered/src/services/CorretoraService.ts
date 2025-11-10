import type { ApiResponse, Corretora } from "../types/Corretora";

const API_BASE_URL = 'http://localhost:1880';

/**  
 * Busca todas as corretoras cadastradas no sistema.  
 *   
 * Realiza uma requisição GET para a API e retorna a lista completa  
 * de corretoras disponíveis.  
 *   
 * @returns {Promise<ApiResponse>} Promise que resolve com a resposta da API contendo as corretoras  
 *   
 * @throws {Error} Lança erro quando a requisição falha, incluindo o status HTTP e mensagem de erro  
 *   
 * @async  
 */
export async function buscarTodasCorretoras(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/corretoras`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data: ApiResponse = await response.json();
    return data;
}

/**  
 * Busca uma corretora específica pelo seu CNPJ.  
 *   
 * Realiza uma requisição GET para a API e retorna os dados da corretora  
 * correspondente ao CNPJ informado.  
 *   
 * @param {string} cnpj - O CNPJ da corretora a ser consultada (formato: 00.000.000/0000-00 ou 00000000000000)  
 *   
 * @returns {Promise<Corretora>} Promise que resolve com os dados da corretora encontrada  
 *   
 * @throws {Error} Lança erro quando a corretora não é encontrada ou a requisição falha  
 *   
 * @async  
 */
export async function buscarCorretoraPorCNPJ(cnpj: string): Promise<Corretora> {
  const response = await fetch(`${API_BASE_URL}/corretora/${cnpj}`);
  
  if (!response.ok) {
    throw new Error(`Corretora não encontrada`);
  }
  
  return await response.json();
}