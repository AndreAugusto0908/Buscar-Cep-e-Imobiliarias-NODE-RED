import type { CepData, CepSalvo } from "../types/Cep";

const API_BASE_URL = 'http://localhost:1880';

export async function buscarCep(cep: string): Promise<CepData> {
  const response = await fetch(`${API_BASE_URL}/cep/${cep}`);
  
  if (!response.ok) {
    throw new Error(`CEP não encontrado`);
  }
  
  return await response.json();
}

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

export async function listarCepsSalvos(): Promise<CepSalvo[]> {
  const response = await fetch(`${API_BASE_URL}/ceps-salvos`);
  
  if (!response.ok) {
    throw new Error('Erro ao listar CEPs salvos');
  }
  
  const data = await response.json();
  return data.ceps;
}