import "./Navbar.css";

import logo from "../../assets/logo.png";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useCart } from "../../context/CartContext/CartContext";

import { TfiMenu } from "react-icons/tfi";
import {
    FaUserAlt,
    FaTimes,
    FaShoppingCart,
    FaChevronDown
} from "react-icons/fa";

function Navbar() {
    const [menuAberto, setMenuAberto] = useState(false);
    const [usuarioMenuAberto, setUsuarioMenuAberto] = useState(false);

    const { cartItems } = useCart();

    const navigate = useNavigate();

    // ✅ Verifica se o admin está logado
    const adminLogado = localStorage.getItem("admin_logado") === "true";
    const adminEmail = localStorage.getItem("admin_email") || "Admin";

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantidade,
        0
    );

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

    return (
        <nav className="navbar">
            <div className="navbar-container">

                <button
                    className="menu-button"
                    onClick={() => setMenuAberto(true)}
                    aria-label="Abrir menu"
                >
                    <TfiMenu className="menu-icon" />
                </button>

                <Link
                    to="/"
                    className="navbar-logo"
                >
                    <img
                        src={logo}
                        alt="Sophie Baby Kids"
                        className="logo"
                    />
                </Link>

                <div className="navbar-actions">

                    <Link
                        to="/carrinho"
                        className="cart-icon"
                    >
                        <FaShoppingCart />

                        {totalItems > 0 && (
                            <span className="cart-count">
                                {totalItems}
                            </span>
                        )}
                    </Link>

                    <div className="user-area">

                        {adminLogado ? (
                            <button
                                className="user-button"
                                onClick={() =>
                                    setUsuarioMenuAberto(
                                        !usuarioMenuAberto
                                    )
                                }
                                aria-label="Abrir menu do usuário"
                            >
                                <FaUserAlt className="user-icon" />

                                <FaChevronDown
                                    className={`user-arrow ${
                                        usuarioMenuAberto
                                            ? "open"
                                            : ""
                                    }`}
                                />
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                className="user-button"
                                aria-label="Entrar"
                            >
                                <FaUserAlt className="user-icon" />
                            </Link>
                        )}

                        {adminLogado && usuarioMenuAberto && (
                            <div className="user-dropdown">
                                <p>{adminEmail}</p>
                                <button onClick={sair}>
                                    Sair
                                </button>
                            </div>
                        )}

                    </div>

                </div>

                <div
                    className={`menu-overlay ${
                        menuAberto
                            ? "active"
                            : ""
                    }`}
                    onClick={fecharMenu}
                />

                <div
                    className={`dropdown-menu ${
                        menuAberto
                            ? "open"
                            : ""
                    }`}
                >

                    <div className="menu-header">

                        <h3>
                            Menu
                        </h3>

                        <button
                            className="close-menu-button"
                            onClick={fecharMenu}
                            aria-label="Fechar menu"
                        >
                            <FaTimes />
                        </button>

                    </div>

                    <Link
                        to="/"
                        onClick={fecharMenu}
                    >
                        Início
                    </Link>

                    <Link
                        to="/produtos"
                        onClick={fecharMenu}
                    >
                        Produtos
                    </Link>

                    <Link
                        to="/contato"
                        onClick={fecharMenu}
                    >
                        Contato
                    </Link>

                    {adminLogado && (
                        <>
                            <div className="menu-divider" />

                            <h3 className="admin-title">
                                Administração
                            </h3>

                            <Link
                                to="/dashboard"
                                onClick={fecharMenu}
                            >
                                Painel administrativo
                            </Link>

                            <Link
                                to="/produto/novo"
                                onClick={fecharMenu}
                            >
                                Cadastrar produto
                            </Link>

                            <Link
                                to="/gerenciar-produtos"
                                onClick={fecharMenu}
                            >
                                Gerenciar produtos
                            </Link>

                            <Link
                                to="/pedidos"
                                onClick={fecharMenu}
                            >
                                Pedidos da loja
                            </Link>

                            <Link
                                to="/gerenciar-banners"
                                onClick={fecharMenu}
                            >
                                Gerenciar banners
                            </Link>
                        </>
                    )}

                </div>

            </div>
        </nav>
    );
}

export default Navbar;