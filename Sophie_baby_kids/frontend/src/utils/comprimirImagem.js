export function comprimirImagem(arquivo, larguraMaxima = 1000, qualidade = 0.75) {
    return new Promise((resolve, reject) => {
        const leitor = new FileReader();

        leitor.onload = (evento) => {
            const imagem = new Image();

            imagem.onload = () => {
                const canvas = document.createElement("canvas");
                let largura = imagem.width;
                let altura = imagem.height;

                if (largura > larguraMaxima) {
                    altura = altura * (larguraMaxima / largura);
                    largura = larguraMaxima;
                }

                canvas.width = largura;
                canvas.height = altura;

                const contexto = canvas.getContext("2d");
                contexto.drawImage(imagem, 0, 0, largura, altura);

                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error("Falha ao comprimir imagem."));
                            return;
                        }
                        const arquivoComprimido = new File(
                            [blob],
                            arquivo.name.replace(/\.[^/.]+$/, "") + ".jpg",
                            { type: "image/jpeg" }
                        );
                        resolve(arquivoComprimido);
                    },
                    "image/jpeg",
                    qualidade
                );
            };

            imagem.onerror = reject;
            imagem.src = evento.target.result;
        };

        leitor.onerror = reject;
        leitor.readAsDataURL(arquivo);
    });
}