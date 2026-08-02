import "./Navbar.css";

import logo from "../../assets/logo.png";

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext/CartContext";
import { useProducts } from "../../context/ProductContext/ProductContext";

import { TfiMenu } from "react-icons/tfi";
import {
    FaUserAlt,
    FaTimes,
    FaShoppingCart,
    FaChevronDown,
    FaSearch,
    FaHome,
    FaStore,
    FaEnvelope,
    FaBox,
    FaCog,
    FaImage,
    FaFilter,
    FaTimesCircle
} from "react-icons/fa";

// IMPORTA OS DADOS DO ARQUIVO SEPARADO
import { publicoCategorias } from "../../data/publicoCategoriaData";

function Navbar() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [usuarioMenuAberto, setUsuarioMenuAberto] = useState(false);
    const [publicoAtivo, setPublicoAtivo] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [filtroAberto, setFiltroAberto] = useState(false);
    const [filtros, setFiltros] = useState({
        publico: "",
        faixaEtaria: "",
        tamanho: "",
        precoMin: "",
        precoMax: "",
    });
    const [faixasEtarias, setFaixasEtarias] = useState([]);

    const { cartItems } = useCart();
    const { produtos } = useProducts();
    const navigate = useNavigate();

    const adminLogado = localStorage.getItem("admin_logado") === "true";
    const adminEmail = localStorage.getItem("admin_email") || "Admin";

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    useEffect(() => {
        if (produtos && produtos.length > 0) {
            // Pega todas as faixas etárias únicas
            const faixas = produtos
                .map(p => p.faixa_etaria)
                .filter(Boolean) // Remove nulos/undefined
                .filter(faixa => faixa.trim() !== ""); // Remove vazias

            // Remove duplicatas
            const faixasUnicas = [...new Set(faixas)];
            
            // Ordena alfabeticamente
            faixasUnicas.sort((a, b) => a.localeCompare(b));
            
            setFaixasEtarias(faixasUnicas);
        }
    }, [produtos]);

    // EXTRAI AS FAIXAS ETÁRIAS DOS PRODUTOS
    useEffect(() => {
        if (produtos && produtos.length > 0) {
            // Pega todas as faixas etárias únicas
            const faixas = produtos
                .map(p => p.faixa_etaria)
                .filter(Boolean) // Remove nulos/undefined
                .filter(faixa => faixa.trim() !== ""); // Remove vazias

            // Remove duplicatas
            const faixasUnicas = [...new Set(faixas)];
            
            // Ordena alfabeticamente
            faixasUnicas.sort((a, b) => a.localeCompare(b));
            
            setFaixasEtarias(faixasUnicas);
        }
    }, [produtos]);

    function sair() {
        localStorage.removeItem("admin_logado");
        localStorage.removeItem("admin_email");
        localStorage.removeItem("admin_nome");
        
        setUsuarioMenuAberto(false);
        setMenuAberto(false);

        navigate("/");
    }

    function fecharMenu() {
        setMenuAberto(false);
    }

    function handlePublicoHover(id) {
        setPublicoAtivo(id);
    }

    function handlePublicoLeave() {
        setPublicoAtivo(null);
    }

    function handleCategoriaClick(publicoId, categoriaSlug) {
        navigate(`/produtos?publico=${publicoId}&categoria=${categoriaId}`);
        setMenuAberto(false);
        setPublicoAtivo(null);
    }

    function handleSearch(e) {
        e.preventDefault();
        if (searchTerm.trim()) {
            navigate(`/produtos?busca=${encodeURIComponent(searchTerm.trim())}`);
            setSearchTerm("");
        }
    }

    function handleFiltroChange(e) {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
    }

    function aplicarFiltros() {
        const params = new URLSearchParams();
        Object.entries(filtros).forEach(([key, value]) => {
            if (value) params.append(key, value);
        });
        navigate(`/produtos?${params.toString()}`);
        setFiltroAberto(false);
    }

    function limparFiltros() {
        setFiltros({
            publico: "",
            faixaEtaria: "",
            tamanho: "",
            precoMin: "",
            precoMax: "",
        });
    }

    function toggleFiltro() {
        setFiltroAberto(!filtroAberto);
    }

    // Conta quantos filtros ativos
    const filtrosAtivos = Object.values(filtros).filter(v => v).length;

    return (
        <nav className="navbar">
            {/* TOPO - Logo, Busca e Ações */}
            <div className="navbar-top">
                <div className="navbar-container">
                    <button
                        className="menu-button"
                        onClick={() => setMenuAberto(true)}
                        aria-label="Abrir menu"
                    >
                        <TfiMenu className="menu-icon" />
                    </button>

                    <Link to="/" className="navbar-logo">
                        <img src={logo} alt="Sophie Baby Kids" className="logo" />
                    </Link>

                    {/* BARRA DE PESQUISA */}
                    <form className="search-form" onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="O que você está procurando?"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="search-input"
                        />
                        <button type="submit" className="search-button">
                            <FaSearch />
                        </button>
                    </form>

                    <div className="navbar-actions">
                        <Link to="/carrinho" className="cart-icon">
                            <FaShoppingCart />
                            {totalItems > 0 && (
                                <span className="cart-count">{totalItems}</span>
                            )}
                        </Link>

                        <div className="user-area">
                            {adminLogado ? (
                                <button
                                    className="user-button"
                                    onClick={() => setUsuarioMenuAberto(!usuarioMenuAberto)}
                                    aria-label="Abrir menu do usuário"
                                >
                                    <FaUserAlt className="user-icon" />
                                    <FaChevronDown
                                        className={`user-arrow ${usuarioMenuAberto ? "open" : ""}`}
                                    />
                                </button>
                            ) : (
                                <Link to="/login" className="user-button" aria-label="Entrar">
                                    <FaUserAlt className="user-icon" />
                                </Link>
                            )}

                            {adminLogado && usuarioMenuAberto && (
                                <div className="user-dropdown">
                                    <p>{adminEmail}</p>
                                    <button onClick={sair}>Sair</button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* BARRA DE CATEGORIAS + FILTRO */}
            <div className="navbar-categories">
                <div className="categories-container">
                    <ul className="categories-list">
                        {publicoCategorias.map((publico) => (
                            <li 
                                key={publico.id}
                                className="category-item has-subcategories"
                                onMouseEnter={() => handlePublicoHover(publico.id)}
                                onMouseLeave={handlePublicoLeave}
                            >
                                <Link 
                                    to={`/produtos?publico=${publico.id}`}
                                    className="category-link"
                                    onClick={fecharMenu}
                                >
                                    {publico.nome}
                                </Link>

                                {/* DROPDOWN COM TIPOS DE PECA */}
                                {publico.categorias.length > 0 && (
                                    <div className={`subcategories ${publicoAtivo === publico.id ? "active" : ""}`}>
                                        <div className="subcategories-container">
                                            <div className="subcategories-header">
                                                <span className="subcategories-title">{publico.nome}</span>
                                                <span className="subcategories-subtitle">Tipos de peca</span>
                                            </div>
                                            <div className="subcategories-grid">
                                                {publico.categorias.map((categoria) => (
                                                    <button
                                                        key={categoria.id}
                                                        className="subcategory-link"
                                                        onClick={() => handleCategoriaClick(publico.id, categoria.id)}
                                                    >
                                                        {categoria.nome}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>

                    {/* BOTÃO FILTRO NA BARRA DE CATEGORIAS */}
                    <div className="filter-wrapper">
                        <button 
                            className={`filter-nav-button ${filtrosAtivos > 0 ? "has-filters" : ""}`}
                            onClick={toggleFiltro}
                            aria-label="Abrir filtros"
                        >
                            <FaFilter />
                            <span>Filtrar</span>
                            {filtrosAtivos > 0 && (
                                <span className="filter-badge">{filtrosAtivos}</span>
                            )}
                        </button>

                        {/* DROPDOWN DE FILTROS */}
                        {filtroAberto && (
                            <div className="filter-dropdown">
                                <div className="filter-dropdown-header">
                                    <h4>Filtros</h4>
                                    <button onClick={limparFiltros} className="clear-filters-btn">
                                        <FaTimesCircle /> Limpar
                                    </button>
                                </div>

                                <div className="filter-dropdown-body">
                                    {/* Público */}
                                    <div className="filter-group">
                                        <label>Público</label>
                                        <select
                                            name="publico"
                                            value={filtros.publico}
                                            onChange={handleFiltroChange}
                                        >
                                            <option value="">Todos</option>
                                            <option value="U">Primeiros Passos</option>
                                            <option value="F">Meninas</option>
                                            <option value="M">Meninos</option>
                                            <option value="B">Bebês</option>
                                        </select>
                                    </div>

                                    {/* FAIXA ETÁRIA - AGORA COM OPÇÕES DOS PRODUTOS */}
                                    <div className="filter-group">
                                        <label>Faixa etária</label>
                                        <select
                                            name="faixaEtaria"
                                            value={filtros.faixaEtaria}
                                            onChange={handleFiltroChange}
                                        >
                                            <option value="">Todas</option>
                                            {faixasEtarias.map((faixa) => (
                                                <option key={faixa} value={faixa}>
                                                    {faixa}
                                                </option>
                                            ))}
                                        </select>
                                        {faixasEtarias.length === 0 && (
                                            <small style={{ color: '#999', fontSize: '12px' }}>
                                                Nenhuma faixa etária cadastrada
                                            </small>
                                        )}
                                    </div>

                                    {/* Tamanho */}
                                    <div className="filter-group">
                                        <label>Tamanho</label>
                                        <select
                                            name="tamanho"
                                            value={filtros.tamanho}
                                            onChange={handleFiltroChange}
                                        >
                                            <option value="">Todos</option>
                                            <option value="RN">RN</option>
                                            <option value="P">P</option>
                                            <option value="M">M</option>
                                            <option value="G">G</option>
                                            <option value="GG">GG</option>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="6">6</option>
                                            <option value="8">8</option>
                                            <option value="10">10</option>
                                            <option value="12">12</option>
                                            <option value="14">14</option>
                                            <option value="16">16</option>
                                        </select>
                                    </div>

                                    {/* Preço */}
                                    <div className="filter-group">
                                        <label>Preço</label>
                                        <div className="price-range">
                                            <input
                                                type="number"
                                                name="precoMin"
                                                placeholder="Min"
                                                value={filtros.precoMin}
                                                onChange={handleFiltroChange}
                                            />
                                            <span>até</span>
                                            <input
                                                type="number"
                                                name="precoMax"
                                                placeholder="Max"
                                                value={filtros.precoMax}
                                                onChange={handleFiltroChange}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="filter-dropdown-footer">
                                    <button onClick={aplicarFiltros} className="apply-filters-btn">
                                        Aplicar filtros
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* OVERLAY PARA FECHAR FILTRO */}
            {filtroAberto && (
                <div className="filter-overlay" onClick={() => setFiltroAberto(false)} />
            )}

            {/* OVERLAY MENU MOBILE */}
            <div
                className={`menu-overlay ${menuAberto ? "active" : ""}`}
                onClick={fecharMenu}
            />

            {/* MENU LATERAL */}
            <div className={`dropdown-menu ${menuAberto ? "open" : ""}`}>
                <div className="menu-header">
                    <h3>Menu</h3>
                    <button className="close-menu-button" onClick={fecharMenu} aria-label="Fechar menu">
                        <FaTimes />
                    </button>
                </div>

                {/* LINKS DO CLIENTE */}
                <div className="menu-section">
                    <h4 className="menu-section-title">Navegação</h4>
                    <Link to="/" onClick={fecharMenu}>
                        <FaHome className="menu-link-icon" /> Início
                    </Link>
                    <Link to="/produtos" onClick={fecharMenu}>
                        <FaStore className="menu-link-icon" /> Produtos
                    </Link>
                    <Link to="/contato" onClick={fecharMenu}>
                        <FaEnvelope className="menu-link-icon" /> Contato
                    </Link>
                </div>

                {/* CATEGORIAS NO MOBILE */}
                <div className="menu-divider" />
                <div className="menu-section">
                    <h4 className="menu-section-title">Categorias</h4>
                    {publicoCategorias.map((publico) => (
                        <div key={publico.id} className="mobile-category">
                            <Link
                                to={`/produtos?publico=${publico.id}`}
                                onClick={fecharMenu}
                                className="mobile-category-link"
                            >
                                {publico.nome}
                            </Link>
                            <div className="mobile-subcategories">
                                {publico.categorias.map((cat) => (
                                    <Link
                                        key={cat.id}
                                        to={`/produtos?publico=${publico.id}&categoria=${cat.slug}`}
                                        onClick={fecharMenu}
                                        className="mobile-subcategory-link"
                                    >
                                        {cat.nome}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* ADMINISTRACAO */}
                {adminLogado && (
                    <>
                        <div className="menu-divider" />
                        <div className="menu-section">
                            <h4 className="menu-section-title">Administração</h4>
                            <Link to="/dashboard" onClick={fecharMenu}>
                                <FaCog className="menu-link-icon" /> Painel administrativo
                            </Link>
                            <Link to="/produto/novo" onClick={fecharMenu}>
                                <FaBox className="menu-link-icon" /> Cadastrar produto
                            </Link>
                            <Link to="/gerenciar-produtos" onClick={fecharMenu}>
                                <FaStore className="menu-link-icon" /> Gerenciar produtos
                            </Link>
                            <Link to="/pedidos" onClick={fecharMenu}>
                                <FaBox className="menu-link-icon" /> Pedidos da loja
                            </Link>
                            <Link to="/gerenciar-banners" onClick={fecharMenu}>
                                <FaImage className="menu-link-icon" /> Gerenciar banners
                            </Link>
                        </div>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;