import "./HeroSection.css"

import SearchBar from "../SearchBar/SearchBar";

import banner from "../../assets/banner-home.png"

function HeroSection() {
    return (
        <section
            className="hero"
            style={{ backgroundImage: `url(${banner})` }}
        >
            <SearchBar />
        </section>
    )
}

export default HeroSection;