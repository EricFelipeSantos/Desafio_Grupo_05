import "./RecuperarSenha.css";

import { useState } from "react";
import { Link } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { FaEnvelope, FaArrowLeft } from "react-icons/fa";

function RecuperarSenha() {
    const [email, setEmail] = useState("");
    const [enviado, setEnviado] = useState(false);
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const ADMIN_EMAIL = "admin@sophiebabykids.com";

    function handleSubmit(event) {
        event.preventDefault();
        setErro("");
        setLoading(true);

        setTimeout(() => {
            if (email === ADMIN_EMAIL) {
                setEnviado(true);
                // pendente, vou colocar ainda
            } else {
                setErro("E-mail não encontrado. Use o e-mail administrativo.");
            }
            setLoading(false);
        }, 1500);
    }

    return (
        <>
            <Navbar />

            <main className="recuperar-page">
                <section className="recuperar-container">
                    <div className="recuperar-header">
                        <h1>Recuperar senha</h1>
                        <p>Digite seu e-mail para receber instruções de recuperação.</p>
                    </div>

                    {enviado ? (
                        <div className="recuperar-sucesso">
                            <p>Um e-mail foi enviado para <strong>{email}</strong> com as instruções para recuperar sua senha.</p>
                            <Link to="/login" className="back-to-login">
                                <FaArrowLeft /> Voltar para o login
                            </Link>
                        </div>
                    ) : (
                        <form className="recuperar-form" onSubmit={handleSubmit}>
                            {erro && (
                                <div className="recuperar-erro">
                                    {erro}
                                </div>
                            )}

                            <div className="form-group">
                                <label htmlFor="email">
                                    <FaEnvelope /> E-mail
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    placeholder="admin@sophiebabykids.com"
                                    value={email}
                                    onChange={(event) => setEmail(event.target.value)}
                                    required
                                    disabled={loading}
                                />
                                <small>Use o e-mail administrativo cadastrado.</small>
                            </div>

                            <button 
                                type="submit" 
                                className="recuperar-button"
                                disabled={loading}
                            >
                                {loading ? "Enviando..." : "Enviar instruções"}
                            </button>

                            <Link to="/login" className="back-to-login">
                                <FaArrowLeft /> Voltar para o login
                            </Link>
                        </form>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default RecuperarSenha;