import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { CepData } from '../../types/Cep';
import { buscarCep } from '../../services/CepService';

const BuscadorCepInput: React.FC = () => {
  const navigate = useNavigate();
  const [cepInput, setCepInput] = useState<string>('');
  const [dados, setDados] = useState<CepData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleBuscar = async (): Promise<void> => {
    if (!cepInput.trim()) {
      setError('Por favor, digite um CEP');
      return;
    }

    setLoading(true);
    setError(null);
    setDados(null);

    try {
      const data = await buscarCep(cepInput);
      setDados(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === 'Enter') {
      handleBuscar();
    }
  };

  const handleClickResultado = (cep: string): void => {
    navigate(`/cep/${cep}`);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-lime-400 transition-colors mb-6 flex items-center gap-2"
          >
            ← Voltar
          </button>
          
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">
              <span className="text-white">Buscador de </span>
              <span className="text-lime-400">CEP</span>
            </h1>
            <p className="text-gray-400">
              Digite um CEP para buscar informações completas do endereço
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <div className="flex gap-3">
              <input
                type="text"
                placeholder="Digite o CEP (ex: 89010025 ou 89010-025)"
                value={cepInput}
                onChange={(e) => setCepInput(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={loading}
                className="flex-1 bg-zinc-800 text-white px-4 py-3 rounded-xl border border-zinc-700 focus:border-lime-400 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              />
              
              <button 
                onClick={handleBuscar} 
                disabled={loading}
                className="bg-lime-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-lime-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {loading ? '⏳ Buscando...' : '🔍 Buscar'}
              </button>
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-xl p-4 mb-6">
            <p className="text-red-400 font-semibold">❌ {error}</p>
          </div>
        )}

        {dados && (
          <div 
            onClick={() => handleClickResultado(dados.cep)}
            className="bg-linear-to-br from-lime-950 to-zinc-900 border-2 border-lime-400 rounded-2xl p-8 cursor-pointer hover:scale-[1.02] transition-transform duration-300 relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400 opacity-10 rounded-full -mr-16 -mt-16"></div>
            
            <div className="relative">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">
                  📍 Resultado Encontrado
                </h2>
                <span className="text-lime-400 text-2xl">→</span>
              </div>

              <div className="bg-black/30 rounded-xl p-6 mb-4">
                <div className="text-lime-400 text-sm font-semibold mb-2">CEP</div>
                <div className="text-white text-3xl font-bold font-mono">{dados.cep}</div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-black/30 rounded-xl p-4">
                  <div className="text-lime-400 text-sm font-semibold mb-1">Rua</div>
                  <div className="text-white font-medium">{dados.street}</div>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <div className="text-lime-400 text-sm font-semibold mb-1">Bairro</div>
                  <div className="text-white font-medium">{dados.neighborhood}</div>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <div className="text-lime-400 text-sm font-semibold mb-1">Cidade</div>
                  <div className="text-white font-medium">{dados.city}</div>
                </div>

                <div className="bg-black/30 rounded-xl p-4">
                  <div className="text-lime-400 text-sm font-semibold mb-1">Estado</div>
                  <div className="text-white font-medium">{dados.state}</div>
                </div>
              </div>

              <div className="mt-6 text-center">
                <p className="text-lime-300 text-sm animate-pulse">
                  👆 Clique para ver todos os detalhes
                </p>
              </div>
            </div>
          </div>
        )}

        {!dados && !error && !loading && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-12 text-center">
            <div className="text-6xl mb-4">📮</div>
            <h3 className="text-white text-xl font-semibold mb-2">
              Pronto para buscar!
            </h3>
            <p className="text-gray-400">
              Digite um CEP no campo acima e pressione Enter ou clique em Buscar
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuscadorCepInput;