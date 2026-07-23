import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState([]);

    function addToCart(product) {
        setCartItems((currentItems) => {
            const existingProduct = currentItems.find(
                (item) =>
                    item.id === product.id &&
                    item.tamanho === product.tamanho &&
                    item.cor?.nome === product.cor?.nome
            );

            if (existingProduct) {
                return currentItems.map((item) =>
                    item.id === product.id &&
                    item.tamanho === product.tamanho &&
                    item.cor?.nome === product.cor?.nome
                        ? {
                            ...item,
                            quantidade: item.quantidade + 1
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantidade: 1
                }
            ];
        });
    }

    function removeFromCart(productId, tamanho, cor) {
        setCartItems((currentItems) =>
            currentItems.filter(
                (item) =>
                    !(
                        item.id === productId &&
                        item.tamanho === tamanho &&
                        item.cor?.nome === cor?.nome
                    )
            )
        );
    }

    function increaseQuantity(productId, tamanho, cor) {
        setCartItems((currentItems) =>
            currentItems.map((item) =>
                item.id === productId &&
                item.tamanho === tamanho &&
                item.cor?.nome === cor?.nome
                    ? {
                        ...item,
                        quantidade: item.quantidade + 1
                    }
                    : item
            )
        );
    }

    function decreaseQuantity(productId, tamanho, cor) {
        setCartItems((currentItems) =>
            currentItems
                .map((item) =>
                    item.id === productId &&
                    item.tamanho === tamanho &&
                    item.cor?.nome === cor?.nome
                        ? {
                            ...item,
                            quantidade: item.quantidade - 1
                        }
                        : item
                )
                .filter((item) => item.quantidade > 0)
        );
    }

    const totalItems = cartItems.reduce(
        (total, item) =>
            total + item.quantidade,
        0
    );

    function generateWhatsAppMessage(formaPagamento) {
        let message =
            "Olá! Gostaria de fazer um pedido.%0A%0A";

        message +=
            "*PEDIDO*%0A";

        cartItems.forEach((item) => {
            message +=
                `• ${item.nome}%0A`;

            message +=
                `Quantidade: ${item.quantidade}%0A`;

            message +=
                `Tamanho: ${item.tamanho}%0A`;

            message +=
                `Cor: ${item.cor?.nome || ""}%0A`;

            const subtotal =
                item.preco *
                item.quantidade;

            const subtotalFormatado =
                subtotal.toLocaleString(
                    "pt-BR",
                    {
                        style: "currency",
                        currency: "BRL"
                    }
                );

            message +=
                `Subtotal: ${subtotalFormatado}%0A%0A`;
        });

        const total = cartItems.reduce(
            (total, item) =>
                total +
                item.preco *
                item.quantidade,
            0
        );

        const totalFormatado =
            total.toLocaleString(
                "pt-BR",
                {
                    style: "currency",
                    currency: "BRL"
                }
            );

        message +=
            `*Total: ${totalFormatado}*%0A`;

        message +=
            `Forma de pagamento: ${formaPagamento}%0A%0A`;

        message +=
            "Aguardo a confirmação do pedido. Obrigado(a)!";

        return message;
    }

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalItems,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                generateWhatsAppMessage
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    return useContext(CartContext);
}