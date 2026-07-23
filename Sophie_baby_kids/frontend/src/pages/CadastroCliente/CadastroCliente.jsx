import "./CadastroCliente.css";

import { useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import { useNavigate } from "react-router-dom";

function CadastroCliente() {
    const navigate = useNavigate();

    const [formulario, setFormulario] = useState({
        nome: "",
        email: "",
        telefone: "",
        cpf: "",
        senha: "",
        confirmarSenha: ""
    });

    const [erros, setErros] = useState({});

    function alterarCampo(event) {
        const { name, value } = event.target;

        setFormulario({
            ...formulario,
            [name]: value
        });
    }

    function validarFormulario() {
        const novosErros = {};

        if (formulario.nome.trim() === "") {
            novosErros.nome = "Informe seu nome.";
        }

        if (formulario.email.trim() === "") {
            novosErros.email = "Informe seu e-mail.";
        }

        if (formulario.telefone.trim() === "") {
            novosErros.telefone = "Informe seu telefone.";
        }

        if (formulario.cpf.trim() === "") {
            novosErros.cpf = "Informe seu CPF.";
        }

        if (formulario.senha.length < 6) {
            novosErros.senha = "A senha deve ter pelo menos 6 caracteres.";
        }

        if (formulario.senha !== formulario.confirmarSenha) {
            novosErros.confirmarSenha = "As senhas não coincidem.";
        }

        setErros(novosErros);

        return Object.keys(novosErros).length === 0;
    }

    function cadastrarCliente(event) {
        event.preventDefault();

        const formularioValido = validarFormulario();

        if (!formularioValido) {
            return;
        }

        console.log("Cliente cadastrado:", formulario);

        alert("Cadastro realizado com sucesso!");
        navigate("/login");
    }

    return (
        <>
            <Navbar />
            <main className="cadastro-cliente-page">
                <section className="cadastro-cliente-container">
                    <div className="cadastro-cliente-header">
                        <h1>
                            Criar conta
                        </h1>

                        <p>
                            Cadastre-se para facilitar suas compras na Sophie Baby Kids.
                        </p>
                    </div>

                    <form
                        className="cadastro-cliente-form"
                        onSubmit={cadastrarCliente}
                    >

                        <div className="form-group">
                            <label htmlFor="nome">
                                Nome completo
                            </label>

                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome completo"
                                value={formulario.nome}
                                onChange={alterarCampo}
                            />

                            {erros.nome && (
                                <span className="form-error">
                                    {erros.nome}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">
                                E-mail
                            </label>

                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Digite seu e-mail"
                                value={formulario.email}
                                onChange={alterarCampo}
                            />

                            {erros.email && (
                                <span className="form-error">
                                    {erros.email}
                                </span>
                            )}
                        </div>

                        <div className="form-row">

                            <div className="form-group">
                                <label htmlFor="telefone">
                                    Telefone
                                </label>

                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    placeholder="(37) 99999-9999"
                                    value={formulario.telefone}
                                    onChange={alterarCampo}
                                />

                                {erros.telefone && (
                                    <span className="form-error">
                                        {erros.telefone}
                                    </span>
                                )}
                            </div>

                            <div className="form-group">
                                <label htmlFor="cpf">
                                    CPF
                                </label>

                                <input
                                    type="text"
                                    id="cpf"
                                    name="cpf"
                                    placeholder="000.000.000-00"
                                    value={formulario.cpf}
                                    onChange={alterarCampo}
                                />

                                {erros.cpf && (
                                    <span className="form-error">
                                        {erros.cpf}
                                    </span>
                                )}
                            </div>

                        </div>

                        <div className="form-group">
                            <label htmlFor="senha">
                                Senha
                            </label>

                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Crie uma senha"
                                value={formulario.senha}
                                onChange={alterarCampo}
                            />

                            {erros.senha && (
                                <span className="form-error">
                                    {erros.senha}
                                </span>
                            )}
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmarSenha">
                                Confirmar senha
                            </label>

                            <input
                                type="password"
                                id="confirmarSenha"
                                name="confirmarSenha"
                                placeholder="Digite a senha novamente"
                                value={formulario.confirmarSenha}
                                onChange={alterarCampo}
                            />

                            {erros.confirmarSenha && (
                                <span className="form-error">
                                    {erros.confirmarSenha}
                                </span>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="cadastro-cliente-button"
                        >
                            Criar minha conta
                        </button>
                    </form>
                </section>
            </main>

            <Footer />
        </>
    );
}

export default CadastroCliente;