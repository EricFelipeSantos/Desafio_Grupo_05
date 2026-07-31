import { Link } from "react-router-dom";

import { useProducts } from "../../context/ProductContext/ProductContext";
import { useCart } from "../../context/CartContext/CartContext";

import formatPrice from "../../utils/FormatPrice";

import "./RelatedProducts.css";

function RelatedProducts({ currentProductId }) {
    const { produtos, getImageUrl } = useProducts();
    const { formatPrice } = useCart();

    const produtoAtual = produtos.find(
        (produto) => produto.id === currentProductId
    );

    if (!produtoAtual) {
        return null;
    }

    const produtosDaMesmaCategoria = produtos.filter(
        (produto) =>
            produto.id !== currentProductId &&
            produto.categoria?.id === produtoAtual.categoria?.id
    );

    const outrosProdutos = produtos.filter(
        (produto) =>
            produto.id !== currentProductId &&
            produto.categoria?.id !== produtoAtual.categoria?.id
    );

    const produtosRelacionados = [
        ...produtosDaMesmaCategoria,
        ...outrosProdutos
    ].slice(0, 8);

    if (produtosRelacionados.length === 0) {
        return null;
    }

    return (
        <section className="related-products">
            <div className="related-products-header">
                <h2>Você também pode gostar</h2>
                <p>Confira outros produtos da nossa loja.</p>
            </div>

            <div className="related-products-grid">
                {produtosRelacionados.map((produto) => {
                    const estaEmPromocao =
                        produto.emPromocao &&
                        produto.preco_promocional &&
                        Number(produto.preco_promocional) < Number(produto.preco);

                    const imagemUrl = getImageUrl(produto.imagens?.[0]?.imagem);

                    return (
                        <Link
                            key={produto.id}
                            to={`/produtos/${produto.id}`}
                            className="related-product-card"
                        >
                            <div className="related-product-image">
                                {imagemUrl ? (
                                    <img
                                        src={imagemUrl}
                                        alt={produto.nome}
                                    />
                                ) : (
                                    <div className="related-product-placeholder">
                                        <span>Sem imagem</span>
                                    </div>
                                )}

                                {estaEmPromocao && (
                                    <span className="related-promotion-badge">
                                        OFERTA
                                    </span>
                                )}
                            </div>

                            <div className="related-product-info">
                                <span className="related-product-category">
                                    {produto.categoria?.nome}
                                </span>

                                <h3>{produto.nome}</h3>

                                {estaEmPromocao ? (
                                    <div className="related-prices">
                                        <span className="related-original-price">
                                            {formatPrice(produto.preco)}
                                        </span>
                                        <strong className="related-promotion-price">
                                            {formatPrice(produto.preco_promocional)}
                                        </strong>
                                    </div>
                                ) : (
                                    <strong className="related-product-price">
                                        {formatPrice(produto.preco)}
                                    </strong>
                                )}

                                {/* Cores disponíveis */}
                                {produto.cores && produto.cores.length > 0 && (
                                    <div className="related-colors">
                                        {produto.cores.slice(0, 4).map((cor, index) => (
                                            <span
                                                key={index}
                                                className="related-color-dot"
                                                style={{ backgroundColor: cor.codigo }}
                                                title={cor.nome}
                                            />
                                        ))}
                                        {produto.cores.length > 4 && (
                                            <span className="related-more-colors">
                                                +{produto.cores.length - 4}
                                            </span>
                                        )}
                                    </div>
                                )}
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default RelatedProducts;