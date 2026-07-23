import "../Footer/Footer.css"

import logo from "../../assets/logo.png"

import {
    FaWhatsapp,
    FaInstagram,
    FaFacebook,
    FaMapMarkerAlt,
    FaClock,
    FaCreditCard
} from "react-icons/fa";

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-column">
                    <img
                        src={logo}
                        alt="Sophie Baby Kids"
                        className="footer-logo"
                    />

                    <p>
                        Moda infantil com conforto, qualidade e muito carinho.
                    </p>
                </div>

                <div className="footer-column">
                    <h3>Contato</h3>
                    <p><FaWhatsapp /> (37) 99902-3869</p>
                    <p><FaInstagram /> @sophiebabykids</p>
                    <p><FaFacebook /> Sophie Baby Kids</p>
                </div>

                <div className="footer-column">
                    <h3>Localização</h3>
                    <p><FaMapMarkerAlt />R. Praça Coronel Torres, 60</p>
                    <p>Bambuí - MG</p>
                    <a
                        href="https://maps.google.com/?q=Praça+Coronel+Torres+60+Bambuí+MG"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="map-link"
                    >
                        Ver no mapa
                    </a>
                </div>

                <div className="footer-column">
                    <h3>Funcionamento</h3>
                    <p><FaClock /> Seg. a Sex.</p>
                    <p>09:00 às 18:00</p>
                    <p>Sábado</p>
                    <p>08:00 às 12:00</p>
                    <h3 className="payment-title">Pagamento</h3>
                    <p><FaCreditCard /> Pix • Cartão • Dinheiro</p>
                </div>
            </div>

            <div className="footer-bottom">
                © 2026 Sophie Baby Kids. Todos os direitos reservados.
            </div>
        </footer>
    )
}
export default Footer