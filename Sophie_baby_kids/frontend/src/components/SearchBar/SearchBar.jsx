import "./SearchBar.css"

import { FaSearch } from "react-icons/fa";

function SearchBar() {
    return (
        <section className="hero">
            <div className="search-box">
                <FaSearch className="search-icon"/>

                <input 
                    type="text"
                    placeholder="Pesquisar produtos..."
                />
            </div>
        </section>
    )
}

export default SearchBar;