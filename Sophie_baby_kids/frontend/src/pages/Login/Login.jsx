import "./Login.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { FaUserLock, FaEnvelope, FaLock } from "react-icons/fa";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const ADMIN_EMAIL = "admin@sophiebabykids.com";
    const ADMIN_SENHA = "123456";

    useEffect(() => {
        const adminLogado = localStorage.getItem("admin_logado") === "true";
        if (adminLogado) {
            navigate("/dashboard");
        }
    }, []);

    function fazerLogin(event) {
        event.preventDefault();
        setErro("");
        setLoading(true);

        // Verificar credenciais
        if (email === ADMIN_EMAIL && senha === ADMIN_SENHA) {
            localStorage.setItem("admin_logado", "true");
            localStorage.setItem("admin_email", email);
            localStorage.setItem("admin_nome", "Administrador");
            navigate("/dashboard");
        } else {
            setErro("E-mail ou senha inválidos. Tente novamente.");
            setLoading(false);
        }
    }

    return (
        <>
            <Navbar />

            <main className="login-page">
                <section className="login-container">
                    <div className="login-header">
                        <div className="login-icon">
                            <FaUserLock />
                        </div>
                        <h1>Área Administrativa</h1>
                        <p>Entre com suas credenciais para acessar o painel.</p>
                    </div>

                    <form className="login-form" onSubmit={fazerLogin}>
                        {erro && (
                            <div className="login-error">
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
                                autoComplete="username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">
                                <FaLock /> Senha
                            </label>
                            <input
                                type="password"
                                id="senha"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(event) => setSenha(event.target.value)}
                                required
                                disabled={loading}
                                autoComplete="current-password"
                            />
                        </div>

                        <button 
                            type="submit" 
                            className="login-button"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <span className="spinner"></span>
                                    Entrando...
                                </>
                            ) : (
                                "Entrar no painel"
                            )}
                        </button>
                    </form>

                    <div className="login-info">
                        <p className="credentials-label">🔐 Credenciais de acesso:</p>
                        <p className="credentials">admin@sophiebabykids.com</p>
                        <p className="credentials">Senha: 123456</p>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Login;