// Verifica se a cor é "Colorido"
export const isCorColorido = (cor) => {
    if (!cor) return false;
    const nome = typeof cor === 'string' ? cor : cor.nome;
    return nome === "Colorido" || nome === "colorido";
};

// Retorna o estilo da cor 
export const getCorStyle = (cor) => {
    if (!cor) return {};
    
    if (isCorColorido(cor)) {
        return {
            background: "conic-gradient(red, orange, yellow, green, blue, indigo, violet)"
        };
    }
    
    const codigo = typeof cor === 'string' ? cor : cor.codigo;
    return { backgroundColor: codigo };
};

// Retorna a classe CSS para a cor
export const getCorClass = (cor) => {
    if (isCorColorido(cor)) {
        return "colorido";
    }
    return "";
};