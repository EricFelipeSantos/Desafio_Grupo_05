import "../ProductInfo/ProductInfo.css";

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext/CartContext";
import { 
    FaWhatsapp, 
    FaCreditCard, 
    FaBarcode,
    FaChevronDown,
    FaChevronRight,
    FaTags,
} from "react-icons/fa";
import { BiSolidDiscount } from "react-icons/bi";
import { SiPix } from "react-icons/si";
import formatPrice from "../../utils/FormatPrice";
import { useProducts } from "../../context/ProductContext/ProductContext";

function ProductInfo({
    id,
    nome,
    preco,
    precoPromocional,
    emPromocao,
    imagem,
    imagens = [],
    categoria,
    descricao,
    faixaEtaria,
    material,
    cores = [],
    tamanhos = [],
    precoPix = null,
    precoBoleto = null,
    parcelas = null,
    jurosParcelas = null
}) {
    const { getImageUrl } = useProducts();
    const { addToCart } = useCart();

    const estaEmPromocao =
        emPromocao &&
        precoPromocional &&
        Number(precoPromocional) < Number(preco);

    const [corSelecionada, setCorSelecionada] = useState(null);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);
    const [mostrarFormasPagamento, setMostrarFormasPagamento] = useState(false);

    const imagensProduto = imagens.length > 0 
        ? imagens.map((img) => getImageUrl(img.imagem)).filter(Boolean)
        : imagem 
            ? [getImageUrl(imagem)] 
            : [];

    const [imagemSelecionada, setImagemSelecionada] = useState(null);

    const precoExibido = estaEmPromocao ? Number(precoPromocional) : Number(preco);
    
    const precoOriginal = Number(preco);
    
    const precoPixExibido = precoPix ? Number(precoPix) : (precoOriginal * 0.95);
    
    // usa o valor de parcelas do produto
    const parcelasExibidas = Number(parcelas) || 1;
    const juros = Number(jurosParcelas) || 0;

    // calcula as parcelas com base no preco original
    const calcularValorParcela = (precoBase, numParcelas, taxaJuros) => {
        if (!precoBase || !numParcelas || numParcelas === 0) return 0;
        const precoBaseNumber = Number(precoBase);
        const numParcelasNumber = Number(numParcelas);
        const taxaJurosNumber = Number(taxaJuros) || 0;
        if (taxaJurosNumber === 0) {
            return precoBaseNumber / numParcelasNumber;
        }
        return (precoBaseNumber * (1 + taxaJurosNumber / 100)) / numParcelasNumber;
    };

    const valorParcelaExibido = calcularValorParcela(precoOriginal, parcelasExibidas, juros);

    // gera as opcoes de parcela com base no preco original
    const opcoesParcelas = [];
    for (let i = 1; i <= parcelasExibidas; i++) {
        opcoesParcelas.push({
            parcelas: i,
            valor: calcularValorParcela(precoOriginal, i, juros)
        });
    }

    useEffect(() => {
        if (imagensProduto.length > 0) {
            setImagemSelecionada(imagensProduto[0]);
        }
    }, [id]);

    useEffect(() => {
        if (cores && cores.length > 0 && !corSelecionada) {
            setCorSelecionada(cores[0]);
        }
    }, [cores]);

    useEffect(() => {
        if (tamanhos && tamanhos.length > 0 && !tamanhoSelecionado) {
            setTamanhoSelecionado(tamanhos[0]);
        }
    }, [tamanhos]);

    function selecionarImagem(url) {
        setImagemSelecionada(url);
    }

    function handleAddToCart() {
        if (!corSelecionada) {
            alert("Selecione uma cor.");
            return;
        }

        if (!tamanhoSelecionado) {
            alert("Selecione um tamanho.");
            return;
        }

        const nomeTamanho = typeof tamanhoSelecionado === 'string' 
            ? tamanhoSelecionado 
            : tamanhoSelecionado.nome;

        const imagemCarrinho = imagemSelecionada || imagensProduto[0] || null;

        addToCart({
            id,
            nome,
            preco: precoExibido,
            precoOriginal: precoOriginal,
            emPromocao: estaEmPromocao,
            imagem: imagemCarrinho,
            categoria: categoria?.nome || categoria,
            cor: corSelecionada,
            tamanho: nomeTamanho,
            precoPix: precoPixExibido,
            parcelas: parcelasExibidas,
            jurosParcelas: juros
        });

        alert("Produto adicionado ao carrinho!");
    }

    function comprarWhatsApp() {
        if (!corSelecionada) {
            alert("Selecione uma cor.");
            return;
        }

        if (!tamanhoSelecionado) {
            alert("Selecione um tamanho.");
            return;
        }

        const numeroWhatsApp = "5537999023869";
        const nomeTamanho = typeof tamanhoSelecionado === 'string' 
            ? tamanhoSelecionado 
            : tamanhoSelecionado.nome;

        const linhas = [
            "Olá! Gostaria de comprar este produto:",
            "",
            "*Produto:* " + nome,
            "*Preço à vista (PIX):* " + formatPrice(precoPixExibido),
            "*Parcelado:* até " + parcelasExibidas + "x de " + formatPrice(valorParcelaExibido),
            "*Cor:* " + corSelecionada.nome,
            "*Tamanho:* " + nomeTamanho,
            "",
            "Aguardo a confirmação. Obrigado(a)!"
        ];

        const mensagem = linhas.join("\n");
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
    }

    // funcao para verificar se a cor é colorido
    function isCorColorido(cor) {
        return cor.nome === "Colorido" || cor.nome === "colorido";
    }

    // funcao para obter estilo da cor
    function getCorStyle(cor) {
        if (isCorColorido(cor)) {
            return { 
                background: "conic-gradient(red, orange, yellow, green, blue, indigo, violet)"
            };
        }
        return { backgroundColor: cor.codigo };
    }

    return (
        <section className="product-info">
            <div className="product-gallery">
                <div className="main-product-image">
                    {imagemSelecionada ? (
                        <img 
                            src={imagemSelecionada} 
                            alt={nome}
                            key={imagemSelecionada}
                        />
                    ) : (
                        <div className="placeholder-image">Sem imagem</div>
                    )}
                </div>

                {imagensProduto.length > 1 && (
                    <div className="product-thumbnails">
                        {imagensProduto.map((imgUrl, index) => (
                            <button
                                key={index}
                                type="button"
                                className={
                                    imagemSelecionada === imgUrl
                                        ? "thumbnail active"
                                        : "thumbnail"
                                }
                                onClick={() => selecionarImagem(imgUrl)}
                            >
                                <img 
                                    src={imgUrl} 
                                    alt={`${nome} ${index + 1}`}
                                />
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <div className="product-details-content">
                <span className="product-category">
                    {typeof categoria === 'string' ? categoria : categoria?.nome}
                </span>

                <h1>{nome}</h1>

                {estaEmPromocao ? (
                    <div className="product-detail-promotion">
                        <span className="product-original-price">
                            {formatPrice(preco)}
                        </span>
                        <h2 className="product-price">
                            {formatPrice(precoPromocional)}
                        </h2>
                        <span className="promotion-label">
                            <BiSolidDiscount /> OFERTA
                        </span>
                    </div>
                ) : (
                    <h2 className="product-price">{formatPrice(preco)}</h2>
                )}

                <div className="product-payment-info">
                    <div className="payment-row">
                        <span className="pix-price">
                            <SiPix /> {formatPrice(precoPixExibido)} no PIX
                        </span>
                    </div>
                    <div className="payment-row">
                        <span className="installment-info">
                            <FaCreditCard /> ou até {parcelasExibidas}x de {formatPrice(valorParcelaExibido)}
                            {juros > 0 && ` (com ${juros}% de juros)`}
                        </span>
                    </div>
                    <button 
                        className="payment-methods-button"
                        onClick={() => setMostrarFormasPagamento(!mostrarFormasPagamento)}
                    >
                        {mostrarFormasPagamento ? <FaChevronDown /> : <FaChevronRight />} 
                        Formas de pagamento
                    </button>
                    
                    {mostrarFormasPagamento && (
                        <div className="payment-methods-detail">
                            <p>
                                <FaBarcode style={{ color: '#6c5ce7' }} /> 
                                <strong>Boleto:</strong> {formatPrice(precoBoleto)} (à vista)
                            </p>
                            <div className="all-installments">
                                <strong><FaTags /> Todas as opções de parcelas:</strong>
                                <div className="installments-grid">
                                    {opcoesParcelas.map((op, index) => (
                                        <span key={index} className="installment-option">
                                            {op.parcelas}x de {formatPrice(op.valor)}
                                            {op.parcelas === 1 && " (à vista)"}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {cores && cores.length > 0 && (
                    <div className="product-option-section">
                        <h3>Cor</h3>
                        <div className="colors">
                            {cores.map((cor) => {
                                const isSelected = corSelecionada?.nome === cor.nome;
                                const isColorido = isCorColorido(cor);
                                
                                return (
                                    <button
                                        key={cor.nome}
                                        type="button"
                                        className={`color ${isSelected ? "selected" : ""} ${isColorido ? "colorido" : ""}`}
                                        style={getCorStyle(cor)}
                                        title={cor.nome}
                                        onClick={() => setCorSelecionada(cor)}
                                    />
                                );
                            })}
                        </div>
                        {corSelecionada && (
                            <span className="selected-option">
                                Cor selecionada: {corSelecionada.nome}
                            </span>
                        )}
                    </div>
                )}

                {tamanhos && tamanhos.length > 0 && (
                    <div className="product-option-section">
                        <h3>Tamanho</h3>
                        <div className="sizes">
                            {tamanhos.map((tamanho) => {
                                const nomeTamanho = typeof tamanho === 'string' 
                                    ? tamanho 
                                    : tamanho.nome;
                                const isSelected = typeof tamanhoSelecionado === 'string'
                                    ? tamanhoSelecionado === nomeTamanho
                                    : tamanhoSelecionado?.nome === nomeTamanho;

                                return (
                                    <button
                                        key={nomeTamanho}
                                        type="button"
                                        className={isSelected ? "selected" : ""}
                                        onClick={() => setTamanhoSelecionado(tamanho)}
                                    >
                                        {nomeTamanho}
                                    </button>
                                );
                            })}
                        </div>
                        {tamanhoSelecionado && (
                            <span className="selected-option">
                                Tamanho selecionado:{" "}
                                {typeof tamanhoSelecionado === 'string' 
                                    ? tamanhoSelecionado 
                                    : tamanhoSelecionado.nome}
                            </span>
                        )}
                        <p className="stock">
                            Em estoque
                        </p>
                    </div>
                )}

                <div className="product-description">
                    <h3>Descrição</h3>
                    <p>{descricao}</p>

                    <div className="product-information">
                        {faixaEtaria && (
                            <div>
                                <strong>Faixa etária</strong>
                                <span>{faixaEtaria}</span>
                            </div>
                        )}
                        {material && (
                            <div>
                                <strong>Material</strong>
                                <span>{material}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="product-actions">
                    <button className="add-cart-button" onClick={handleAddToCart}>
                        Adicionar ao carrinho
                    </button>
                    <button className="whatsapp-button" onClick={comprarWhatsApp}>
                        <FaWhatsapp />
                        Comprar pelo WhatsApp
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductInfo;