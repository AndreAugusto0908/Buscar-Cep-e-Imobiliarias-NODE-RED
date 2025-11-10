import type { ApiResponse, Corretora } from "../types/Corretora";

const API_BASE_URL = 'http://localhost:1880';

export async function buscarTodasCorretoras(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/corretoras`);
    
    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status} - ${response.statusText}`);
    }
    
    const data: ApiResponse = await response.json();
    return data;
}

export async function buscarCorretoraPorCNPJ(cnpj: string): Promise<Corretora> {
  const response = await fetch(`${API_BASE_URL}/corretora/${cnpj}`);
  
  if (!response.ok) {
    throw new Error(`Corretora não encontrada`);
  }
  
  return await response.json();
}