import "../ProductCard/ProductCard.css";

import { Link } from "react-router-dom";

import formatPrice from "../../utils/formatPrice";

function ProductCard({
    id,
    imagem,
    nome,
    preco,
    emPromocao,
    precoPromocional
}) {
    const estaEmPromocao =
        emPromocao &&
        precoPromocional &&
        Number(precoPromocional) < Number(preco);

    return (
        <Link
            to={`/produtos/${id}`}
            className="product-link"
        >

            <div className="product-card">

                <div className="product-image-container">

                    <img
                        src={imagem}
                        alt={nome}
                    />

                    {estaEmPromocao && (

                        <span className="promotion-badge">
                            OFERTA
                        </span>

                    )}

                </div>

                <div className="product-card-info">

                    <h3>
                        {nome}
                    </h3>

                    {estaEmPromocao ? (

                        <div className="promotion-prices">

                            <span className="original-price">
                                {formatPrice(preco)}
                            </span>

                            <strong className="promotion-price">
                                {formatPrice(
                                    precoPromocional
                                )}
                            </strong>

                        </div>

                    ) : (

                        <p className="price">
                            {formatPrice(preco)}
                        </p>

                    )}

                    <span className="details-button">
                        Ver Produto
                    </span>

                </div>

            </div>

        </Link>
    );
}

export default ProductCard;