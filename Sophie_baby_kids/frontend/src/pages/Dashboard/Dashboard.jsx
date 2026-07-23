import "./Dashboard.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useProducts } from "../../context/ProductContext/ProductContext";

import {
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaMoneyBillWave,
    FaPlus,
    FaList,
    FaClipboardList
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Dashboard() {
    const { produtos } = useProducts();

    return (
        <>
            <Navbar />

            <main className="dashboard-page">
                <section className="dashboard-container">
                    <div className="dashboard-header">
                        <div>
                            <h1>
                                Painel administrativo
                            </h1>

                            <p>
                                Acompanhe os produtos, pedidos e clientes da loja.
                            </p>
                        </div>
                    </div>

                    <section className="dashboard-cards">
                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">
                                <FaBox />
                            </div>

                            <div>
                                <span>
                                    Produtos
                                </span>

                                <strong>
                                    {produtos.length}
                                </strong>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">
                                <FaShoppingBag />
                            </div>

                            <div>
                                <span>
                                    Pedidos
                                </span>

                                <strong>
                                    12
                                </strong>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">
                                <FaUsers />
                            </div>

                            <div>
                                <span>
                                    Clientes
                                </span>

                                <strong>
                                    25
                                </strong>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">
                                <FaMoneyBillWave />
                            </div>

                            <div>
                                <span>
                                    Vendas
                                </span>

                                <strong>
                                    R$ 1.250,00
                                </strong>
                            </div>
                        </div>

                    </section>

                    <section className="dashboard-section">
                        <div className="section-header">
                            <div>
                                <h2>
                                    Pedidos recentes
                                </h2>

                                <p>
                                    Acompanhe os pedidos realizados pelos clientes.
                                </p>
                            </div>

                            <Link
                                to="/pedidos"
                                className="section-button"
                            >
                                Ver todos
                            </Link>

                        </div>

                        <div className="orders-table">
                            <div className="order-row order-header">
                                <span>
                                    Cliente
                                </span>

                                <span>
                                    Pedido
                                </span>

                                <span>
                                    Total
                                </span>

                                <span>
                                    Status
                                </span>

                            </div>

                            <div className="order-row">
                                <span>
                                    Ana Silva
                                </span>

                                <span>
                                    #001
                                </span>

                                <span>
                                    R$ 169,90
                                </span>

                                <span className="status pending">
                                    Pendente
                                </span>
                            </div>

                            <div className="order-row">
                                <span>
                                    João Santos
                                </span>

                                <span>
                                    #002
                                </span>

                                <span>
                                    R$ 89,90
                                </span>

                                <span className="status approved">
                                    Confirmado
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="dashboard-section">
                        <div className="section-header">
                            <div>
                                <h2>
                                    Ações rápidas
                                </h2>

                                <p>
                                    Acesse rapidamente as principais funções administrativas.
                                </p>
                            </div>
                        </div>

                        <div className="dashboard-actions">
                            <Link
                                to="/produto/novo"
                                className="dashboard-action"
                            >
                                <FaPlus />

                                <span>
                                    Cadastrar produto
                                </span>
                            </Link>

                            <Link
                                to="/gerenciar-produtos"
                                className="dashboard-action"
                            >
                                <FaList />

                                <span>
                                    Gerenciar produtos
                                </span>
                            </Link>

                            <Link
                                to="/pedidos"
                                className="dashboard-action"
                            >
                                <FaClipboardList />

                                <span>
                                    Gerenciar pedidos
                                </span>
                            </Link>

                            <Link
                                to="/produtos"
                                className="dashboard-action"
                            >
                                <FaBox />

                                <span>
                                    Ver catálogo
                                </span>
                            </Link>
                        </div>
                    </section>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Dashboard;