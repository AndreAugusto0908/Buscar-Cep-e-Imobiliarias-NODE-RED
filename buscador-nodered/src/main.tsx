import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CatalogoCorretoras from './pages/Corretoras/BuscaCorretora.tsx'
import CorretoraDetalhes from './pages/Corretoras/DetalheCorretora.tsx'
import BuscadorCep from './pages/Cep/BuscarCep.tsx'
import DetalhesCep from './pages/Cep/DetalhesCep.tsx'

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />} />
      <Route path="/corretoras" element={<CatalogoCorretoras />} />
      <Route path="/corretora/:cnpj" element={<CorretoraDetalhes />} />
      <Route path="/cep" element={<BuscadorCep />} />
      <Route path="/cep/:cep" element={<DetalhesCep />} />
    </Routes>
  </BrowserRouter>
)
