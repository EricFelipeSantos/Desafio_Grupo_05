import "./Dashboard.css";

import { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useProducts } from "../../context/ProductContext/ProductContext";
import { useCart } from "../../context/CartContext/CartContext";

import {
    FaBox,
    FaShoppingBag,
    FaUsers,
    FaMoneyBillWave,
    FaPlus,
    FaList,
    FaClipboardList,
    FaWhatsapp,
    FaTrash,
    FaExclamationTriangle
} from "react-icons/fa";

import { Link } from "react-router-dom";

function Dashboard() {
    const { produtos } = useProducts();
    const { formatPrice } = useCart();

    const [pedidos, setPedidos] = useState([]);
    const [clientesUnicos, setClientesUnicos] = useState(0);
    const [totalVendas, setTotalVendas] = useState(0);

    useEffect(() => {
        carregarDados();
    }, []);

    function carregarDados() {
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];
        setPedidos(pedidosSalvos);

        const clientes = new Set();
        pedidosSalvos.forEach(pedido => {
            if (pedido.cliente?.nome) {
                clientes.add(pedido.cliente.nome);
            }
        });
        setClientesUnicos(clientes.size);

        const total = pedidosSalvos.reduce((acc, pedido) => {
            return acc + Number(pedido.total || 0);
        }, 0);
        setTotalVendas(total);
    }

    function getStatusColor(status) {
        const cores = {
            "Pendente": "#f39c12",
            "Em preparação": "#3498db",
            "Concluído": "#27ae60",
            "Cancelado": "#e74c3c"
        };
        return cores[status] || "#999";
    }

    function getStatusLabel(status) {
        const labels = {
            "Pendente": "Pendente",
            "Em preparação": "Em preparação",
            "Concluído": "Concluído",
            "Cancelado": "Cancelado"
        };
        return labels[status] || status;
    }

    function enviarWhatsApp(pedido) {
        const telefoneCliente = pedido.cliente?.telefone?.replace(/\D/g, "") || "";
        
        if (!telefoneCliente) {
            alert("Cliente não tem telefone cadastrado!");
            return;
        }

        const telefoneLimpo = telefoneCliente.startsWith("0") 
            ? telefoneCliente.slice(1) 
            : telefoneCliente;

        const telefoneFinal = telefoneLimpo.startsWith("55") 
            ? telefoneLimpo 
            : `55${telefoneLimpo}`;

        const status = pedido.status || "Pendente";
        const mensagens = {
            "Pendente": `*ATUALIZAÇÃO DO PEDIDO*\n\nOlá ${pedido.cliente?.nome || ""}! Seu pedido foi *recebido* e está *PENDENTE* de confirmação.\n\n *Pedido #${String(pedido.id).slice(-6)}*\n *Total: ${formatPrice(Number(pedido.total || 0))}*\n\nAssim que confirmarmos, avisamos você! `,
            "Em preparação": `*ATUALIZAÇÃO DO PEDIDO*\n\nOlá ${pedido.cliente?.nome || ""}! Seu pedido já está em *PREPARAÇÃO*! \n\n *Pedido #${String(pedido.id).slice(-6)}*\n *Total: ${formatPrice(Number(pedido.total || 0))}*\n\nEm breve estará pronto para entrega! `,
            "Concluído": `*ATUALIZAÇÃO DO PEDIDO*\n\nOlá ${pedido.cliente?.nome || ""}! Seu pedido foi *CONCLUÍDO* com sucesso! \n\n *Pedido #${String(pedido.id).slice(-6)}*\n *Total: ${formatPrice(Number(pedido.total || 0))}*\n\nObrigado pela preferência! `,
            "Cancelado": `*ATUALIZAÇÃO DO PEDIDO*\n\nOlá ${pedido.cliente?.nome || ""}! Infelizmente seu pedido foi *CANCELADO*. \n\n *Pedido #${String(pedido.id).slice(-6)}*\n *Total: ${formatPrice(Number(pedido.total || 0))}*\n\nEntre em contato conosco para mais informações.`
        };

        const mensagem = mensagens[status] || mensagens["Pendente"];

        window.open(`https://wa.me/${telefoneFinal}?text=${encodeURIComponent(mensagem)}`, "_blank");
    }

    function limparPedidos() {
        const confirmar = window.confirm(
            "Tem certeza que deseja limpar TODOS os pedidos?\n\n" +
            "Esta ação não pode ser desfeita."
        );

        if (!confirmar) return;

        localStorage.removeItem("pedidos");
        carregarDados();
        alert("Todos os pedidos foram removidos com sucesso!");
    }

    function limparBanners() {
        const confirmar = window.confirm(
            "Tem certeza que deseja limpar TODOS os banners?\n\n" +
            "Esta ação não pode ser desfeita."
        );

        if (!confirmar) return;

        localStorage.removeItem("banners");
        alert("Todos os banners foram removidos com sucesso!");
    }

    function limparTodosOsDados() {
        const confirmar = window.confirm(
            "ATENÇÃO!\n\n" +
            "Isso vai limpar TODOS os dados:\n" +
            "• Pedidos\n" +
            "• Banners\n" +
            "• Dados do carrinho\n\n" +
            "Esta ação NÃO PODE SER DESFEITA!\n\n" +
            "Deseja continuar?"
        );

        if (!confirmar) return;

        const confirmar2 = window.confirm(
            "ÚLTIMA CHANCE!\n\n" +
            "Tem certeza ABSOLUTA que quer limpar tudo?"
        );

        if (!confirmar2) return;

        localStorage.removeItem("pedidos");
        localStorage.removeItem("banners");
        localStorage.removeItem("cart");
        
        carregarDados();
        alert("Todos os dados foram removidos com sucesso!");
    }

    const pedidosRecentes = [...pedidos]
        .sort((a, b) => b.id - a.id)
        .slice(0, 5);

    const pedidosPendentes = pedidos.filter(p => p.status === "Pendente" || !p.status).length;

    return (
        <>
            <Navbar />

            <main className="dashboard-page">
                <section className="dashboard-container">
                    <div className="dashboard-header">
                        <div>
                            <h1>
                                <FaBox /> Painel administrativo
                            </h1>

                            <p>
                                Acompanhe os produtos, pedidos e clientes da loja.
                            </p>
                        </div>

                        <div className="dashboard-header-actions">
                            <Link
                                to="/produto/novo"
                                className="dashboard-header-button"
                            >
                                <FaPlus /> Novo produto
                            </Link>
                        </div>
                    </div>

                    <section className="dashboard-cards">
                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">
                                <FaBox />
                            </div>

                            <div>
                                <span>Produtos</span>
                                <strong>{produtos.length}</strong>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">
                                <FaShoppingBag />
                            </div>

                            <div>
                                <span>Pedidos</span>
                                <strong>{pedidos.length}</strong>
                                {pedidosPendentes > 0 && (
                                    <small className="card-badge">
                                        {pedidosPendentes} pendentes
                                    </small>
                                )}
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">
                                <FaUsers />
                            </div>

                            <div>
                                <span>Clientes</span>
                                <strong>{clientesUnicos}</strong>
                            </div>
                        </div>

                        <div className="dashboard-card">
                            <div className="dashboard-card-icon">
                                <FaMoneyBillWave />
                            </div>

                            <div>
                                <span>Vendas</span>
                                <strong>{formatPrice(totalVendas)}</strong>
                            </div>
                        </div>
                    </section>

                    <section className="dashboard-section">
                        <div className="section-header">
                            <div>
                                <h2>Pedidos recentes</h2>
                                <p>Acompanhe os pedidos realizados pelos clientes.</p>
                            </div>

                            <Link
                                to="/pedidos"
                                className="section-button"
                            >
                                Ver todos
                            </Link>
                        </div>

                        {pedidosRecentes.length === 0 ? (
                            <div className="empty-orders">
                                <p>Nenhum pedido realizado ainda.</p>
                                <p className="empty-subtitle">
                                    Os pedidos aparecerão aqui quando os clientes finalizarem compras.
                                </p>
                            </div>
                        ) : (
                            <div className="orders-table">
                                <div className="order-row order-header">
                                    <span>Cliente</span>
                                    <span>Pedido</span>
                                    <span>Total</span>
                                    <span>Status</span>
                                    <span className="order-actions-header">Ações</span>
                                </div>

                                {pedidosRecentes.map((pedido) => (
                                    <div className="order-row" key={pedido.id}>
                                        <span className="order-client">
                                            {pedido.cliente?.nome || "Cliente não identificado"}
                                        </span>

                                        <span className="order-id">
                                            #{String(pedido.id).slice(-6)}
                                        </span>

                                        <span className="order-total">
                                            {formatPrice(Number(pedido.total || 0))}
                                        </span>

                                        <span 
                                            className="status"
                                            style={{ 
                                                backgroundColor: getStatusColor(pedido.status || "Pendente")
                                            }}
                                        >
                                            {getStatusLabel(pedido.status || "Pendente")}
                                        </span>

                                        <span className="order-actions">
                                            <button
                                                className="order-action-btn whatsapp"
                                                onClick={() => enviarWhatsApp(pedido)}
                                                title="Enviar WhatsApp para o cliente"
                                            >
                                                <FaWhatsapp />
                                            </button>
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="dashboard-section">
                        <div className="section-header">
                            <div>
                                <h2>Ações rápidas</h2>
                                <p>Acesse rapidamente as principais funções administrativas.</p>
                            </div>
                        </div>

                        <div className="dashboard-actions">
                            <Link
                                to="/produto/novo"
                                className="dashboard-action"
                            >
                                <FaPlus />
                                <span>Cadastrar produto</span>
                            </Link>

                            <Link
                                to="/gerenciar-produtos"
                                className="dashboard-action"
                            >
                                <FaList />
                                <span>Gerenciar produtos</span>
                            </Link>

                            <Link
                                to="/pedidos"
                                className="dashboard-action"
                            >
                                <FaClipboardList />
                                <span>Gerenciar pedidos</span>
                            </Link>

                            <Link
                                to="/produtos"
                                className="dashboard-action"
                            >
                                <FaBox />
                                <span>Ver catálogo</span>
                            </Link>
                        </div>
                    </section>

                    <section className="dashboard-section maintenance-section">
                        <div className="section-header">
                            <div>
                                <h2>
                                    <FaExclamationTriangle /> Manutenção
                                </h2>
                                <p>Limpe dados antigos e mantenha o sistema organizado.</p>
                            </div>
                        </div>

                        <div className="maintenance-actions">
                            <button 
                                className="maintenance-btn"
                                onClick={limparPedidos}
                            >
                                <FaTrash /> Limpar pedidos
                            </button>

                            <button 
                                className="maintenance-btn"
                                onClick={limparBanners}
                            >
                                <FaTrash /> Limpar banners
                            </button>

                            <button 
                                className="maintenance-btn danger"
                                onClick={limparTodosOsDados}
                            >
                                <FaTrash /> Limpar todos os dados
                            </button>
                        </div>
                    </section>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Dashboard;