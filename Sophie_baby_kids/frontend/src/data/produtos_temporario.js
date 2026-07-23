import vestidoVermelho from "../assets/products/vestido-vermelho.jpg";
import conjunto from "../assets/products/conjunto.png";
import macacao from "../assets/products/macacao.jpg";
import vestidoAzul from "../assets/products/vestido-azul.jpg";

const produtos_temporario = [
    {
        id: 1,
        nome: "Vestido Vermelho",
        preco: 79.90,
        imagem: vestidoVermelho,
        categoria: "Meninas",
        descricao:
            "Vestido infantil confortável e perfeito para diversas ocasiões.",
        faixaEtaria: "2 a 6 anos",
        material: "100% Algodão",
        cores: [
            {
                nome: "Vermelho",
                codigo: "#E53935"
            },
            {
                nome: "Rosa",
                codigo: "#FF97C0"
            }
        ],
        tamanhos: [
            "P",
            "M",
            "G"
        ]
    },

    {
        id: 2,
        nome: "Conjunto Infantil",
        preco: 89.90,
        imagem: conjunto,
        categoria: "Meninas",
        descricao:
            "Conjunto infantil confortável para o dia a dia.",
        faixaEtaria: "4 a 8 anos",
        material: "Algodão",
        cores: [
            {
                nome: "Azul",
                codigo: "#32A0B9"
            },
            {
                nome: "Amarelo",
                codigo: "#FEEA00"
            }
        ],
        tamanhos: [
            "P",
            "M",
            "G"
        ]
    },

    {
        id: 3,
        nome: "Macacão Bebê",
        preco: 69.90,
        imagem: macacao,
        categoria: "Bebês",
        descricao:
            "Macacão confortável e delicado para bebês.",
        faixaEtaria: "0 a 2 anos",
        material: "Algodão",
        cores: [
            {
                nome: "Azul",
                codigo: "#32A0B9"
            },
            {
                nome: "Rosa",
                codigo: "#FF97C0"
            }
        ],
        tamanhos: [
            "P",
            "M"
        ]
    },

    {
        id: 4,
        nome: "Vestido Azul",
        preco: 99.90,
        imagem: vestidoAzul,
        categoria: "Meninas",
        descricao:
            "Vestido infantil leve e confortável.",
        faixaEtaria: "2 a 6 anos",
        material: "Algodão",
        cores: [
            {
                nome: "Azul",
                codigo: "#32A0B9"
            },
            {
                nome: "Rosa",
                codigo: "#FF97C0"
            }
        ],
        tamanhos: [
            "P",
            "M",
            "G"
        ]
    }
];

export default produtos_temporario;