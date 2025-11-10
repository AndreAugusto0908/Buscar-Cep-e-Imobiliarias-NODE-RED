import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Corretora } from '../../types/Corretora';
import { buscarCorretoraPorCNPJ } from '../../services/CorretoraService';

const CorretoraDetalhes: React.FC = () => {
  const { cnpj } = useParams<{ cnpj: string }>();
  const navigate = useNavigate();
  const [corretora, setCorretora] = useState<Corretora | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (cnpj) {
      buscarDetalhes(cnpj);
    }
  }, [cnpj]);

  const buscarDetalhes = async (cnpj: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await buscarCorretoraPorCNPJ(cnpj);
      setCorretora(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-lime-400 text-6xl mb-4">⏳</div>
          <p className="text-white text-xl">Carregando detalhes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/corretoras')}
            className="text-gray-400 hover:text-lime-400 transition-colors mb-4 flex items-center gap-2"
          >
            ← Voltar
          </button>
          <div className="bg-red-900/20 border border-red-500 rounded-xl p-8 text-center">
            <div className="text-red-400 text-6xl mb-4">❌</div>
            <h2 className="text-white text-2xl font-bold mb-2">Erro ao carregar</h2>
            <p className="text-red-300 mb-6">{error}</p>
            <button 
              onClick={() => cnpj && buscarDetalhes(cnpj)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!corretora) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/corretoras')}
            className="text-gray-400 hover:text-lime-400 transition-colors mb-4 flex items-center gap-2"
          >
            ← Voltar
          </button>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="text-gray-600 text-6xl mb-4">🔍</div>
            <h2 className="text-white text-2xl font-bold">Corretora não encontrada</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <button 
            onClick={() => navigate('/corretoras')}
            className="text-gray-400 hover:text-lime-400 transition-colors mb-6 flex items-center gap-2"
          >
            ← Voltar para lista
          </button>
          
          <div className="bg-linear-to-r from-lime-400 to-lime-500 rounded-xl p-6 mb-6">
            <h1 className="text-3xl font-bold text-black mb-2">
              {corretora.nome_social || corretora.nome}
            </h1>
            <p className="text-black/80 font-medium">
              {corretora.nome_comercial}
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lime-400 text-xl font-bold mb-4 flex items-center gap-2">
              📋 Informações Básicas
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Nome Comercial</p>
                <p className="text-white font-medium">{corretora.nome_comercial || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">CNPJ</p>
                <p className="text-white font-mono">{corretora.cnpj || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Código CVM</p>
                <p className="text-white">{corretora.codigo_cvm || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Status</p>
                <p className="text-lime-400 font-semibold">{corretora.status || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Tipo</p>
                <p className="text-white">{corretora.type || '-'}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lime-400 text-xl font-bold mb-4 flex items-center gap-2">
              📍 Endereço
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Logradouro</p>
                <p className="text-white">{corretora.logradouro || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Complemento</p>
                <p className="text-white">{corretora.complemento || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Bairro</p>
                <p className="text-white">{corretora.bairro || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Município / UF</p>
                <p className="text-white">{corretora.municipio || '-'} / {corretora.uf || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">CEP</p>
                <p className="text-white font-mono">{corretora.cep || '-'}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lime-400 text-xl font-bold mb-4 flex items-center gap-2">
              📞 Contato
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Telefone</p>
                <p className="text-white font-mono">{corretora.telefone || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Email</p>
                <p className="text-lime-400 break-all">{corretora.email || '-'}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lime-400 text-xl font-bold mb-4 flex items-center gap-2">
              💰 Informações Financeiras
            </h3>
            <div className="space-y-3">
              <div>
                <p className="text-gray-500 text-sm">Patrimônio Líquido</p>
                <p className="text-white text-xl font-bold">
                  R$ {corretora.valor_patrimonio_liquido || '-'}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Data do Patrimônio</p>
                <p className="text-white">{corretora.data_patrimonio_liquido || '-'}</p>
              </div>
            </div>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 md:col-span-2">
            <h3 className="text-lime-400 text-xl font-bold mb-4 flex items-center gap-2">
              📅 Datas Importantes
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm">Data de Registro</p>
                <p className="text-white">{corretora.data_registro || '-'}</p>
              </div>
              <div>
                <p className="text-gray-500 text-sm">Data Início Situação</p>
                <p className="text-white">{corretora.data_inicio_situacao || '-'}</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CorretoraDetalhes;