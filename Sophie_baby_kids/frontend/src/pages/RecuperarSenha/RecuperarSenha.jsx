import "./RecuperarSenha.css";

import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

function RecuperarSenha() {
    const [email, setEmail] = useState("");
    const [mensagem, setMensagem] = useState("");

    function recuperarSenha(event) {
        event.preventDefault();

        setMensagem(
            "Se este e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha."
        );
    }

    return (
        <>
            <Navbar />

            <main className="recover-page">
                <section className="recover-container">
                    <div className="recover-header">
                        <h1>
                            Recuperar senha
                        </h1>

                        <p>
                            Informe seu e-mail para receber as instruções de recuperação.
                        </p>
                    </div>

                    <form
                        className="recover-form"
                        onSubmit={recuperarSenha}
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

                        <button
                            type="submit"
                            className="recover-button"
                        >
                            Enviar instruções
                        </button>
                    </form>

                    {mensagem && (
                        <p className="recover-message">
                            {mensagem}
                        </p>
                    )}
                </section>
            </main>

            <Footer />
        </>
    );
}

export default RecuperarSenha;