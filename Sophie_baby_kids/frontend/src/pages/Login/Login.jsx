import "./Login.css";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { FaUserLock, FaEnvelope, FaLock } from "react-icons/fa";

const BASE_URL = import.meta.env.VITE_API_URL 
    ? import.meta.env.VITE_API_URL.replace('/api', '') 
    : "http://127.0.0.1:8000";
const API_URL = `${BASE_URL}/api/auth/login/`;

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erro, setErro] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const adminLogado = localStorage.getItem("admin_logado") === "true";
        if (adminLogado) {
            navigate("/dashboard");
        }
    }, []);

    async function fazerLogin(event) {
        event.preventDefault();
        setErro("");
        setLoading(true);

        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: senha
                })
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem("access_token", data.data.access_token);
                localStorage.setItem("refresh_token", data.data.refresh_token);
                localStorage.setItem("admin_logado", "true");
                localStorage.setItem("admin_email", data.data.user.email);
                localStorage.setItem("admin_nome", data.data.user.first_name || "Administrador");

                navigate("/dashboard");
            } else {
                setErro(data.errors?.detail || "E-mail ou senha inválidos.");
            }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            setErro("Erro ao conectar com o servidor. Verifique se o backend está rodando.");
        } finally {
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
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                required
                                disabled={loading}
                                autoComplete="email"
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
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Login;