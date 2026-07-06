import {BrowserRouter, Routes, Route} from "react-router-dom"

import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import Dashboard from "./pages/CadastroProduto/CadastroProduto"
import Contato from "./pages/Contato/Contato"
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto"
import ProdutoDetalhes from "./pages/ProdutoDetalhes/ProdutoDetalhes"
import Produtos from "./pages/Produtos/Produtos"

function App() {
  return (
    // configuração das rotas
    <BrowserRouter> 
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/produtos" element={<Produtos/>}/>
        <Route path="/produtos/:id" element={<ProdutoDetalhes/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/produto/novo" element={<CadastroProduto/>}/>
        <Route path="/contato" element={<Contato/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;