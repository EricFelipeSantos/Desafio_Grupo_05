import "./Checkout.css";

import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useCart } from "../../context/CartContext/CartContext" 

function Checkout() {
    const {
        cartItems,
        generateWhatsAppMessage
    } = useCart();

    const [formaPagamento, setFormaPagamento] =
        useState("");

    const total = cartItems.reduce(
        (total, item) =>
            total + item.preco * item.quantidade,
        0
    );

    function finalizarCompra(event) {
        event.preventDefault();

        if (!formaPagamento) {
            alert("Selecione uma forma de pagamento.");
            return;
        }

        const telefone = "5537999023869";

        const mensagem =
            generateWhatsAppMessage(formaPagamento);

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

            <main className="checkout-page">

                <section className="checkout-container">

                    <div className="checkout-header">

                        <h1>
                            Finalizar compra
                        </h1>

                        <p>
                            Confira seu pedido e escolha a forma de pagamento.
                        </p>

                    </div>

                    <div className="checkout-content">

                        <section className="checkout-section">

                            <h2>
                                Resumo do pedido
                            </h2>

                            <div className="checkout-products">

                                {cartItems.map((item) => (

                                    <div
                                        className="checkout-product"
                                        key={`${item.id}-${item.tamanho}-${item.cor?.nome}`}
                                    >

                                        <img
                                            src={item.imagem}
                                            alt={item.nome}
                                        />

                                        <div className="checkout-product-info">

                                            <h3>
                                                {item.nome}
                                            </h3>

                                            <p>
                                                Quantidade: {item.quantidade}
                                            </p>

                                            {item.tamanho && (
                                                <p>
                                                    Tamanho: {item.tamanho}
                                                </p>
                                            )}

                                            {item.cor && (
                                                <p>
                                                    Cor: {item.cor.nome}
                                                </p>
                                            )}

                                        </div>

                                        <strong>
                                            R$ {(
                                                item.preco *
                                                item.quantidade
                                            )
                                                .toFixed(2)
                                                .replace(".", ",")}
                                        </strong>

                                    </div>

                                ))}

                            </div>

                            <div className="checkout-total">

                                <span>
                                    Total
                                </span>

                                <strong>
                                    R$ {total
                                        .toFixed(2)
                                        .replace(".", ",")}
                                </strong>

                            </div>

                        </section>

                        <section className="checkout-section">

                            <h2>
                                Forma de pagamento
                            </h2>

                            <form
                                className="payment-form"
                                onSubmit={finalizarCompra}
                            >

                                <label className="payment-option">

                                    <input
                                        type="radio"
                                        name="pagamento"
                                        value="Pix"
                                        checked={
                                            formaPagamento === "Pix"
                                        }
                                        onChange={(event) =>
                                            setFormaPagamento(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <span>
                                        Pix
                                    </span>

                                </label>

                                <label className="payment-option">

                                    <input
                                        type="radio"
                                        name="pagamento"
                                        value="Cartão"
                                        checked={
                                            formaPagamento === "Cartão"
                                        }
                                        onChange={(event) =>
                                            setFormaPagamento(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <span>
                                        Cartão
                                    </span>

                                </label>

                                <label className="payment-option">

                                    <input
                                        type="radio"
                                        name="pagamento"
                                        value="Dinheiro"
                                        checked={
                                            formaPagamento === "Dinheiro"
                                        }
                                        onChange={(event) =>
                                            setFormaPagamento(
                                                event.target.value
                                            )
                                        }
                                    />

                                    <span>
                                        Dinheiro
                                    </span>

                                </label>

                                <button
                                    type="submit"
                                    className="finish-purchase-button"
                                >
                                    Finalizar compra
                                </button>

                            </form>

                        </section>

                    </div>

                </section>

            </main>

            <Footer />

        </>
    );
}

export default Checkout;