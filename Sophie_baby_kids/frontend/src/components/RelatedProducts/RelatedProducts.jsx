import { Link } from "react-router-dom";

import { useProducts } from "../../context/ProductContext/ProductContext";

import formatPrice from "../../utils/formatPrice";

import "./RelatedProducts.css";

function RelatedProducts({
    currentProductId
}) {
    const { produtos } = useProducts();

    const produtoAtual = produtos.find(
        (produto) =>
            produto.id === currentProductId
    );

    if (!produtoAtual) {
        return null;
    }

    const produtosDaMesmaCategoria =
        produtos.filter(
            (produto) =>
                produto.id !== currentProductId &&
                produto.categoria ===
                    produtoAtual.categoria
        );

    const outrosProdutos =
        produtos.filter(
            (produto) =>
                produto.id !== currentProductId &&
                produto.categoria !==
                    produtoAtual.categoria
        );

    const produtosRelacionados = [
        ...produtosDaMesmaCategoria,
        ...outrosProdutos
    ].slice(0, 8);

    if (
        produtosRelacionados.length === 0
    ) {
        return null;
    }

    return (
        <section className="related-products">
            <div className="related-products-header">

                <h2>
                    Você também pode gostar
                </h2>

                <p>
                    Confira outros produtos da nossa loja.
                </p>
            </div>

            <div className="related-products-grid">
                {produtosRelacionados.map(
                    (produto) => {
                        const estaEmPromocao =
                            produto.emPromocao &&
                            produto.precoPromocional &&
                            Number(
                                produto.precoPromocional
                            ) <
                            Number(
                                produto.preco
                            );

                        const imagemProduto =
                            produto.imagens?.[0] ||
                            produto.imagem;

                        return (
                            <Link
                                key={produto.id}
                                to={`/produtos/${produto.id}`}
                                className="related-product-card"
                            >

                                <div className="related-product-image">
                                    <img
                                        src={imagemProduto}
                                        alt={produto.nome}
                                    />

                                    {estaEmPromocao && (

                                        <span className="related-promotion-badge">
                                            OFERTA
                                        </span>

                                    )}
                                </div>

                                <div className="related-product-info">
                                    <span className="related-product-category">
                                        {produto.categoria}
                                    </span>

                                    <h3>
                                        {produto.nome}
                                    </h3>

                                    {estaEmPromocao ? (
                                        <div className="related-prices">

                                            <span>
                                                {formatPrice(
                                                    produto.preco
                                                )}
                                            </span>

                                            <strong>
                                                {formatPrice(
                                                    produto.precoPromocional
                                                )}
                                            </strong>

                                        </div>

                                    ) : (

                                        <strong>
                                            {formatPrice(
                                                produto.preco
                                            )}
                                        </strong>

                                    )}
                                </div>
                            </Link>
                        );
                    }
                )}
            </div>
        </section>
    );
}

export default RelatedProducts;