import "./WhatsAppButton.css";
import { FaWhatsapp } from "react-icons/fa";
import { useLocation } from "react-router-dom";

function WhatsAppButton() {
    const location = useLocation()
    const numeroWhatsApp = "5537999023869";

    const rotasAdmin = [
        "/dashboard",
        "/admin",
        "/gerenciar-produtos",
        "/produto/novo",
        "/produto/editar",
        "/pedidos",
        "/gerenciar-banners"
    ];

    const isAdminRoute = rotasAdmin.some(rota => 
        location.pathname.startsWith(rota)
    );

    if (isAdminRoute) {
        return null;
    }

    const mensagem = "Olá! Estou navegando pela loja Sophie Baby Kids e gostaria de ajuda. Pode me ajudar?"

    function abrirWhatsApp() {
        window.open(`https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`, "_blank");
    }

    return (
        <button
            className="whatsapp-float"
            onClick={abrirWhatsApp}
            aria-label="Falar com a loja pelo WhatsApp"
        >
            <FaWhatsapp />
        </button>
    );
}

export default WhatsAppButton;