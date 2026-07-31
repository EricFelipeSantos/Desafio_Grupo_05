// muda pela API
export const publicoCategorias = [
    {
        id: 'U',
        nome: 'Primeiros Passos',
        slug: 'primeiros-passos',
        categorias: [
            { id: 1, nome: 'Vestidos', slug: 'vestidos' },
            { id: 2, nome: 'Conjuntos', slug: 'conjuntos' },
            { id: 3, nome: 'Blusas', slug: 'blusas' },
            { id: 4, nome: 'Calças', slug: 'calcas' },
            { id: 5, nome: 'Shorts', slug: 'shorts' },
            { id: 6, nome: 'Macacões', slug: 'macacoes' },
            { id: 7, nome: 'Outras peças', slug: 'outras-pecas' },
        ]
    },
    {
        id: 'F',
        nome: 'Meninas',
        slug: 'meninas',
        categorias: [
            { id: 1, nome: 'Vestidos', slug: 'vestidos' },
            { id: 2, nome: 'Conjuntos', slug: 'conjuntos' },
            { id: 3, nome: 'Blusas', slug: 'blusas' },
            { id: 4, nome: 'Calças', slug: 'calcas' },
            { id: 5, nome: 'Shorts', slug: 'shorts' },
            { id: 6, nome: 'Macacões', slug: 'macacoes' },
            { id: 7, nome: 'Outras peças', slug: 'outras-pecas' },
        ]
    },
    {
        id: 'M',
        nome: 'Meninos',
        slug: 'meninos',
        categorias: [
            { id: 2, nome: 'Conjuntos', slug: 'conjuntos' },
            { id: 3, nome: 'Blusas', slug: 'blusas' },
            { id: 4, nome: 'Calças', slug: 'calcas' },
            { id: 5, nome: 'Shorts', slug: 'shorts' },
            { id: 6, nome: 'Macacões', slug: 'macacoes' },
            { id: 7, nome: 'Outras peças', slug: 'outras-pecas' },
        ]
    },
    {
        id: 'B',
        nome: 'Bebês',
        slug: 'bebes',
        categorias: [
            { id: 8, nome: 'Enxoval', slug: 'enxoval' },
            { id: 9, nome: 'Body', slug: 'body' },
            { id: 6, nome: 'Macacões', slug: 'macacoes' },
            { id: 10, nome: 'Mijão', slug: 'mijao' },
            { id: 2, nome: 'Conjuntos', slug: 'conjuntos' },
            { id: 7, nome: 'Outras peças', slug: 'outras-pecas' },
        ]
    }
];

// Função para buscar categorias de um público específico
export function getCategoriasPorPublico(publicoId) {
    const publico = publicoCategorias.find(p => p.id === publicoId);
    return publico ? publico.categorias : [];
}

// Função para buscar o nome do público
export function getPublicoNome(publicoId) {
    const publico = publicoCategorias.find(p => p.id === publicoId);
    return publico ? publico.nome : publicoId;
}