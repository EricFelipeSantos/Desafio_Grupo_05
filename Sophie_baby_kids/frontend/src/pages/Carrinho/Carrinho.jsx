import "./Carrinho.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext/CartContext";

import { FaTrash, FaMinus, FaPlus } from "react-icons/fa";

function Carrinho() {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        generateWhatsAppMessage
    } = useCart();

    const total = cartItems.reduce(
        (total, item) =>
            total + item.preco * item.quantidade,
        0
    );

    function formatarPreco(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    function finalizarCompra() {
        const telefone = "5537999023869";

        const mensagem = generateWhatsAppMessage();

        const whatsappUrl =
            `https://wa.me/${telefone}?text=${mensagem}`;

        window.open(
            whatsappUrl,
            "_blank"
        );
    }
    return (
        <>
            <Navbar />

            <main className="cart-page">
                <div className="cart-container">
                    <div className="cart-header">
                        <h1>
                            Meu Carrinho
                        </h1>

                        <p>
                            Confira os produtos selecionados antes de finalizar sua compra.
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <h2>
                                Seu carrinho está vazio
                            </h2>

                            <p>
                                Adicione produtos para começar sua compra.
                            </p>
                        </div>
                    ) : (
                        <div className="cart-content">
                            <section className="cart-products">
                                {cartItems.map((item) => (
                                    <article
                                        className="cart-item"
                                        key={`${item.id}-${item.tamanho}-${item.cor?.nome}`}
                                    >
                                        <img
                                            src={item.imagem}
                                            alt={item.nome}
                                        />

                                        <div className="cart-item-info">
                                            <h2>
                                                {item.nome}
                                            </h2>

                                            <p className="cart-item-price">
                                                {formatarPreco(item.preco)}
                                            </p>

                                            <p>
                                                Tamanho: {item.tamanho}
                                            </p>

                                            <p>
                                                Cor: {item.cor?.nome}
                                            </p>

                                            <div className="quantity-control">
                                                <button
                                                    onClick={() =>
                                                        decreaseQuantity(
                                                            item.id,
                                                            item.tamanho,
                                                            item.cor
                                                        )
                                                    }
                                                >
                                                    <FaMinus />
                                                </button>

                                                <span>
                                                    {item.quantidade}
                                                </span>

                                                <button
                                                    onClick={() =>
                                                        increaseQuantity(
                                                            item.id,
                                                            item.tamanho,
                                                            item.cor
                                                        )
                                                    }
                                                >
                                                    <FaPlus />
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            className="remove-item"
                                            onClick={() =>
                                                removeFromCart(
                                                    item.id,
                                                    item.tamanho,
                                                    item.cor
                                                )
                                            }
                                        >
                                            <FaTrash />
                                        </button>
                                    </article>
                                ))}
                            </section>

                            <aside className="cart-summary">
                                <h2>
                                    Resumo da compra
                                </h2>

                                <div className="summary-line">
                                    <span>
                                        Produtos
                                    </span>

                                    <span>
                                        {formatarPreco(total)}
                                    </span>
                                </div>

                                <div className="summary-line">
                                    <span>
                                        Frete
                                    </span>

                                    <span>
                                        A calcular
                                    </span>
                                </div>

                                <div className="summary-total">
                                    <span>
                                        Total
                                    </span>

                                    <strong>
                                        {formatarPreco(total)}
                                    </strong>
                                </div>

                                <Link 
                                    className="checkout-button"
                                    to="/checkout"    
                                >
                                    Finalizar compra
                                </Link>
                            </aside>
                        </div>
                    )}
                </div>
            </main>

            <Footer />
        </>
    );
}

export default Carrinho;