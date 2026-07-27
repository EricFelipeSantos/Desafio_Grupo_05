import "./Checkout.css";

import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useCart } from "../../context/CartContext/CartContext";
import { useProducts } from "../../context/ProductContext/ProductContext";

import { FaUser, FaWhatsapp } from "react-icons/fa";

function Checkout() {
    const {
        cartItems,
        totalPrice,
        totalItems,
        getProductPrice,
        formatPrice,
        clearCart
    } = useCart();

    const { getImageUrl } = useProducts();

    const [formaPagamento, setFormaPagamento] = useState("");
    const [cliente, setCliente] = useState({
        nome: "",
        telefone: "",
        endereco: "",
        observacoes: ""
    });

    const [erros, setErros] = useState({});

    function handleClienteChange(event) {
        const { name, value } = event.target;
        setCliente(prev => ({
            ...prev,
            [name]: value
        }));
        if (erros[name]) {
            setErros(prev => ({
                ...prev,
                [name]: ""
            }));
        }
    }

    function validarFormulario() {
        const novosErros = {};

        if (!cliente.nome.trim()) {
            novosErros.nome = "Nome é obrigatório";
        }

        if (!cliente.telefone.trim()) {
            novosErros.telefone = "Telefone é obrigatório";
        } else if (cliente.telefone.replace(/\D/g, "").length < 10) {
            novosErros.telefone = "Telefone inválido (mínimo 10 dígitos)";
        }

        if (!cliente.endereco.trim()) {
            novosErros.endereco = "Endereço é obrigatório";
        }

        if (!formaPagamento) {
            novosErros.formaPagamento = "Selecione uma forma de pagamento";
        }

        setErros(novosErros);
        return Object.keys(novosErros).length === 0;
    }

    function finalizarCompra(event) {
        event.preventDefault();

        if (!validarFormulario()) {
            return;
        }

        const telefone = "5537999023869";

        let mensagem = `*NOVO PEDIDO - CLIENTE IDENTIFICADO*\n\n`;
        mensagem += `*Cliente:* ${cliente.nome}\n`;
        mensagem += `*Telefone:* ${cliente.telefone}\n`;
        mensagem += `*Endereço:* ${cliente.endereco}\n`;
        
        if (cliente.observacoes) {
            mensagem += `*Observações:* ${cliente.observacoes}\n`;
        }
        
        mensagem += `\n*Pedido:*\n`;

        cartItems.forEach((item, index) => {
            const precoProduto = getProductPrice(item);
            const subtotal = precoProduto * item.quantidade;
            
            mensagem += `\n${index + 1}. *${item.nome}*\n`;
            mensagem += `   Quantidade: ${item.quantidade}\n`;
            mensagem += `   Tamanho: ${item.tamanho}\n`;
            mensagem += `   Cor: ${item.cor?.nome || "Não especificada"}\n`;
            mensagem += `   Preço unitário: ${formatPrice(precoProduto)}\n`;
            mensagem += `   Subtotal: ${formatPrice(subtotal)}\n`;
        });

        mensagem += `\n*Total: ${formatPrice(totalPrice)}*\n`;
        mensagem += `*Forma de pagamento:* ${formaPagamento}\n\n`;
        mensagem += `Aguardo a confirmação do pedido.\nObrigado(a)!`;

        const whatsappUrl = `https://wa.me/${telefone}?text=${encodeURIComponent(mensagem)}`;

        window.open(whatsappUrl, "_blank");
        clearCart();

        const produtosComImagem = cartItems.map(item => {
            let imagemUrl = null;
            
            if (item.imagem) {
                if (typeof item.imagem === "string") {
                    if (item.imagem.startsWith("http")) {
                        imagemUrl = item.imagem;
                    } else {
                        imagemUrl = getImageUrl(item.imagem);
                    }
                } else if (typeof item.imagem === "object" && item.imagem.imagem) {
                    imagemUrl = getImageUrl(item.imagem.imagem);
                }
            }
            
            if (!imagemUrl && item.imagem_url) {
                imagemUrl = item.imagem_url;
            }

            console.log(`Produto ${item.nome}: imagem =`, imagemUrl);

            return {
                id: item.id,
                nome: item.nome,
                quantidade: item.quantidade,
                tamanho: item.tamanho,
                cor: item.cor,
                preco: getProductPrice(item),
                imagem: imagemUrl
            };
        });

        const pedidosSalvos = JSON.parse(localStorage.getItem("pedidos")) || [];
        const novoId = pedidosSalvos.length > 0 
            ? Math.max(...pedidosSalvos.map(p => p.id)) + 1 
            : 1;

        const pedido = {
            id: novoId,
            data: new Date().toLocaleString(),
            cliente: {
                nome: cliente.nome,
                telefone: cliente.telefone,
                endereco: cliente.endereco
            },
            produtos: produtosComImagem,
            total: totalPrice,
            formaPagamento: formaPagamento,
            status: "Pendente"
        };

        console.log("=== PEDIDO SALVO ===");
        console.log("Pedido ID:", pedido.id);
        console.log("Produtos:", pedido.produtos);

        pedidosSalvos.push(pedido);
        localStorage.setItem("pedidos", JSON.stringify(pedidosSalvos));

        setTimeout(() => {
            window.location.href = "/pedido-confirmado";
        }, 1500);
    }

    if (cartItems.length === 0) {
        return (
            <>
                <Navbar />
                <main className="checkout-page">
                    <section className="checkout-container">
                        <div className="checkout-header">
                            <h1>Finalizar compra</h1>
                            <p>Confira seu pedido e escolha a forma de pagamento.</p>
                        </div>
                        <div className="empty-cart">
                            <h2>Seu carrinho está vazio</h2>
                            <p>Adicione produtos antes de finalizar a compra.</p>
                        </div>
                    </section>
                </main>
                <Footer />
            </>
        );
    }

    const pagamentos = ["Pix", "Cartão de crédito", "Cartão de débito", "Dinheiro"];

    return (
        <>
            <Navbar />

            <main className="checkout-page">
                <section className="checkout-container">
                    <div className="checkout-header">
                        <h1>Finalizar compra</h1>
                        <p>Preencha seus dados e confirme o pedido.</p>
                    </div>

                    <div className="checkout-content">
                        <div className="checkout-sections">
                            <section className="checkout-section">
                                <h2><FaUser /> Dados do Cliente</h2>

                                <form className="cliente-form">
                                    <div className="form-group">
                                        <label htmlFor="nome">Nome completo *</label>
                                        <input
                                            type="text"
                                            id="nome"
                                            name="nome"
                                            placeholder="Digite seu nome completo"
                                            value={cliente.nome}
                                            onChange={handleClienteChange}
                                            className={erros.nome ? "error" : ""}
                                        />
                                        {erros.nome && <span className="error-message">{erros.nome}</span>}
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="telefone">Telefone *</label>
                                        <input
                                            type="tel"
                                            id="telefone"
                                            name="telefone"
                                            placeholder="(00) 00000-0000"
                                            value={cliente.telefone}
                                            onChange={handleClienteChange}
                                            className={erros.telefone ? "error" : ""}
                                        />
                                        {erros.telefone && <span className="error-message">{erros.telefone}</span>}
                                        <small>Número com DDD para contato</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="endereco">Endereço *</label>
                                        <input
                                            type="text"
                                            id="endereco"
                                            name="endereco"
                                            placeholder="Rua, número, bairro, cidade"
                                            value={cliente.endereco}
                                            onChange={handleClienteChange}
                                            className={erros.endereco ? "error" : ""}
                                        />
                                        {erros.endereco && <span className="error-message">{erros.endereco}</span>}
                                        <small>Endereço para entrega</small>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="observacoes">Observações</label>
                                        <textarea
                                            id="observacoes"
                                            name="observacoes"
                                            placeholder="Alguma observação sobre o pedido? (opcional)"
                                            value={cliente.observacoes}
                                            onChange={handleClienteChange}
                                            rows="3"
                                        />
                                    </div>
                                </form>
                            </section>

                            <section className="checkout-section">
                                <h2>Resumo do pedido</h2>

                                <div className="checkout-products">
                                    {cartItems.map((item) => {
                                        const imagemProduto = getImageUrl(item.imagem);
                                        const precoProduto = getProductPrice(item);
                                        const subtotal = precoProduto * item.quantidade;

                                        return (
                                            <div
                                                className="checkout-product"
                                                key={`${item.id}-${item.tamanho}-${item.cor?.nome || ""}`}
                                            >
                                                {imagemProduto ? (
                                                    <img
                                                        src={imagemProduto}
                                                        alt={item.nome}
                                                        loading="lazy"
                                                    />
                                                ) : (
                                                    <div className="checkout-product-placeholder">
                                                        <span>Sem imagem</span>
                                                    </div>
                                                )}

                                                <div className="checkout-product-info">
                                                    <h3>{item.nome}</h3>
                                                    <p>Quantidade: {item.quantidade}</p>
                                                    {item.tamanho && <p>Tamanho: {item.tamanho}</p>}
                                                    {item.cor && (
                                                        <p>
                                                            Cor: 
                                                            <span 
                                                                className="color-dot"
                                                                style={{ backgroundColor: item.cor.codigo }}
                                                            />
                                                            {item.cor.nome}
                                                        </p>
                                                    )}
                                                    <p className="checkout-product-price">
                                                        {formatPrice(precoProduto)} cada
                                                    </p>
                                                </div>

                                                <strong className="checkout-product-subtotal">
                                                    {formatPrice(subtotal)}
                                                </strong>
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="checkout-total">
                                    <span>Total ({totalItems} {totalItems === 1 ? "item" : "itens"})</span>
                                    <strong>{formatPrice(totalPrice)}</strong>
                                </div>
                            </section>

                            <section className="checkout-section">
                                <h2>Forma de pagamento</h2>

                                <form className="payment-form">
                                    {pagamentos.map(pgto => (
                                        <label key={pgto} className={`payment-option ${erros.formaPagamento ? "error" : ""}`}>
                                            <input
                                                type="radio"
                                                name="pagamento"
                                                value={pgto}
                                                checked={formaPagamento === pgto}
                                                onChange={(e) => {
                                                    setFormaPagamento(e.target.value);
                                                    if (erros.formaPagamento) {
                                                        setErros(prev => ({ ...prev, formaPagamento: "" }));
                                                    }
                                                }}
                                            />
                                            <span>{pgto}</span>
                                        </label>
                                    ))}

                                    {erros.formaPagamento && (
                                        <span className="error-message">{erros.formaPagamento}</span>
                                    )}

                                    <button
                                        type="button"
                                        className="finish-purchase-button"
                                        onClick={finalizarCompra}
                                    >
                                        <FaWhatsapp /> Finalizar compra pelo WhatsApp
                                    </button>
                                </form>
                            </section>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Checkout;