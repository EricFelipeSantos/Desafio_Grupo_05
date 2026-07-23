import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import {
    FaWhatsapp,
    FaInstagram,
    FaFacebook,
    FaMapMarkerAlt,
    FaClock
} from "react-icons/fa";

import "./Contato.css";

function Contato() {
  return (
    <>
      <Navbar />
      <main className="contact-page">
        <section className="contact-header">
          <h1>Fale Conosco</h1>

          <p>
              Entre em contato com a Sophie Baby Kids.
          </p>
        </section>

        <section className="contact-content">
          <div className="contact-card">
              <h2>Entre em contato</h2>

              <a
                href="https://wa.me/5537999023869"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FaWhatsapp />
                  WhatsApp
              </a>

              <a
                href="https://www.instagram.com/sophiebabykids"
              >
                <FaInstagram />
                  Instagram
              </a>

              <a
                  href="https://www.facebook.com/sophie.babykids.5"
              >
                <FaFacebook />
                  Facebook
              </a>
          </div>

          <div className="contact-card">
            <h2>Informações</h2>

            <p>
              <FaMapMarkerAlt />
                R. Praça Coronel Torres, 60,
                Centro, Bambuí - MG
              </p>

              <p>
                <FaClock />
                  Segunda a sexta:
                  09:00 às 18:00
              </p>

              <p>
                Sábado:
                08:00 às 12:00
              </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

export default Contato