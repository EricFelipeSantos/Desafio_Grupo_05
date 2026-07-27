import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../src/styles/App.css";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Dashboard from "./pages/Dashboard/Dashboard";
import Contato from "./pages/Contato/Contato";
import CadastroProduto from "./pages/CadastroProduto/CadastroProduto";
import ProdutoDetalhes from "./pages/ProdutoDetalhes/ProdutoDetalhes";
import Produtos from "./pages/Produtos/Produtos";
import Carrinho from "./pages/Carrinho/Carrinho";
import Checkout from "./pages/Checkout/Checkout";
import GerenciarProdutos from "./pages/GerenciarProdutos/GerenciarProdutos";
import EditarProduto from "./pages/EditarProduto/EditarProduto";
import Pedidos from "./pages/Pedidos/Pedidos";
import GerenciarBanners from "./pages/GerenciarBanners/GerenciarBanners";
import PedidoConfirmado from "./pages/PedidoConfirmado/PedidoConfirmado";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* Rotas Públicas */}
                <Route path="/" element={<Home />} />
                <Route path="/produtos" element={<Produtos />} />
                <Route path="/produtos/:id" element={<ProdutoDetalhes />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/login" element={<Login />} />
                <Route path="/contato" element={<Contato />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="/pedido-confirmado" element={<PedidoConfirmado />} />

                {/* Rotas Administrativas */}
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/produto/novo" element={<CadastroProduto />} />
                <Route path="/gerenciar-produtos" element={<GerenciarProdutos />} />
                <Route path="/produto/editar/:id" element={<EditarProduto />} />
                <Route path="/pedidos" element={<Pedidos />} />
                <Route path="/gerenciar-banners" element={<GerenciarBanners />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;