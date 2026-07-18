import "../ProductCard/ProductCard.css"

function ProductCard({ imagem, nome, preco}) {
    return(
        <div className="product-card">
            <img src={imagem} alt={nome}/>

            <div className="product-info">
                <h3>{nome}</h3>

                <p className="price">R$ {preco}</p>

                <button>Ver produto</button>
            </div>
        </div>
    )
}

export default ProductCard