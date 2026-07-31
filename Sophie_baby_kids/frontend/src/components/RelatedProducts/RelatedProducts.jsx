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

    // Função para calcular valor da parcela
    const calcularValorParcela = (preco, parcelas, juros) => {
        if (!preco || !parcelas || parcelas === 0) return 0;
        const precoBase = Number(preco);
        const numParcelas = Number(parcelas);
        const taxaJuros = Number(juros) || 0;
        
        if (taxaJuros === 0) {
            return precoBase / numParcelas;
        }
        return (precoBase * (1 + taxaJuros / 100)) / numParcelas;
    };

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
                    
                    const precoBase = estaEmPromocao 
                        ? Number(produto.preco_promocional) 
                        : Number(produto.preco);
                    
                    const parcelas = Number(produto.parcelas) || 10;
                    const juros = Number(produto.juros_parcelas) || 0;
                    const valorParcela = calcularValorParcela(precoBase, parcelas, juros);
                    const precoPix = produto.preco_pix 
                        ? Number(produto.preco_pix) 
                        : precoBase * 0.95;

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
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="related-product-placeholder">
                                        <span>Sem imagem</span>
                                    </div>
                                )}

                                {estaEmPromocao && (
                                    <span className="related-product-badge">
                                        Oferta
                                    </span>
                                )}
                            </div>

                            <div className="related-product-info">
                                <h3 className="related-product-name">{produto.nome}</h3>

                                {/* Cores disponíveis */}
                                {produto.cores && produto.cores.length > 0 && (
                                    <div className="related-product-colors">
                                        {produto.cores.slice(0, 4).map((cor, index) => (
                                            <span
                                                key={index}
                                                className={`related-color-dot ${cor.nome === "Colorido" ? "colorido" : ""}`}
                                                style={cor.nome === "Colorido" ? {} : { backgroundColor: cor.codigo }}
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

                                <div className="related-product-prices">
                                    {estaEmPromocao ? (
                                        <>
                                            <span className="related-original-price">
                                                {formatPrice(produto.preco)}
                                            </span>
                                            <strong className="related-product-price">
                                                {formatPrice(produto.preco_promocional)}
                                            </strong>
                                        </>
                                    ) : (
                                        <strong className="related-product-price">
                                            {formatPrice(produto.preco)}
                                        </strong>
                                    )}
                                </div>

                                <div className="related-product-payment">
                                    <span className="related-product-pix">
                                        {formatPrice(precoPix)} no PIX
                                    </span>
                                    {parcelas > 1 && (
                                        <span className="related-product-installment">
                                            ou {parcelas}x de {formatPrice(valorParcela)}
                                            {juros > 0 && ` com juros`}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
}

export default RelatedProducts;