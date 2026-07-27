import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            try {
                return JSON.parse(savedCart);
            } catch (error) {
                console.error('Erro ao carregar carrinho:', error);
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

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
                            quantidade: item.quantidade + (product.quantidade || 1)
                        }
                        : item
                );
            }

            return [
                ...currentItems,
                {
                    ...product,
                    quantidade: product.quantidade || 1
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

    function getProductPrice(item) {
        if (
            item.em_promocao &&
            item.preco_promocional &&
            Number(item.preco_promocional) < Number(item.preco)
        ) {
            return Number(item.preco_promocional);
        }
        return Number(item.preco);
    }

    const totalItems = cartItems.reduce(
        (total, item) => total + item.quantidade,
        0
    );

    const totalPrice = cartItems.reduce(
        (total, item) => total + getProductPrice(item) * item.quantidade,
        0
    );

    function clearCart() {
        setCartItems([]);
    }

    function generateWhatsAppMessage(formaPagamento) {
        if (cartItems.length === 0) {
            return "";
        }

        const linhas = [
            "*NOVO PEDIDO*",
            "",
            "*Produtos:*",
            ""
        ];

        cartItems.forEach((item, index) => {
            const precoProduto = getProductPrice(item);
            const subtotal = precoProduto * item.quantidade;
            
            linhas.push(`${index + 1}. *${item.nome}*`);
            linhas.push(`   Quantidade: ${item.quantidade}`);
            linhas.push(`   Tamanho: ${item.tamanho}`);
            linhas.push(`   Cor: ${item.cor?.nome || "Não especificada"}`);
            linhas.push(`   Preço unitário: ${formatPrice(precoProduto)}`);
            linhas.push(`   Subtotal: ${formatPrice(subtotal)}`);
            linhas.push("");
        });

        linhas.push(`*Total do Pedido:* ${formatPrice(totalPrice)}`);
        linhas.push(`*Forma de pagamento:* ${formaPagamento}`);
        linhas.push("");
        linhas.push("Aguardo a confirmação do pedido.");
        linhas.push("Obrigado(a)!");

        const mensagem = linhas.join("\n");
        return encodeURIComponent(mensagem);
    }

    function formatPrice(value) {
        return value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }

    const isCartEmpty = cartItems.length === 0;

    return (
        <CartContext.Provider
            value={{
                cartItems,
                totalItems,
                totalPrice,
                isCartEmpty,
                addToCart,
                removeFromCart,
                increaseQuantity,
                decreaseQuantity,
                clearCart,
                generateWhatsAppMessage,
                getProductPrice,
                formatPrice
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
}