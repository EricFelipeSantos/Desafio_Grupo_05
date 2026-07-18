import '../CategorySection/CategorySection.css'

import { FaFilter } from "react-icons/fa";

const categorias = [
    "Vestidos",
    "Conjuntos",
    "Meninas",
    "Meninos",
    "Bebês",
    "Promoções"
];

function CategorySection() {
    return (
        <section className='category-section'>
            <h2>Categorias</h2>
            <div className='category-header'>
                <div className='categorie-list'>
                    {categorias.map((categoria)=>(
                        <button key={categoria}>
                            {categoria}
                        </button>
                    ))}
                </div>
                    <button className='filter-button'>
                        <FaFilter />
                        Filtrar
                    </button>
                </div>
        </section>
    )
}

export default CategorySection