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
                        {produtos.length !== 1 ? "s" : ""}
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
                            ? "Não encontramos produtos disponíveis no momento."
                            : `Não encontramos produtos na categoria "${categoriaSelecionada}".`
                        }
                    </p>
                </div>
            ) : (
                <div className="products-grid">
                    {produtosExibidos.map((produto) => {
                        const imageUrl = getImageUrl(produto.imagens?.[0]?.imagem);
                        
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
                            />
                        );
                    })}
                </div>
            )}
        </section>
    );
}

export default ProductsSection;