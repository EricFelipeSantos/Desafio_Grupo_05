import "./Login.css";

import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useAuth } from "../../context/AuthContext/AuthContext";

function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");

    const navigate = useNavigate();
    const location = useLocation();

    const { login } = useAuth();

    function fazerLogin(event) {
        event.preventDefault();

        const usuarioAdmin = {
            email: "admin@sophiebabykids.com",
            senha: "123456"
        };

        if (
            email === usuarioAdmin.email &&
            senha === usuarioAdmin.senha
        ) {
            login({
                email,
                tipo: "admin"
            });

            navigate("/dashboard");

            return;
        }

        login({
            email,
            tipo: "cliente"
        });

        const rotaAnterior = location.state?.from || "/";

        navigate(rotaAnterior);
    }

    return (
        <>
            <Navbar />

            <main className="login-page">
                <section className="login-container">
                    <div className="login-header">
                        <h1>
                            Bem-vindo de volta!
                        </h1>

                        <p>
                            Entre na sua conta para continuar.
                        </p>
                    </div>

                    <form
                        className="login-form"
                        onSubmit={fazerLogin}
                    >
                        <div className="form-group">
                            <label htmlFor="email">
                                E-mail
                            </label>

                            <input
                                type="email"
                                id="email"
                                placeholder="Digite seu e-mail"
                                value={email}
                                onChange={(event) =>
                                    setEmail(event.target.value)
                                }
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">
                                Senha
                            </label>

                            <input
                                type="password"
                                id="senha"
                                placeholder="Digite sua senha"
                                value={senha}
                                onChange={(event) =>
                                    setSenha(event.target.value)
                                }
                                required
                            />

                            <Link
                                to="/recuperar-senha"
                                className="forgot-password"
                            >
                                Esqueceu a senha?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="login-button"
                        >
                            Entrar
                        </button>
                    </form>

                    <div className="login-register">
                        <p>
                            Ainda não possui uma conta?
                        </p>

                        <Link to="/cadastro">
                            Criar uma conta
                        </Link>
                    </div>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default Login;