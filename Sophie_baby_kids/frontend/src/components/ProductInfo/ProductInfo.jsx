import "../ProductInfo/ProductInfo.css";

import { useState } from "react";

import { useCart } from "../../context/CartContext/CartContext";

import { FaWhatsapp } from "react-icons/fa";

import formatPrice from "../../utils/formatPrice";

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
    const estaEmPromocao =
        emPromocao &&
        precoPromocional &&
        Number(precoPromocional) < Number(preco);

    const { addToCart } = useCart();

    const [corSelecionada, setCorSelecionada] =
        useState(null);

    const [tamanhoSelecionado, setTamanhoSelecionado] =
        useState(null);

    const imagensProduto =
        imagens.length > 0
            ? imagens
            : imagem
                ? [imagem]
                : [];

    const [imagemSelecionada, setImagemSelecionada] =
        useState(imagensProduto[0]);

    function handleAddToCart() {
        if (!corSelecionada) {
            alert("Selecione uma cor.");
            return;
        }

        if (!tamanhoSelecionado) {
            alert("Selecione um tamanho.");
            return;
        }

        addToCart({
            id,
            nome,
            preco: estaEmPromocao
                ? Number(precoPromocional)
                : Number(preco),
            precoOriginal: Number(preco),
            emPromocao: estaEmPromocao,
            imagem: imagemSelecionada,
            categoria,
            cor: corSelecionada,
            tamanho: tamanhoSelecionado
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

        const precoProduto =
            estaEmPromocao
                ? precoPromocional
                : preco;

        const mensagem = `
            Olá! Gostaria de comprar este produto:

            Produto: ${nome}
            Preço: ${formatPrice(precoProduto)}
            Cor: ${corSelecionada.nome}
            Tamanho: ${tamanhoSelecionado}

            Aguardo a confirmação. Obrigado(a)!
        `.trim();

        const url =
            `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(
                mensagem
            )}`;

        window.open(
            url,
            "_blank"
        );
    }

    return (
        <section className="product-info">
            <div className="product-gallery">
                <div className="main-product-image">

                    <img
                        src={imagemSelecionada}
                        alt={nome}
                    />

                </div>

                {imagensProduto.length > 1 && (
                    <div className="product-thumbnails">
                        {imagensProduto.map(
                            (imagemProduto, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    className={
                                        imagemSelecionada ===
                                        imagemProduto
                                            ? "thumbnail active"
                                            : "thumbnail"
                                    }
                                    onClick={() =>
                                        setImagemSelecionada(
                                            imagemProduto
                                        )
                                    }
                                >

                                    <img
                                        src={imagemProduto}
                                        alt={`${nome} ${index + 1}`}
                                    />

                                </button>

                            )
                        )}

                    </div>

                )}

            </div>

            <div className="product-details-content">
                <span className="product-category">
                    {categoria}
                </span>

                <h1>
                    {nome}
                </h1>

                {estaEmPromocao ? (

                    <div className="product-detail-promotion">

                        <span className="product-original-price">
                            {formatPrice(preco)}
                        </span>

                        <h2 className="product-price">
                            {formatPrice(
                                precoPromocional
                            )}
                        </h2>

                        <span className="promotion-label">
                            OFERTA
                        </span>

                    </div>

                ) : (

                    <h2 className="product-price">
                        {formatPrice(preco)}
                    </h2>

                )}

                <div className="product-option-section">
                    <h3>
                        Cor
                    </h3>

                    <div className="colors">

                        {cores.map((cor) => (

                            <button
                                key={cor.nome}
                                type="button"
                                className={`color ${
                                    corSelecionada?.nome ===
                                    cor.nome
                                        ? "selected"
                                        : ""
                                }`}
                                style={{
                                    backgroundColor:
                                        cor.codigo
                                }}
                                title={cor.nome}
                                onClick={() =>
                                    setCorSelecionada(cor)
                                }
                            />

                        ))}

                    </div>

                    {corSelecionada && (

                        <span className="selected-option">
                            Cor selecionada:{" "}
                            {corSelecionada.nome}
                        </span>

                    )}

                </div>

                <div className="product-option-section">
                    <h3>
                        Tamanho
                    </h3>

                    <div className="sizes">
                        {tamanhos.map((tamanho) => (
                            <button
                                key={tamanho}
                                type="button"
                                className={
                                    tamanhoSelecionado ===
                                    tamanho
                                        ? "selected"
                                        : ""
                                }
                                onClick={() =>
                                    setTamanhoSelecionado(
                                        tamanho
                                    )
                                }
                            >
                                {tamanho}
                            </button>

                        ))}
                    </div>

                    {tamanhoSelecionado && (

                        <span className="selected-option">
                            Tamanho selecionado:{" "}
                            {tamanhoSelecionado}
                        </span>

                    )}

                    <p className="stock">
                        ✓ Em estoque
                    </p>

                </div>

                <div className="product-description">
                    <h3>
                        Descrição
                    </h3>

                    <p>
                        {descricao}
                    </p>

                    <div className="product-information">

                        <div>
                            <strong>
                                Faixa etária
                            </strong>

                            <span>
                                {faixaEtaria}
                            </span>
                        </div>

                        <div>
                            <strong>
                                Material
                            </strong>

                            <span>
                                {material}
                            </span>
                        </div>

                    </div>

                </div>

                <div className="product-actions">
                    <button
                        className="add-cart-button"
                        onClick={
                            handleAddToCart
                        }
                    >
                        Adicionar ao carrinho
                    </button>

                    <button
                        className="whatsapp-button"
                        onClick={
                            comprarWhatsApp
                        }
                    >
                        <FaWhatsapp />
                            Comprar pelo WhatsApp
                    </button>
                </div>
            </div>
        </section>
    );
}

export default ProductInfo;