import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { CepData } from '../../types/Cep';
import { buscarCep, salvarCep } from '../../services/CepService';

const DetalhesCep: React.FC = () => {
  const { cep } = useParams<{ cep: string }>();
  const navigate = useNavigate();
  const [dados, setDados] = useState<CepData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [salvando, setSalvando] = useState<boolean>(false);
  const [mensagemSalvar, setMensagemSalvar] = useState<{ tipo: 'success' | 'error'; texto: string } | null>(null);

  useEffect(() => {
    if (cep) {
      buscarDadosCep(cep);
    }
  }, [cep]);

  const buscarDadosCep = async (cep: string): Promise<void> => {
    setLoading(true);
    setError(null);
    try {
      const data = await buscarCep(cep);
      setDados(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSalvarCep = async (): Promise<void> => {
    if (!dados) return;

    setSalvando(true);
    setMensagemSalvar(null);

    try {
      await salvarCep(dados);
      setMensagemSalvar({
        tipo: 'success',
        texto: '✅ CEP salvo com sucesso no banco de dados!'
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao salvar';
      setMensagemSalvar({
        tipo: 'error',
        texto: `❌ ${errorMessage}`
      });
    } finally {
      setSalvando(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-lime-400 text-6xl mb-4 animate-pulse">📍</div>
          <p className="text-white text-xl">Carregando CEP...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-lime-400 transition-colors mb-4 flex items-center gap-2"
          >
            ← Voltar
          </button>
          <div className="bg-red-900/20 border border-red-500 rounded-xl p-8 text-center">
            <div className="text-red-400 text-6xl mb-4">❌</div>
            <h2 className="text-white text-2xl font-bold mb-2">Erro ao buscar CEP</h2>
            <p className="text-red-300 mb-6">{error}</p>
            <button
              onClick={() => cep && buscarDadosCep(cep)}
              className="bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition"
            >
              Tentar Novamente
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!dados) {
    return (
      <div className="min-h-screen bg-black p-6">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate('/')}
            className="text-gray-400 hover:text-lime-400 transition-colors mb-4 flex items-center gap-2"
          >
            ← Voltar
          </button>
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 text-center">
            <div className="text-gray-600 text-6xl mb-4">📮</div>
            <h2 className="text-white text-2xl font-bold mb-2">CEP não encontrado</h2>
            <p className="text-gray-400 mb-4">Informe um CEP na URL</p>
            <p className="text-gray-500 text-sm font-mono">
              Exemplo: /cep/89010025
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/cep')}
            className="text-gray-400 hover:text-lime-400 transition-colors mb-6 flex items-center gap-2"
          >
            ← Voltar para busca
          </button>

          <div className="bg-linear-to-r from-lime-400 to-lime-500 rounded-xl p-6 mb-6">
            <div className="flex items-center gap-3">
              <span className="text-4xl">📍</span>
              <div>
                <h1 className="text-3xl font-bold text-black">
                  Detalhes do CEP
                </h1>
                <p className="text-black/80 font-mono text-xl font-bold">
                  {dados.cep}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">

          {/* Endereço Completo */}
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
            <h3 className="text-lime-400 text-xl font-bold mb-4 flex items-center gap-2">
              🏠 Endereço Completo
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Logradouro</p>
                <p className="text-white text-lg font-medium">{dados.street}</p>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-500 text-sm mb-1">Bairro</p>
                  <p className="text-white font-medium">{dados.neighborhood}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm mb-1">CEP</p>
                  <p className="text-white font-mono font-medium">{dados.cep}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
              <h3 className="text-lime-400 text-xl font-bold mb-4 flex items-center gap-2">
                🌍 Cidade
              </h3>
              <div className="space-y-3">
                <div>
                  <p className="text-gray-500 text-sm">Município</p>
                  <p className="text-white text-2xl font-bold">{dados.city}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-sm">Estado</p>
                  <p className="text-lime-400 text-xl font-bold">{dados.state}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-linear-to-br from-lime-950 to-zinc-900 border-2 border-lime-400 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white text-lg font-bold mb-1">
                  Buscar outro CEP?
                </h3>
                <p className="text-gray-300 text-sm">
                  Volte para a página de busca
                </p>
              </div>
              <button
                onClick={() => navigate('/cep')}
                className="bg-lime-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-lime-300 transition-all duration-300 whitespace-nowrap"
              >
                Nova Busca →
              </button>
            </div>
          </div>
        </div>

        {/* Botão Salvar no Banco */}
        <div className="bg-linear-to-br from-lime-950 to-zinc-900 border-2 border-lime-400 rounded-xl p-6 mt-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-white text-lg font-bold mb-1">
                💾 Salvar este CEP
              </h3>
              <p className="text-gray-300 text-sm">
                Guardar no banco de dados PostgreSQL
              </p>
            </div>
            <button
              onClick={handleSalvarCep}
              disabled={salvando}
              className="bg-lime-400 text-black px-6 py-3 rounded-xl font-bold hover:bg-lime-300 transition-all duration-300 whitespace-nowrap disabled:opacity-50"
            >
              {salvando ? '💾 Salvando...' : '💾 Salvar CEP'}
            </button>
          </div>

          {mensagemSalvar && (
            <div className={`mt-4 p-3 rounded-lg ${mensagemSalvar.tipo === 'success'
                ? 'bg-lime-400/20 text-lime-400'
                : 'bg-red-500/20 text-red-400'
              }`}>
              {mensagemSalvar.texto}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetalhesCep;