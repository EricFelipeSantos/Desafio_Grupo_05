import produtosTemporario from "../data/produtos_temporario";

const CHAVE_PRODUTOS = "produtos";

export function obterProdutos() {
    const produtosSalvos = localStorage.getItem(CHAVE_PRODUTOS);

    if (produtosSalvos) {
        return JSON.parse(produtosSalvos);
    }

    localStorage.setItem(
        CHAVE_PRODUTOS,
        JSON.stringify(produtosTemporario)
    );

    return produtosTemporario;
}

export function salvarProdutos(produtos) {
    localStorage.setItem(
        CHAVE_PRODUTOS,
        JSON.stringify(produtos)
    );
}

export function adicionarProduto(produto) {
    const produtos = obterProdutos();

    const novoProduto = {
        ...produto,
        id: Date.now()
    };

    salvarProdutos([
        ...produtos,
        novoProduto
    ]);

    return novoProduto;
}

export function excluirProduto(id) {
    const produtos = obterProdutos();

    const novosProdutos = produtos.filter(
        (produto) => produto.id !== id
    );

    salvarProdutos(novosProdutos);
}

export function atualizarProduto(produtoAtualizado) {
    const produtos = obterProdutos();

    const novosProdutos = produtos.map(
        (produto) =>
            produto.id === produtoAtualizado.id
                ? produtoAtualizado
                : produto
    );

    salvarProdutos(novosProdutos);
}