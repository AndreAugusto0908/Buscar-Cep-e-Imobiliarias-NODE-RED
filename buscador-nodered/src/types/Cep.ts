export type CepData = {
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
};


export type CepSalvo = {
  id: number;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  state: string;
  latitude: string;
  longitude: string;
  created_at: string;
};