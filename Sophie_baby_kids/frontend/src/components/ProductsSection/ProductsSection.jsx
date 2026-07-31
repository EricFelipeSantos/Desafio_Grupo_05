import "../ProductsSection/ProductsSection.css";
import ProductCard from "../ProductCard/ProductCard";
import { useProducts } from "../../context/ProductContext/ProductContext"; 

function ProductsSection({
    produtos = [],
    categoriaSelecionada,
    onVerTodosProdutos, 
    carregando = false 
}) {
    const { getImageUrl } = useProducts(); 

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

    const produtosExibidos = produtos.slice(0, 8);

    if (carregando) {
        return (
            <section className="products-section">
                <div className="products-section-header">
                    <div>
                        <h2>Carregando produtos...</h2>
                    </div>
                </div>
                <div className="products-grid skeleton">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                        <div key={item} className="product-card-skeleton">
                            <div className="skeleton-image"></div>
                            <div className="skeleton-text"></div>
                            <div className="skeleton-text short"></div>
                        </div>
                    ))}
                </div>
            </section>
        );
    }

    return (
        <section className="products-section">
            <div className="products-section-header">
                <div>
                    <h2>
                        {categoriaSelecionada === "Todos"
                            ? "Nossos produtos"
                            : categoriaSelecionada === "Promoções"
                            ? "Ofertas especiais"
                            : categoriaSelecionada
                        }
                    </h2>

                    <p>
                        {produtos.length} produto
                        {produtos.length !== 1 ? "s" : ""} encontrado
                    </p>
                </div>

                {produtos.length > 8 && onVerTodosProdutos && (
                    <button 
                        className="see-all-button"
                        onClick={onVerTodosProdutos}
                    >
                        Ver todos
                    </button>
                )}
            </div>

            {produtos.length === 0 ? (
                <div className="empty-products">
                    <h3>Nenhum produto encontrado</h3>
                    <p>
                        {categoriaSelecionada === "Todos"
                            ? "Nao encontramos produtos disponiveis no momento."
                            : `Nao encontramos produtos na categoria "${categoriaSelecionada}".`
                        }
                    </p>
                </div>
            ) : (
                <div className="products-grid">
                    {produtosExibidos.map((produto) => {
                        const imageUrl = getImageUrl(produto.imagens?.[0]?.imagem);
                        
                        const estaEmPromocao = produto.em_promocao && 
                            produto.preco_promocional && 
                            Number(produto.preco_promocional) < Number(produto.preco);
                        
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
                            <ProductCard
                                key={produto.id}
                                id={produto.id}
                                nome={produto.nome}
                                preco={produto.preco}
                                emPromocao={produto.em_promocao}
                                precoPromocional={produto.preco_promocional}
                                imagem={imageUrl}
                                categoria={produto.categoria?.nome}
                                cores={produto.cores}
                                precoPix={precoPix}
                                parcelas={parcelas}
                                valorParcela={valorParcela}
                                jurosParcelas={juros}
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default ProductsSection;