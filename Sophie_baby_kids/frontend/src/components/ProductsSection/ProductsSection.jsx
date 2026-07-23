import "../ProductsSection/ProductsSection.css";

import ProductCard from "../ProductCard/ProductCard";

function ProductsSection({
    produtos = [],
    categoriaSelecionada
}) {

    return (
        <section className="products-section">
            <div className="products-section-header">
                <div>
                    <h2>
                        {categoriaSelecionada === "Todos"
                            ? "Nossos produtos"
                            : categoriaSelecionada
                        }
                    </h2>

                    <p>
                        {produtos.length} produto
                        {produtos.length !== 1
                            ? "s"
                            : ""
                        }
                    </p>
                </div>
            </div>

            {produtos.length === 0 ? (
                <div className="empty-products">
                    <h3>
                        Nenhum produto encontrado
                    </h3>

                    <p>
                        Não encontramos produtos nessa categoria.
                    </p>
                </div>
            ) : (
                <div className="products-grid">
                    {produtos.map((produto) => (
                        <ProductCard
                            key={produto.id}
                            id={produto.id}
                            nome={produto.nome}
                            preco={produto.preco}
                            emPromocao={
                                produto.emPromocao
                            }
                            precoPromocional={
                                produto.precoPromocional
                            }
                            imagem={
                                produto.imagens?.[0] ||
                                produto.imagem
                            }
                        />
                    ))}
                </div>
            )}

        </section>
    );
}

export default ProductsSection;