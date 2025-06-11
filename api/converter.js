const busboy = require('busboy');
const sharp = require('sharp');

// A Vercel exporta a função que vai lidar com a requisição/resposta
module.exports = async (request, response) => {
    // A função só aceita o método POST
    if (request.method !== 'POST') {
        response.status(405).send('Method Not Allowed');
        return;
    }

    // Usamos o Busboy para processar o formulário 'multipart/form-data'
    const bb = busboy({ headers: request.headers });
    
    // Pipe da requisição para o parser
    request.pipe(bb);

    bb.on('file', (fieldname, file,
         info) => {
        const { filename, encoding, mimeType } = info;
        console.log(`Log da Função: Recebendo arquivo: ${filename}, MimeType: ${mimeType}`);

        // Criamos o pipeline de processamento com a biblioteca Sharp
        const imageProcessor = sharp()
            .grayscale() // Converte para tons de cinza
            .png({ quality: 80 }); // Define o formato de saída para PNG

        // O stream do arquivo de upload é "jogado" dentro do processador
        const processingStream = file.pipe(imageProcessor);

        // Definimos os cabeçalhos da resposta para indicar que estamos enviando um arquivo de imagem
        response.setHeader('Content-Type', 'image/png');
        response.setHeader('Content-Disposition', `attachment; filename="converted-${Date.now()}.png"`);
        
        console.log('Log da Função: Imagem processada. Enviando resposta...');

        // O resultado do processamento é "jogado" diretamente na resposta HTTP
        processingStream.pipe(response);
    });

    bb.on('finish', () => {
        console.log('Log da Função: Processamento do formulário concluído.');
    });

    bb.on('error', err => {
        console.error('Log da Função: Erro no Busboy:', err);
        if (!response.headersSent) {
            response.status(500).send('Erro ao processar o upload.');
        }
    });
};