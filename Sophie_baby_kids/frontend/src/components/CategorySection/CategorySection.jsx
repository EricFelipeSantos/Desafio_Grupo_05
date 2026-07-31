import "../CategorySection/CategorySection.css";

function CategorySection({
    categoriaSelecionada,
    onCategoriaSelecionada,
    categoriasDisponiveis = [],
}) {
    const categorias = categoriasDisponiveis.length > 0 
        ? categoriasDisponiveis 
        : ["Todos", "Promoções"];

    return (
        <section className="category-section">
            <div className="category-header">
                <div className="categorie-list">
                    {categorias.map((categoria) => (
                        <button
                            key={categoria}
                            className={
                                categoriaSelecionada === categoria
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                onCategoriaSelecionada(categoria)
                            }
                        >
                            {categoria}
                        </button>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default CategorySection;