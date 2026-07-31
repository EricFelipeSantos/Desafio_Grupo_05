import "./HeroSection.css";
import { Link } from "react-router-dom";

import heroBackground from "../../assets/banner-home.png";

function HeroSection() {
    return (
        <section 
            className="hero-section"
            style={{
                backgroundImage: `url(${heroBackground})`,
                backgroundSize: '1300px auto',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className="hero-overlay"></div>
            <div className="hero-content">
                <div className="hero-text">
                    <h1>
                        Roupas <span>especiais</span> para<br />
                        momentos <span>inesquecíveis</span>
                    </h1>
                    <p>
                        Descubra a coleção Sophie Baby Kids, feita com carinho
                        para os pequenos que merecem o melhor desde o primeiro dia.
                    </p>
                    <div className="hero-buttons">
                        <Link to="/produtos" className="hero-button-primary">
                            Ver coleção
                        </Link>
                        <Link to="/contato" className="hero-button-secondary">
                            Fale conosco
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default HeroSection;