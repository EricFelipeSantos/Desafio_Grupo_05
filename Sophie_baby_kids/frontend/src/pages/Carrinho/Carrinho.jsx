import "./Carrinho.css";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { Link } from "react-router-dom";

import { useCart } from "../../context/CartContext/CartContext";
import { useProducts } from "../../context/ProductContext/ProductContext"; 

import { FaTrash, FaMinus, FaPlus, FaShoppingCart } from "react-icons/fa";

import { isCorColorido, getCorStyle, getCorClass } from "../../utils/colorUtils";

function Carrinho() {
    const {
        cartItems,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        totalItems,
        totalPrice, 
        getProductPrice, 
        formatPrice 
    } = useCart();

    const { getImageUrl } = useProducts();

    function obterImagem(imagem) {
        if (!imagem) return null;
        
        if (typeof imagem === "object" && imagem.imagem) {
            return getImageUrl(imagem.imagem);
        }
        
        if (typeof imagem === "string") {
            return getImageUrl(imagem);
        }
        
        return null;
    }

    function getItemSubtotal(item) {
        const preco = getProductPrice(item);
        return preco * item.quantidade;
    }

    return (
        <>
            <Navbar />

            <main className="cart-page">
                <div className="cart-container">
                    <div className="cart-header">
                        <h1>
                            <FaShoppingCart /> Meu Carrinho
                        </h1>

                        <p>
                            Confira os produtos selecionados antes de finalizar sua compra.
                        </p>
                    </div>

                    {cartItems.length === 0 ? (
                        <div className="empty-cart">
                            <h2>Seu carrinho está vazio</h2>
                            <p>Adicione produtos para começar sua compra.</p>
                            
                            <Link to="/produtos" className="continue-shopping">
                                Continuar comprando
                            </Link>
                        </div>
                    ) : (
                        <div className="cart-content">
                            <section className="cart-products">
                                {cartItems.map((item) => {
                                    const imagemProduto = obterImagem(item.imagem);
                                    const precoProduto = getProductPrice(item);
                                    const subtotal = getItemSubtotal(item);

                                    return (
                                        <article
                                            className="cart-item"
                                            key={`${item.id}-${item.tamanho}-${item.cor?.nome || ""}`}
                                        >
                                            {imagemProduto ? (
                                                <img
                                                    src={imagemProduto}
                                                    alt={item.nome}
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <div className="cart-item-placeholder">
                                                    <FaShoppingCart />
                                                </div>
                                            )}

                                            <div className="cart-item-info">
                                                <h2>{item.nome}</h2>

                                                <div className="cart-item-prices">
                                                    {item.em_promocao && item.preco_promocional && (
                                                        <span className="original-price">
                                                            {formatPrice(item.preco)}
                                                        </span>
                                                    )}
                                                    <p className="cart-item-price">
                                                        {formatPrice(precoProduto)}
                                                    </p>
                                                </div>

                                                {item.tamanho && (
                                                    <p className="item-detail">
                                                        <strong>Tamanho:</strong> {item.tamanho}
                                                    </p>
                                                )}

                                                {item.cor && (
                                                    <p className="item-detail">
                                                        <strong>Cor:</strong> 
                                                        <span 
                                                            className={`color-dot ${getCorClass(item.cor)}`}
                                                            style={getCorStyle(item.cor)}
                                                        />
                                                        {item.cor.nome}
                                                    </p>
                                                )}

                                                <div className="quantity-control">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            decreaseQuantity(
                                                                item.id,
                                                                item.tamanho,
                                                                item.cor
                                                            )
                                                        }
                                                        disabled={item.quantidade <= 1}
                                                    >
                                                        <FaMinus />
                                                    </button>

                                                    <span>{item.quantidade}</span>

                                                    <button
                                                        type="button"
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

                                                <p className="item-subtotal">
                                                    Subtotal: {formatPrice(subtotal)}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                className="remove-item"
                                                onClick={() =>
                                                    removeFromCart(
                                                        item.id,
                                                        item.tamanho,
                                                        item.cor
                                                    )
                                                }
                                                title="Remover item"
                                            >
                                                <FaTrash />
                                            </button>
                                        </article>
                                    );
                                })}
                            </section>

                            <aside className="cart-summary">
                                <h2>Resumo da compra</h2>

                                <div className="summary-line">
                                    <span>
                                        Produtos ({totalItems} {totalItems === 1 ? "item" : "itens"})
                                    </span>
                                    <span>{formatPrice(totalPrice)}</span>
                                </div>

                                <div className="summary-line">
                                    <span>Frete</span>
                                    <span>A calcular</span>
                                </div>

                                {cartItems.some(item => item.em_promocao) && (
                                    <div className="summary-line discount">
                                        <span>Descontos</span>
                                        <span>
                                            -{formatPrice(
                                                cartItems.reduce((total, item) => {
                                                    if (item.em_promocao && item.preco_promocional) {
                                                        const desconto = (Number(item.preco) - Number(item.preco_promocional)) * item.quantidade;
                                                        return total + desconto;
                                                    }
                                                    return total;
                                                }, 0)
                                            )}
                                        </span>
                                    </div>
                                )}

                                <div className="summary-divider" />

                                <div className="summary-total">
                                    <span>Total</span>
                                    <strong>{formatPrice(totalPrice)}</strong>
                                </div>

                                <Link
                                    className="checkout-button"
                                    to="/checkout"
                                >
                                    Finalizar compra
                                </Link>

                                <Link
                                    className="continue-shopping-link"
                                    to="/produtos"
                                >
                                    Continuar comprando
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