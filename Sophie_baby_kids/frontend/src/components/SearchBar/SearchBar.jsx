import "./SearchBar.css";

import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../../context/ProductContext/ProductContext";
import { FaSearch } from "react-icons/fa";

function SearchBar() {
    const navigate = useNavigate();
    const { produtos, getImageUrl } = useProducts();

    const [busca, setBusca] = useState("");
    const [sugestoes, setSugestoes] = useState([]);
    const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
    const [indiceSelecionado, setIndiceSelecionado] = useState(-1);
    const searchRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(event) {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                setMostrarSugestoes(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    useEffect(() => {
        if (busca.trim() === "") {
            setSugestoes([]);
            setMostrarSugestoes(false);
            return;
        }

        const buscaLower = busca.toLowerCase().trim();
        const filtrados = produtos.filter((produto) => {
            const nomeMatch = produto.nome?.toLowerCase().includes(buscaLower);
            const categoriaMatch = produto.categoria?.nome?.toLowerCase().includes(buscaLower);
            return nomeMatch || categoriaMatch;
        });

        setSugestoes(filtrados.slice(0, 8));
        setMostrarSugestoes(filtrados.length > 0);
    }, [busca, produtos]);

    function handleSubmit(event) {
        event.preventDefault();
        const buscaTratada = busca.trim();

        if (buscaTratada === "") {
            navigate("/produtos");
            return;
        }
        navigate(`/produtos?busca=${encodeURIComponent(buscaTratada)}`);
        setMostrarSugestoes(false);
    }

    function handleSugestaoClick(produto) {
        navigate(`/produtos/${produto.id}`);
        setMostrarSugestoes(false);
        setBusca("");
    }

    function handleKeyDown(event) {
        if (event.key === "ArrowDown") {
            event.preventDefault();
            setIndiceSelecionado((prev) => Math.min(prev + 1, sugestoes.length - 1));
        } else if (event.key === "ArrowUp") {
            event.preventDefault();
            setIndiceSelecionado((prev) => Math.max(prev - 1, -1));
        } else if (event.key === "Enter") {
            if (indiceSelecionado >= 0 && sugestoes[indiceSelecionado]) {
                event.preventDefault();
                handleSugestaoClick(sugestoes[indiceSelecionado]);
            }
        } else if (event.key === "Escape") {
            setMostrarSugestoes(false);
            setIndiceSelecionado(-1);
        }
    }

    return (
        <div className="search-wrapper" ref={searchRef}>
            <form className="search-box" onSubmit={handleSubmit}>
                <FaSearch className="search-icon" />

                <input
                    type="search"
                    placeholder="Pesquisar produtos..."
                    value={busca}
                    onChange={(event) => setBusca(event.target.value)}
                    onFocus={() => {
                        if (busca.trim() !== "" && sugestoes.length > 0) {
                            setMostrarSugestoes(true);
                        }
                    }}
                    onKeyDown={handleKeyDown}
                    autoComplete="off"
                />

                <button type="submit" className="search-submit">
                    Pesquisar
                </button>
            </form>

            {mostrarSugestoes && sugestoes.length > 0 && (
                <div className="search-suggestions">
                    {sugestoes.map((produto, index) => {
                        const imagemUrl = getImageUrl(produto.imagens?.[0]?.imagem);
                        const estaEmPromocao = produto.em_promocao && produto.preco_promocional;

                        return (
                            <div
                                key={produto.id}
                                className={`search-suggestion-item ${indiceSelecionado === index ? "selected" : ""}`}
                                onClick={() => handleSugestaoClick(produto)}
                                onMouseEnter={() => setIndiceSelecionado(index)}
                            >
                                {imagemUrl && (
                                    <img src={imagemUrl} alt={produto.nome} />
                                )}
                                <div className="suggestion-info">
                                    <span className="suggestion-name">{produto.nome}</span>
                                    <span className="suggestion-category">{produto.categoria?.nome}</span>
                                </div>
                                <span className="suggestion-price">
                                    {estaEmPromocao ? (
                                        <>
                                            <span className="original-price">
                                                R$ {Number(produto.preco).toFixed(2)}
                                            </span>
                                            <span className="promotion-price">
                                                R$ {Number(produto.preco_promocional).toFixed(2)}
                                            </span>
                                        </>
                                    ) : (
                                        `R$ ${Number(produto.preco).toFixed(2)}`
                                    )}
                                </span>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

export default SearchBar;