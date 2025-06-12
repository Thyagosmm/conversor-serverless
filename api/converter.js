const busboy = require("busboy");
const sharp = require("sharp");
const cloudinary = require("cloudinary").v2;

// Configura o Cloudinary com as variáveis de ambiente
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

module.exports = async (request, response) => {
  if (request.method !== "POST") {
    return response.status(405).send("Method Not Allowed");
  }

  const bb = busboy({ headers: request.headers });
  request.pipe(bb);

  bb.on("file", (fieldname, file, info) => {
    const { filename } = info;
    console.log(`Log: Arquivo recebido na função: ${filename}`);

    const buffers = [];
    file.on("data", (data) => {
      buffers.push(data);
    });

    file.on("end", async () => {
      try {
        const imageBuffer = Buffer.concat(buffers);

        console.log("Log: Processando imagem para preto e branco...");
        const processedBuffer = await sharp(imageBuffer)
          .grayscale()
          .png({ quality: 80 })
          .toBuffer();
        console.log("Log: Imagem processada com sucesso.");

        // Faz o upload do buffer processado para o Cloudinary
        console.log("Log: Enviando imagem para o Cloudinary...");
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "conversor-serverless", resource_type: "image" },
          (error, result) => {
            if (error) {
              console.error(
                "Log de Erro: Falha no upload para o Cloudinary:",
                error
              );
              return response
                .status(500)
                .json({ message: "Erro ao salvar o arquivo processado." });
            }

            console.log(`Log: Upload concluído. URL: ${result.secure_url}`);
            // Retorna um JSON com o link público do Cloudinary
            return response
              .status(200)
              .json({ downloadUrl: result.secure_url });
          }
        );

        // Envia o buffer para o stream de upload
        uploadStream.end(processedBuffer);
      } catch (error) {
        console.error("Log de Erro: Falha no processamento da imagem:", error);
        return response
          .status(500)
          .json({ message: "Erro ao processar a imagem." });
      }
    });
  });
};
