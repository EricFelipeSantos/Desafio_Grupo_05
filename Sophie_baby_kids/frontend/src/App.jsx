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
import CadastroCliente from "./pages/CadastroCliente/CadastroCliente";
import Checkout from "./pages/Checkout/Checkout";
import RotaProtegida from "./components/RotaProtegida/RotaProtegida";
import RotaAdmin from "./components/RotaAdmin/RotaAdmin";
import RecuperarSenha from "./pages/RecuperarSenha/RecuperarSenha";
import GerenciarProdutos from "./pages/GerenciarProdutos/GerenciarProdutos";
import EditarProduto from "./pages/EditarProduto/EditarProduto";
import Pedidos from "./pages/Pedidos/Pedidos";
import GerenciarBanners from "./pages/GerenciarBanners/GerenciarBanners";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />

                <Route
                    path="/produtos"
                    element={<Produtos />}
                />

                <Route
                    path="/produtos/:id"
                    element={<ProdutoDetalhes />}
                />

                <Route
                    path="/carrinho"
                    element={<Carrinho />}
                />

                <Route
                    path="/login"
                    element={<Login />}
                />

                <Route
                    path="/recuperar-senha"
                    element={<RecuperarSenha />}
                />

                <Route
                    path="/cadastro"
                    element={<CadastroCliente />}
                />

                <Route
                    path="/checkout"
                    element={
                        <RotaProtegida>
                            <Checkout />
                        </RotaProtegida>
                    }
                />

                <Route
                    path="/dashboard"
                    element={
                        <RotaAdmin>
                            <Dashboard />
                        </RotaAdmin>
                    }
                />

                <Route
                    path="/gerenciar-banners"
                    element={
                        <RotaAdmin>
                            <GerenciarBanners />
                        </RotaAdmin>
                    }
                />
                <Route
                    path="/produto/novo"
                    element={
                        <RotaAdmin>
                            <CadastroProduto />
                        </RotaAdmin>
                    }
                />

                <Route
                    path="/gerenciar-produtos"
                    element={
                        <RotaAdmin>
                            <GerenciarProdutos />
                        </RotaAdmin>
                    }
                />

                <Route
                    path="/produto/editar/:id"
                    element={
                        <RotaAdmin>
                            <EditarProduto />
                        </RotaAdmin>
                    }
                />

                <Route
                    path="/pedidos"
                    element={
                        <RotaAdmin>
                            <Pedidos />
                        </RotaAdmin>
                    }
                />

                <Route
                    path="/contato"
                    element={<Contato />}
                />

            </Routes>
        </BrowserRouter>
    );
}

export default App;