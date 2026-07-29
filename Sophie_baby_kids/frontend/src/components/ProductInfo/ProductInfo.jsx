import "../ProductInfo/ProductInfo.css";

import { useState, useEffect } from "react";
import { useCart } from "../../context/CartContext/CartContext";
import { FaWhatsapp } from "react-icons/fa";
import formatPrice from "../../utils/formatPrice";
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
    tamanhos = []
}) {
    const { getImageUrl } = useProducts();
    const { addToCart } = useCart();

    const estaEmPromocao =
        emPromocao &&
        precoPromocional &&
        Number(precoPromocional) < Number(preco);

    const [corSelecionada, setCorSelecionada] = useState(null);
    const [tamanhoSelecionado, setTamanhoSelecionado] = useState(null);

    const imagensProduto = imagens.length > 0 
        ? imagens.map((img) => getImageUrl(img.imagem)).filter(Boolean)
        : imagem 
            ? [getImageUrl(imagem)] 
            : [];

    const [imagemSelecionada, setImagemSelecionada] = useState(null);

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
            preco: estaEmPromocao 
                ? Number(precoPromocional) 
                : Number(preco),
            precoOriginal: Number(preco),
            emPromocao: estaEmPromocao,
            imagem: imagemCarrinho,
            categoria: categoria?.nome || categoria,
            cor: corSelecionada,
            tamanho: nomeTamanho
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
        const precoProduto = estaEmPromocao ? precoPromocional : preco;
        const nomeTamanho = typeof tamanhoSelecionado === 'string' 
            ? tamanhoSelecionado 
            : tamanhoSelecionado.nome;

        const linhas = [
            "Olá! Gostaria de comprar este produto:",
            "",
            "*Produto:* " + nome,
            "*Preço:* " + formatPrice(precoProduto),
            "*Cor:* " + corSelecionada.nome,
            "*Tamanho:* " + nomeTamanho,
            "",
            "Aguardo a confirmação. Obrigado(a)!"
        ];

        const mensagem = linhas.join("\n");

        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
        window.open(url, "_blank");
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
                        <span className="promotion-label">OFERTA</span>
                    </div>
                ) : (
                    <h2 className="product-price">{formatPrice(preco)}</h2>
                )}

                {cores && cores.length > 0 && (
                    <div className="product-option-section">
                        <h3>Cor</h3>
                        <div className="colors">
                            {cores.map((cor) => (
                                <button
                                    key={cor.nome}
                                    type="button"
                                    className={`color ${
                                        corSelecionada?.nome === cor.nome
                                            ? "selected"
                                            : ""
                                    }`}
                                    style={{ backgroundColor: cor.codigo }}
                                    title={cor.nome}
                                    onClick={() => setCorSelecionada(cor)}
                                />
                            ))}
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
                        <p className="stock">✓ Em estoque</p>
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