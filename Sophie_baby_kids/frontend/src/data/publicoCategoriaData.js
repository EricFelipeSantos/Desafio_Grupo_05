export const publicoCategorias = [
    {
        id: 'U',
        nome: 'Primeiros Passos',
        slug: 'primeiros-passos',
        categorias: [
            { id: 1, nome: 'Vestidos', slug: 'vestidos' },
            { id: 2, nome: 'Conjuntos verão', slug: 'conjuntos-verao' },
            { id: 3, nome: 'Pijamas', slug: 'pijamas' },
            { id: 4, nome: 'Calças jeans', slug: 'calcas-jeans' },
            { id: 5, nome: 'Shorts', slug: 'shorts' },
            { id: 6, nome: 'Leggings', slug: 'leggings' },
            { id: 7, nome: 'Bermudas', slug: 'bermudas' },
        ]
    },
    {
        id: 'F',
        nome: 'Meninas',
        slug: 'meninas',
        categorias: [
            { id: 1, nome: 'Vestidos', slug: 'vestidos' },
            { id: 2, nome: 'Conjuntos verão', slug: 'conjuntos-verao' },
            { id: 3, nome: 'Pijamas', slug: 'pijamas' },
            { id: 4, nome: 'Calças jeans', slug: 'calcas-jeans' },
            { id: 5, nome: 'Shorts', slug: 'shorts' },
            { id: 6, nome: 'Leggings', slug: 'leggings' },
            { id: 8, nome: 'Conjuntos manga longa', slug: 'conjuntos-manga-longa' },
            { id: 9, nome: 'Bodys manga longa', slug: 'bodys-manga-longa' },
            { id: 10, nome: 'Bodys manga curta', slug: 'bodys-manga-curta' },
            { id: 11, nome: 'Mijões', slug: 'mijoes' },
            { id: 12, nome: 'Tapa fralda', slug: 'tapa-fralda' },
            { id: 13, nome: 'Saída de maternidade', slug: 'saida-de-maternidade' },
            { id: 14, nome: 'Macacões', slug: 'macacoes' },
        ]
    },
    {
        id: 'M',
        nome: 'Meninos',
        slug: 'meninos',
        categorias: [
            { id: 2, nome: 'Conjuntos verão', slug: 'conjuntos-verao' },
            { id: 3, nome: 'Pijamas', slug: 'pijamas' },
            { id: 4, nome: 'Calças jeans', slug: 'calcas-jeans' },
            { id: 7, nome: 'Bermudas', slug: 'bermudas' },
            { id: 8, nome: 'Conjuntos manga longa', slug: 'conjuntos-manga-longa' },
            { id: 9, nome: 'Bodys manga longa', slug: 'bodys-manga-longa' },
            { id: 10, nome: 'Bodys manga curta', slug: 'bodys-manga-curta' },
            { id: 11, nome: 'Mijões', slug: 'mijoes' },
            { id: 12, nome: 'Tapa fralda', slug: 'tapa-fralda' },
            { id: 13, nome: 'Saída de maternidade', slug: 'saida-de-maternidade' },
            { id: 14, nome: 'Macacões', slug: 'macacoes' },
        ]
    },
    {
        id: 'B',
        nome: 'Bebês',
        slug: 'bebes',
        categorias: [
            { id: 2, nome: 'Conjuntos verão', slug: 'conjuntos-verao' },
            { id: 8, nome: 'Conjuntos manga longa', slug: 'conjuntos-manga-longa' },
            { id: 9, nome: 'Bodys manga longa', slug: 'bodys-manga-longa' },
            { id: 10, nome: 'Bodys manga curta', slug: 'bodys-manga-curta' },
            { id: 11, nome: 'Mijões', slug: 'mijoes' },
            { id: 12, nome: 'Tapa fralda', slug: 'tapa-fralda' },
            { id: 13, nome: 'Saída de maternidade', slug: 'saida-de-maternidade' },
            { id: 14, nome: 'Macacões', slug: 'macacoes' },
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