import "./SearchBar.css";

import { useState } from "react";

import { useNavigate } from "react-router-dom";

import { FaSearch } from "react-icons/fa";

function SearchBar() {
    const navigate = useNavigate();

    const [busca, setBusca] = useState("");

    function handleSubmit(event) {
        event.preventDefault();

        const buscaTratada = busca.trim();

        if (buscaTratada === "") {
            navigate("/produtos");
            return;
        }
        navigate(`/produtos?busca=${encodeURIComponent(buscaTratada)}`);
    }

    return (
        <form
            className="search-box"
            onSubmit={handleSubmit}
        >

            <FaSearch
                className="search-icon"
            />

            <input
                type="search"
                placeholder="Pesquisar produtos..."
                value={busca}
                onChange={(event) =>
                    setBusca(
                        event.target.value
                    )
                }
            />

            <button
                type="submit"
                className="search-submit"
            >
                Pesquisar
            </button>
        </form>
    );
}

export default SearchBar;