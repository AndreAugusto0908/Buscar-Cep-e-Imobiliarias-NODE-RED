import type { CepData } from "../types/Cep";

const API_BASE_URL = 'http://localhost:1880';

/**  
 * Busca informações de endereço a partir de um CEP brasileiro.  
 *   
 * Realiza uma requisição HTTP para a API de consulta de CEP e retorna  
 * os dados do endereço correspondente.  
 *   
 * @param {string} cep - O CEP a ser consultado (formato: 00000-000 ou 00000000)  
 *   
 * @returns {Promise<CepData>} Promise que resolve com os dados do endereço encontrado  
 *   
 * @throws {Error} Lança erro quando o CEP não é encontrado ou a requisição falha
 * *   
 * @async  
 */
export async function buscarCep(cep: string): Promise<CepData> {
  const response = await fetch(`${API_BASE_URL}/cep/${cep}`);
  
  if (!response.ok) {
    throw new Error(`CEP não encontrado`);
  }
  
  return await response.json();
}

/**  
 * Salva os dados de um CEP na base de dados.  
 *   
 * Realiza uma requisição POST para a API enviando as informações  
 * do endereço a serem persistidas.  
 *   
 * @param {CepData} dados - Objeto contendo os dados do CEP a serem salvos  
 *   
 * @returns {Promise<{ success: boolean; message: string }>} Promise que resolve com o status da operação e mensagem de retorno  
 *   
 * @throws {Error} Lança erro quando ocorre falha ao salvar o CEP  
 *   
 * @async  
 */
export async function salvarCep(dados: CepData): Promise<{ success: boolean; message: string }> {
  const response = await fetch(`${API_BASE_URL}/salvar-cep`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dados)
  });
  
  if (!response.ok) {
    throw new Error('Erro ao salvar CEP');
  }
  
  return await response.json();
}