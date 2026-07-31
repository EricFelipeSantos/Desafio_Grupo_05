import "./Pedidos.css";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useProducts } from "../../context/ProductContext/ProductContext";
import { useCart } from "../../context/CartContext/CartContext";

import { 
    FaBox, FaUser, FaShoppingBag, FaMoneyBill, FaPhone, FaHome, 
    FaSearch, FaTimes, FaArrowLeft, FaWhatsapp, FaImage
} from "react-icons/fa";

import { isCorColorido, getCorStyle, getCorClass } from "../../utils/colorUtils";

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);
    const [busca, setBusca] = useState("");
    const [filtroStatus, setFiltroStatus] = useState("");
    const { getImageUrl } = useProducts();
    const { formatPrice } = useCart();
    const navigate = useNavigate();

    useEffect(() => {
        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];
        setPedidos(pedidosSalvos);
    }, []);

    function alterarStatus(id, novoStatus) {
        const pedidosAtualizados = pedidos.map((pedido) =>
            pedido.id === id
                ? {
                      ...pedido,
                      status: novoStatus
                  }
                : pedido
        );

        setPedidos(pedidosAtualizados);
        localStorage.setItem("pedidos", JSON.stringify(pedidosAtualizados));
    }

    function obterImagem(imagem) {
        if (!imagem) return null;
        
        if (typeof imagem === "string") {
            if (imagem.startsWith("http")) {
                return imagem;
            }
            return getImageUrl(imagem);
        }
        
        if (typeof imagem === "object" && imagem.imagem) {
            const path = imagem.imagem;
            if (path.startsWith("http")) {
                return path;
            }
            return getImageUrl(path);
        }
        
        return null;
    }

    function obterNomeCor(cor) {
        if (!cor) return null;
        if (typeof cor === "object") return cor.nome || null;
        return cor;
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
            "Pendente": "ATUALIZAÇÃO DO PEDIDO\n\nOlá! Seu pedido foi recebido e está PENDENTE de confirmação.\n\nAssim que confirmarmos, avisamos você!",
            "Em preparação": "ATUALIZAÇÃO DO PEDIDO\n\nOlá! Seu pedido já está em PREPARAÇÃO!\n\nEm breve estará pronto para entrega!",
            "Concluído": "ATUALIZAÇÃO DO PEDIDO\n\nOlá! Seu pedido foi CONCLUÍDO com sucesso!\n\nObrigado pela preferência!",
            "Cancelado": "ATUALIZAÇÃO DO PEDIDO\n\nOlá! Infelizmente seu pedido foi CANCELADO.\n\nEntre em contato conosco para mais informações."
        };

        const mensagem = mensagens[status] || mensagens["Pendente"];

        window.open(`https://wa.me/${telefoneFinal}?text=${encodeURIComponent(mensagem)}`, "_blank");
    }

    const pedidosFiltrados = pedidos.filter(pedido => {
        const buscaLower = busca.toLowerCase().trim();
        const statusMatch = !filtroStatus || pedido.status === filtroStatus;

        if (!buscaLower) return statusMatch;

        const nomeMatch = pedido.cliente?.nome?.toLowerCase().includes(buscaLower);
        const idMatch = String(pedido.id).includes(buscaLower);
        const telefoneMatch = pedido.cliente?.telefone?.includes(buscaLower);

        return (nomeMatch || idMatch || telefoneMatch) && statusMatch;
    });

    function limparFiltros() {
        setBusca("");
        setFiltroStatus("");
    }

    if (pedidos.length === 0) {
        return (
            <>
                <Navbar />
                <main className="pedidos-page">
                    <section className="pedidos-container">
                        <div className="pedidos-header">
                            <h1><FaBox /> Pedidos da loja</h1>
                            <p>Acompanhe os pedidos realizados pelos clientes.</p>
                        </div>
                        <div className="empty-orders">
                            <h2>Nenhum pedido encontrado</h2>
                            <p>Os pedidos realizados aparecerão aqui.</p>
                        </div>
                        <button className="back-button" onClick={() => navigate("/dashboard")}>
                            <FaArrowLeft /> Voltar ao Dashboard
                        </button>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    const statusOptions = ["Pendente", "Em preparação", "Concluído", "Cancelado"];

    return (
        <>
            <Navbar />

            <main className="pedidos-page">
                <section className="pedidos-container">
                    <div className="pedidos-header">
                        <div>
                            <h1><FaBox /> Pedidos da loja</h1>
                            <p>Acompanhe os pedidos realizados pelos clientes.</p>
                        </div>
                        <button className="back-button-header" onClick={() => navigate("/dashboard")}>
                            <FaArrowLeft /> Voltar
                        </button>
                    </div>

                    <div className="pedidos-filters">
                        <div className="search-box">
                            <FaSearch className="search-icon" />
                            <input
                                type="text"
                                placeholder="Buscar por cliente, ID ou telefone..."
                                value={busca}
                                onChange={e => setBusca(e.target.value)}
                            />
                            {busca && (
                                <button className="clear-search" onClick={() => setBusca("")}>
                                    <FaTimes />
                                </button>
                            )}
                        </div>

                        <div className="filter-status">
                            <select
                                value={filtroStatus}
                                onChange={e => setFiltroStatus(e.target.value)}
                            >
                                <option value="">Todos os status</option>
                                {statusOptions.map(status => (
                                    <option key={status} value={status}>{status}</option>
                                ))}
                            </select>
                            {filtroStatus && (
                                <button className="clear-filter" onClick={() => setFiltroStatus("")}>
                                    <FaTimes />
                                </button>
                            )}
                        </div>

                        {(busca || filtroStatus) && (
                            <button className="clear-all-filters" onClick={limparFiltros}>
                                Limpar filtros
                            </button>
                        )}
                    </div>

                    <div className="orders-count">
                        {pedidosFiltrados.length} pedido{pedidosFiltrados.length !== 1 ? "s" : ""} encontrado
                        {pedidosFiltrados.length !== pedidos.length && (
                            <span className="filtered-info">(de {pedidos.length} no total)</span>
                        )}
                    </div>

                    <div className="orders-list">
                        {pedidosFiltrados.map((pedido) => (
                            <article className="order-card" key={pedido.id}>
                                <div className="order-card-header">
                                    <div className="order-id">
                                        <h2>Pedido #{pedido.id}</h2>
                                        <span>{pedido.data}</span>
                                    </div>

                                    <div className="order-status-group">
                                        <span 
                                            className="status-badge"
                                            style={{ backgroundColor: getStatusColor(pedido.status || "Pendente") }}
                                        >
                                            {pedido.status || "Pendente"}
                                        </span>

                                        <select
                                            value={pedido.status || "Pendente"}
                                            onChange={(event) => alterarStatus(pedido.id, event.target.value)}
                                            className="status-select"
                                        >
                                            <option value="Pendente">Pendente</option>
                                            <option value="Em preparação">Em preparação</option>
                                            <option value="Concluído">Concluído</option>
                                            <option value="Cancelado">Cancelado</option>
                                        </select>

                                        <button
                                            className="whatsapp-btn"
                                            onClick={() => enviarWhatsApp(pedido)}
                                            title="Enviar atualização para o cliente"
                                        >
                                            <FaWhatsapp />
                                        </button>
                                    </div>
                                </div>

                                <div className="customer-info">
                                    <strong>Cliente</strong>
                                    <p><FaUser className="info-icon" /> {pedido.cliente?.nome || "Cliente não informado"}</p>
                                    <p><FaPhone className="info-icon" /> {pedido.cliente?.telefone || "Telefone não informado"}</p>
                                    <p><FaHome className="info-icon" /> {pedido.cliente?.endereco || "Endereço não informado"}</p>
                                    <p className="payment-method">
                                        <FaMoneyBill className="info-icon" /> Pagamento: {pedido.formaPagamento || "Não informado"}
                                    </p>
                                </div>

                                <div className="order-products">
                                    <strong><FaShoppingBag /> Produtos</strong>

                                    {pedido.produtos?.map((produto, index) => {
                                        const nomeCor = obterNomeCor(produto.cor);
                                        const imagemProduto = obterImagem(produto.imagem);

                                        return (
                                            <div className="order-product" key={`${produto.id}-${produto.tamanho}-${nomeCor}-${index}`}>
                                                {imagemProduto ? (
                                                    <img 
                                                        src={imagemProduto} 
                                                        alt={produto.nome}
                                                        onError={(e) => {
                                                            e.target.style.display = 'none';
                                                            const placeholder = e.target.parentElement.querySelector('.order-product-placeholder');
                                                            if (placeholder) {
                                                                placeholder.style.display = 'flex';
                                                            }
                                                        }}
                                                    />
                                                ) : (
                                                    <div className="order-product-placeholder"><FaImage /></div>
                                                )}

                                                <div className="order-product-info">
                                                    <h3>{produto.nome}</h3>
                                                    {nomeCor && (
                                                        <p>
                                                            Cor: 
                                                            <span 
                                                                className={`color-dot ${getCorClass(produto.cor)}`}
                                                                style={getCorStyle(produto.cor)}
                                                            />
                                                            {nomeCor}
                                                        </p>
                                                    )}
                                                    {produto.tamanho && <p>Tamanho: {produto.tamanho}</p>}
                                                    <p>Quantidade: {produto.quantidade}</p>
                                                    <p className="product-price">{formatPrice(produto.preco)} cada</p>
                                                </div>

                                                <strong className="product-subtotal">{formatPrice(produto.preco * produto.quantidade)}</strong>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="order-total">
                                    <span>Total do pedido</span>
                                    <strong>{formatPrice(Number(pedido.total))}</strong>
                                </div>
                            </article>
                        ))}
                    </div>

                    <button className="back-button" onClick={() => navigate("/dashboard")}>
                        <FaArrowLeft /> Voltar
                    </button>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Pedidos;