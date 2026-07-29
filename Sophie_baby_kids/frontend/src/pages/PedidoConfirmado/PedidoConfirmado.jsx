import "./PedidoConfirmado.css";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function PedidoConfirmado() {
    return (
        <>
            <Navbar />
            <main className="pedido-confirmado-page">
                <div className="pedido-confirmado-container">
                    <FaCheckCircle className="success-icon" />
                    <h1>Pedido realizado com sucesso!</h1>
                    <p>Seu pedido foi enviado para a loja.</p>
                    <p className="sub-text">Aguardamos a confirmação do pedido.</p>
                    <Link to="/" className="btn-home">Continuar comprando</Link>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default PedidoConfirmado;