export type Corretora = {
  formato_completo: string;
  nome: string;
  cidade: string;
  cnpj: string;
  bairro?: string;
  cep?: string;
  codigo_cvm?: string;
  complemento?: string;
  data_inicio_situacao?: string;
  data_patrimonio_liquido?: string;
  data_registro?: string;
  email?: string;
  logradouro?: string;
  municipio?: string;
  nome_social?: string;
  nome_comercial?: string;
  pais?: string;
  status?: string;
  telefone?: string;
  type?: string;
  uf?: string;
  valor_patrimonio_liquido?: string;
}


export type ApiResponse = {
  total: number;
  corretoras: Corretora[];
}
