import "../CategorySection/CategorySection.css";

import { FaFilter } from "react-icons/fa";

const categorias = [
    "Todos",
    "Vestidos",
    "Conjuntos",
    "Meninas",
    "Meninos",
    "Bebês",
    "Promoções"
];

function CategorySection({
    categoriaSelecionada,
    onCategoriaSelecionada,
    onAbrirFiltros
}) {
    return (
        <section className="category-section">
            <h2>
                Categorias
            </h2>

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

                <button
                    className="filter-button"
                    onClick={onAbrirFiltros}
                >
                    <FaFilter />

                    Filtrar
                </button>

            </div>

        </section>
    );
}

export default CategorySection;