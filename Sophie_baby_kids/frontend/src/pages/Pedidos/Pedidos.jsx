import "./Pedidos.css";

import { useEffect, useState } from "react";

import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/Footer/Footer";

import formatPrice from "../../utils/formatPrice";

function Pedidos() {
    const [pedidos, setPedidos] = useState([]);

    useEffect(() => {
        const pedidosSalvos =
            JSON.parse(
                localStorage.getItem("pedidos")
            ) || [];

        setPedidos(pedidosSalvos);
    }, []);

    function alterarStatus(id, novoStatus) {
        const pedidosAtualizados =
            pedidos.map(
                (pedido) =>
                    pedido.id === id
                        ? {
                            ...pedido,
                            status: novoStatus
                        }
                        : pedido
            );

        setPedidos(pedidosAtualizados);

        localStorage.setItem(
            "pedidos",
            JSON.stringify(
                pedidosAtualizados
            )
        );
    }

    return (
        <>
            <Navbar />

            <main className="pedidos-page">

                <section className="pedidos-container">

                    <div className="pedidos-header">

                        <h1>
                            Pedidos da loja
                        </h1>

                        <p>
                            Acompanhe os pedidos realizados pelos clientes.
                        </p>

                    </div>

                    {pedidos.length === 0 ? (

                        <div className="empty-orders">

                            <h2>
                                Nenhum pedido encontrado
                            </h2>

                            <p>
                                Os pedidos realizados aparecerão aqui.
                            </p>

                        </div>

                    ) : (

                        <div className="orders-list">

                            {pedidos.map((pedido) => (

                                <article
                                    className="order-card"
                                    key={pedido.id}
                                >

                                    <div className="order-card-header">

                                        <div>

                                            <h2>
                                                Pedido #{pedido.id}
                                            </h2>

                                            <span>
                                                {pedido.data}
                                            </span>

                                        </div>

                                        <select
                                            value={pedido.status}
                                            onChange={(event) =>
                                                alterarStatus(
                                                    pedido.id,
                                                    event.target.value
                                                )
                                            }
                                        >

                                            <option value="Pendente">
                                                Pendente
                                            </option>

                                            <option value="Em preparação">
                                                Em preparação
                                            </option>

                                            <option value="Concluído">
                                                Concluído
                                            </option>

                                            <option value="Cancelado">
                                                Cancelado
                                            </option>

                                        </select>

                                    </div>

                                    <div className="customer-info">

                                        <strong>
                                            Cliente
                                        </strong>

                                        <p>
                                            {pedido.cliente?.email}
                                        </p>

                                    </div>

                                    <div className="order-products">

                                        <strong>
                                            Produtos
                                        </strong>

                                        {pedido.produtos.map(
                                            (produto) => (

                                                <div
                                                    className="order-product"
                                                    key={`${produto.id}-${produto.cor}-${produto.tamanho}`}
                                                >

                                                    <img
                                                        src={produto.imagem}
                                                        alt={produto.nome}
                                                    />

                                                    <div>

                                                        <h3>
                                                            {produto.nome}
                                                        </h3>

                                                        <p>
                                                            Cor: {produto.cor}
                                                        </p>

                                                        <p>
                                                            Tamanho: {produto.tamanho}
                                                        </p>

                                                        <p>
                                                            Quantidade: {produto.quantidade}
                                                        </p>

                                                    </div>

                                                </div>

                                            )
                                        )}

                                    </div>

                                    <div className="order-total">

                                        <span>
                                            Total do pedido
                                        </span>

                                        <strong>
                                            {formatPrice(pedido.total)}
                                        </strong>

                                    </div>

                                </article>

                            ))}

                        </div>

                    )}

                </section>

            </main>

            <Footer />
        </>
    );
}

export default Pedidos;