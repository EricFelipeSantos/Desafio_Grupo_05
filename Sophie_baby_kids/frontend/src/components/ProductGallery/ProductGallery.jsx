import "../ProductGallery/ProductGallery.css";

import vestidoVermelho from "../../assets/products/vestido-vermelho.jpg"
import vestidoAzul from "../../assets/products/vestido-azul.jpg"
import macacao from "../../assets/products/macacao.jpg"
import conjunto from "../../assets/products/conjunto.png"

function ProductGallery() {
    return (
        <section className="product-gallery">
            <div className="main-image">
                <img
                    src={vestidoVermelho}
                    alt="Produto"
                />
            </div>

            <div className="thumbnail-list">
                <img src={vestidoVermelho} alt="Vestido vermelho" />
                <img src={vestidoAzul} alt="Vestido azul" />
                <img src={macacao} alt="Macacão infantil" />
                <img src={conjunto} alt="Conjunto infantil" />
            </div>
        </section>
    );
}

export default ProductGallery;