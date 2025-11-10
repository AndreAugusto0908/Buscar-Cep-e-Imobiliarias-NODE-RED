import { useNavigate } from 'react-router-dom';

export default function App() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="text-white">Escolha Seu </span>
            <span className="text-lime-400">Serviço</span>
          </h1>
          <p className="text-gray-400 text-lg">
            Acesso simples e rápido aos dados da BrazilAPI
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-8 hover:border-lime-400 transition-all duration-300">
            <div className="mb-6">
              <h2 className="text-3xl font-bold text-white mb-3">
                Corretoras
              </h2>
              <p className="text-gray-400">
                Acesse o catálogo completo de corretoras registradas na CVM
              </p>
            </div>

            <div className="mb-8">
              <div className="text-gray-300 mb-4 font-semibold">INCLUI</div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-300">
                  <span className="text-lime-400 mr-3">✓</span>
                  Lista completa de corretoras
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-lime-400 mr-3">✓</span>
                  Informações detalhadas
                </li>
                <li className="flex items-center text-gray-300">
                  <span className="text-lime-400 mr-3">✓</span>
                  Busca em tempo real
                </li>
              </ul>
            </div>

            <button 
              onClick={() => navigate('/corretoras')}
              className="w-full bg-zinc-800 text-white py-4 rounded-xl font-semibold hover:bg-lime-400 hover:text-black transition-all duration-300 border border-zinc-700 hover:border-lime-400 cursor-pointer"
            >
              ESCOLHER ESTE →
            </button>
          </div>

          <div className="bg-linear-to-br from-lime-950 to-zinc-900 border-2 border-lime-400 rounded-2xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lime-400 opacity-10 rounded-full -mr-16 -mt-16"></div>
            
            <div className="mb-6 relative">
              <h2 className="text-3xl font-bold text-white mb-3">
                📍 Buscar CEP
              </h2>
              <p className="text-gray-300">
                Pesquise CEPs e obtenha informações completas do endereço
              </p>
            </div>

            <div className="mb-8 relative">
              <div className="text-lime-400 mb-4 font-semibold">INCLUI</div>
              <ul className="space-y-3">
                <li className="flex items-center text-gray-200">
                  <span className="text-lime-400 mr-3">✓</span>
                  Busca por rota ou input
                </li>
                <li className="flex items-center text-gray-200">
                  <span className="text-lime-400 mr-3">✓</span>
                  Dados completos do endereço
                </li>
                <li className="flex items-center text-gray-200">
                  <span className="text-lime-400 mr-3">✓</span>
                  Coordenadas GPS
                </li>
              </ul>
            </div>

            <button 
              onClick={() => navigate('/cep')}
              className="w-full bg-lime-400 text-black py-4 rounded-xl font-bold hover:bg-lime-300 transition-all duration-300 shadow-lg shadow-lime-400/20 cursor-pointer"
            >
              ESCOLHER ESTE →
            </button>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Powered by <span className="text-lime-400">BrazilAPI</span> & <span className="text-lime-400">Node-RED</span>
          </p>
        </div>
      </div>
    </div>
  );
}