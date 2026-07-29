import "../ProductCard/ProductCard.css";
import { Link } from "react-router-dom";
import formatPrice from "../../utils/formatPrice";

function ProductCard({
    id,
    imagem,
    nome,
    preco,
    emPromocao,
    precoPromocional,
    categoria,
    cores = []
}) {
    const estaEmPromocao =
        emPromocao &&
        precoPromocional &&
        Number(precoPromocional) < Number(preco);

    const temImagem = imagem && imagem.trim() !== "";

    return (
        <Link
            to={`/produtos/${id}`}
            className="product-link"
        >
            <div className="product-card">
                <div className="product-image-container">
                    {temImagem ? (
                        <img
                            src={imagem}
                            alt={nome}
                            onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.parentElement.innerHTML = `
                                    <div class="placeholder-image">
                                        <span>Sem imagem</span>
                                    </div>
                                `;
                            }}
                        />
                    ) : (
                        <div className="placeholder-image">
                            <span>Sem imagem</span>
                        </div>
                    )}
                    
                    {estaEmPromocao && (
                        <span className="promotion-badge">
                            OFERTA
                        </span>
                    )}
                </div>

                <div className="product-card-info">
                    <h3>{nome}</h3>

                    {categoria && (
                        <span className="product-category">
                            {categoria}
                        </span>
                    )}

                    {cores && cores.length > 0 && (
                        <div className="product-colors">
                            {cores.slice(0, 4).map((cor, index) => (
                                <span
                                    key={index}
                                    className="color-dot"
                                    style={{ backgroundColor: cor.codigo }}
                                    title={cor.nome}
                                />
                            ))}
                            {cores.length > 4 && (
                                <span className="more-colors">
                                    +{cores.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    {estaEmPromocao ? (
                        <div className="promotion-prices">
                            <span className="original-price">
                                {formatPrice(preco)}
                            </span>
                            <strong className="promotion-price">
                                {formatPrice(precoPromocional)}
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