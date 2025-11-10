import React, { useState } from 'react';
import type { ApiResponse, Corretora } from '../../types/Corretora';
import { buscarTodasCorretoras } from '../../services/CorretoraService';
import { useNavigate } from 'react-router-dom';

const CatalogoCorretoras: React.FC = () => {
  const navigate = useNavigate();
  const [corretoras, setCorretoras] = useState<Corretora[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleBuscar = async (): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data: ApiResponse = await buscarTodasCorretoras();
      setCorretoras(data.corretoras || []);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleClickCorretora = (cnpj: string) => {
    navigate(`/corretora/${cnpj}`);
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-lime-400 transition-colors mb-4 flex items-center gap-2"
          >
            ← Voltar
          </button>
          
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">
                <span className="text-white">Catálogo de </span>
                <span className="text-lime-400">Corretoras</span>
              </h1>
              <p className="text-gray-400">
                Corretoras registradas na CVM via BrazilAPI
              </p>
            </div>
            
            <button 
              onClick={handleBuscar}
              disabled={loading}
              className="bg-lime-400 text-black px-8 py-3 rounded-xl font-bold hover:bg-lime-300 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Carregando...' : '🔍 Buscar Corretoras'}
            </button>
          </div>
        </div>
        {error && (
          <div className="bg-red-900/20 border border-red-500 rounded-xl p-4 mb-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div>
                <p className="text-red-400 font-semibold">❌ Erro ao buscar</p>
                <p className="text-red-300 text-sm">{error}</p>
              </div>
              <button 
                onClick={handleBuscar}
                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        )}

        {corretoras.length > 0 && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-2">
              <span className="text-lime-400 text-2xl font-bold">{corretoras.length}</span>
              <span className="text-gray-400">corretoras encontradas</span>
            </div>
          </div>
        )}
        {corretoras.length > 0 && (
          <div className="space-y-3">
            {corretoras.map((corretora, index) => (
              <div
                key={`${corretora.cnpj}-${index}`}
                onClick={() => handleClickCorretora(corretora.cnpj)}
                className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 hover:border-lime-400 hover:bg-zinc-800 transition-all duration-300 cursor-pointer group"
              >
                <div className="flex items-center justify-between gap-4">
                  <p className="text-white font-medium text-lg group-hover:text-lime-400 transition-colors">
                    {corretora.formato_completo}
                  </p>
                  <span className="text-gray-500 group-hover:text-lime-400 transition-colors text-xl">
                    →
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && corretoras.length === 0 && !error && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-12 text-center">
            <div className="text-6xl mb-4">📊</div>
            <h3 className="text-white text-xl font-semibold mb-2">Nenhuma corretora carregada</h3>
            <p className="text-gray-400 mb-6">Clique no botão "Buscar Corretoras" para começar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogoCorretoras;