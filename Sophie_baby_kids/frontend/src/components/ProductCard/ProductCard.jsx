// src/components/ProductCard/ProductCard.jsx

import "../ProductCard/ProductCard.css";
import { Link } from "react-router-dom";
import formatPrice from "../../utils/FormatPrice";

function ProductCard({
    id,
    imagem,
    nome,
    preco,
    emPromocao,
    precoPromocional,
    categoria,
    cores = [],
    precoPix = null,
    parcelas = null,
    valorParcela = null,
    jurosParcelas = 0
}) {
    const estaEmPromocao =
        emPromocao &&
        precoPromocional &&
        Number(precoPromocional) < Number(preco);

    const temImagem = imagem && imagem.trim() !== "";

    const precoExibido = estaEmPromocao ? Number(precoPromocional) : Number(preco);
    const precoOriginal = Number(preco);
    const precoPixExibido = precoPix ? Number(precoPix) : (precoExibido * 0.95);
    const parcelasExibidas = Number(parcelas) || 10;
    const valorParcelaExibido = valorParcela || (precoExibido / parcelasExibidas);

    return (
        <Link
            to={`/produtos/${id}`}
            className="product-card-link"
        >
            <div className="product-card">
                <div className="product-card-image">
                    {temImagem ? (
                        <img
                            src={imagem}
                            alt={nome}
                            loading="lazy"
                            onError={(e) => {
                                e.target.style.display = 'none';
                                const placeholder = e.target.parentElement.querySelector('.product-card-placeholder');
                                if (placeholder) placeholder.style.display = 'flex';
                            }}
                        />
                    ) : (
                        <div className="product-card-placeholder">
                            <span>Sem imagem</span>
                        </div>
                    )}
                    
                    {estaEmPromocao && (
                        <span className="product-card-badge">Oferta</span>
                    )}
                </div>

                <div className="product-card-info">
                    <h3 className="product-card-name">{nome}</h3>

                    {cores && cores.length > 0 && (
                        <div className="product-card-colors">
                            {cores.slice(0, 4).map((cor, index) => (
                                <span
                                    key={index}
                                    className={`product-card-color-dot ${cor.nome === "Colorido" ? "colorido" : ""}`}
                                    style={cor.nome === "Colorido" ? {} : { backgroundColor: cor.codigo }}
                                    title={cor.nome}
                                />
                            ))}
                            {cores.length > 4 && (
                                <span className="product-card-more-colors">
                                    +{cores.length - 4}
                                </span>
                            )}
                        </div>
                    )}

                    <div className="product-card-prices">
                        {estaEmPromocao ? (
                            <>
                                <span className="product-card-original-price">
                                    {formatPrice(precoOriginal)}
                                </span>
                                <strong className="product-card-price">
                                    {formatPrice(precoPromocional)}
                                </strong>
                            </>
                        ) : (
                            <strong className="product-card-price">
                                {formatPrice(precoExibido)}
                            </strong>
                        )}
                    </div>

                    <div className="product-card-payment">
                        <span className="product-card-pix">
                            {formatPrice(precoPixExibido)} no PIX
                        </span>
                        {parcelasExibidas > 1 && (
                            <span className="product-card-installment">
                                ou {parcelasExibidas}x de {formatPrice(valorParcelaExibido)}
                                {jurosParcelas > 0 && ` com juros`}
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default ProductCard;