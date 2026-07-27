import "./HeroSection.css";

import SearchBar from "../SearchBar/SearchBar";

import banner from "../../assets/banner-home.png";

function HeroSection() {
    return (
        <section
            className="hero"
            style={{backgroundImage: `url(${banner})`}}
        >
            <div className="hero-search-wrapper">
                <SearchBar />
            </div>
        </section>
    );
}

export default HeroSection;