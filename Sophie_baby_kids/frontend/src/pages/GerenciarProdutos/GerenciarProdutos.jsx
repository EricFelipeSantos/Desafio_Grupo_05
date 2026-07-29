import "./GerenciarProdutos.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useProducts } from "../../context/ProductContext/ProductContext";
import { useCart } from "../../context/CartContext/CartContext";

import { FaEdit, FaTrash, FaPlus, FaBox, FaSearch, FaTimes } from "react-icons/fa";

function GerenciarProdutos() {
    const { produtos, excluirProduto, getImageUrl } = useProducts();
    const { formatPrice } = useCart();

    const [busca, setBusca] = useState("");
    const [filtroCategoria, setFiltroCategoria] = useState("");

    const categorias = [...new Set(produtos.map(p => p.categoria?.nome).filter(Boolean))];

    const produtosFiltrados = produtos.filter(p => {
        const buscaLower = busca.toLowerCase().trim();
        const catMatch = !filtroCategoria || p.categoria?.nome === filtroCategoria;
        if (!buscaLower) return catMatch;
        const nomeMatch = p.nome?.toLowerCase().includes(buscaLower);
        const catNomeMatch = p.categoria?.nome?.toLowerCase().includes(buscaLower);
        return (nomeMatch || catNomeMatch) && catMatch;
    });

    function handleExcluir(id) {
        if (!window.confirm("Tem certeza que deseja excluir este produto?")) return;
        excluirProduto(id);
        alert("Produto excluído com sucesso.");
    }

    function obterImagem(imagem) {
        if (!imagem) return null;
        if (typeof imagem === "object" && imagem.imagem) return getImageUrl(imagem.imagem);
        if (typeof imagem === "string") return getImageUrl(imagem);
        return null;
    }

    function limparFiltros() {
        setBusca("");
        setFiltroCategoria("");
    }

    return (
        <>
            <Navbar />
            <main className="gerenciar-page">
                <section className="gerenciar-container">
                    <div className="gerenciar-header">
                        <div>
                            <h1><FaBox /> Gerenciar Produtos</h1>
                            <p>Visualize, edite ou exclua os produtos da loja.</p>
                        </div>
                        <Link to="/produto/novo" className="new-product-button">
                            <FaPlus /> Cadastrar Produto
                        </Link>
                    </div>

                    {produtos.length > 0 && (
                        <>
                            <div className="gerenciar-filters">
                                <div className="search-box">
                                    <FaSearch className="search-icon" />
                                    <input
                                        type="text"
                                        placeholder="Buscar por nome ou categoria..."
                                        value={busca}
                                        onChange={e => setBusca(e.target.value)}
                                    />
                                    {busca && (
                                        <button className="clear-search" onClick={() => setBusca("")}>
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>

                                <div className="filter-category">
                                    <select
                                        value={filtroCategoria}
                                        onChange={e => setFiltroCategoria(e.target.value)}
                                    >
                                        <option value="">Todas as categorias</option>
                                        {categorias.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                    {filtroCategoria && (
                                        <button className="clear-filter" onClick={() => setFiltroCategoria("")}>
                                            <FaTimes />
                                        </button>
                                    )}
                                </div>

                                {(busca || filtroCategoria) && (
                                    <button className="clear-all-filters" onClick={limparFiltros}>
                                        Limpar filtros
                                    </button>
                                )}
                            </div>

                            <div className="products-count">
                                {produtosFiltrados.length} produto{produtosFiltrados.length !== 1 ? "s" : ""} encontrado
                                {produtosFiltrados.length !== produtos.length && (
                                    <span className="filtered-info">(de {produtos.length} no total)</span>
                                )}
                            </div>
                        </>
                    )}

                    {produtos.length === 0 ? (
                        <div className="empty-products">
                            <p>Nenhum produto cadastrado.</p>
                            <Link to="/produto/novo" className="empty-action-button">
                                <FaPlus /> Cadastrar primeiro produto
                            </Link>
                        </div>
                    ) : produtosFiltrados.length === 0 ? (
                        <div className="empty-products">
                            <p>Nenhum produto encontrado com os filtros selecionados.</p>
                            <button className="empty-action-button" onClick={limparFiltros}>
                                Limpar filtros
                            </button>
                        </div>
                    ) : (
                        <div className="products-table">
                            {produtosFiltrados.map(produto => {
                                const imagemUrl = obterImagem(produto.imagens?.[0]?.imagem);
                                return (
                                    <div className="product-admin-card" key={produto.id}>
                                        <div className="product-admin-image">
                                            {imagemUrl ? (
                                                <img src={imagemUrl} alt={produto.nome} loading="lazy" />
                                            ) : (
                                                <div className="product-admin-placeholder"><FaBox /></div>
                                            )}
                                        </div>

                                        <div className="product-admin-info">
                                            <h2>{produto.nome}</h2>
                                            <p className="product-category">
                                                Categoria: {produto.categoria?.nome || "Sem categoria"}
                                            </p>
                                            {produto.em_promocao && produto.preco_promocional ? (
                                                <div className="product-admin-prices">
                                                    <span className="original-price">{formatPrice(produto.preco)}</span>
                                                    <strong className="promotion-price">{formatPrice(produto.preco_promocional)}</strong>
                                                    <span className="promotion-badge">Oferta</span>
                                                </div>
                                            ) : (
                                                <strong className="product-price">{formatPrice(produto.preco)}</strong>
                                            )}
                                            <div className="product-admin-stats">
                                                <span>Tamanhos: {produto.tamanho?.length || 0}</span>
                                                <span>Cores: {produto.cores?.length || 0}</span>
                                            </div>
                                        </div>

                                        <div className="product-admin-actions">
                                            <Link to={`/produto/editar/${produto.id}`} className="edit-product-button">
                                                <FaEdit /> Editar
                                            </Link>
                                            <button className="delete-product-button" onClick={() => handleExcluir(produto.id)}>
                                                <FaTrash /> Excluir
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </section>
            </main>
            <Footer />
        </>
    );
}

export default GerenciarProdutos;