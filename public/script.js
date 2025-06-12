document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const fileInput = document.getElementById("fileInput");
    const statusDiv = document.getElementById("status");
    const resultDiv = document.getElementById("result");

    if (fileInput.files.length === 0) {
      statusDiv.textContent = "Por favor, selecione um arquivo.";
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("file", file);

    statusDiv.textContent = "Enviando e processando... Por favor, aguarde. 🙏";
    resultDiv.style.display = "none";

    const functionUrl = "/api/converter";

    try {
      const response = await fetch(functionUrl, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro na API: ${errorText}`);
      }

      // A resposta agora é um JSON com a URL do Cloudinary
      const data = await response.json();

      statusDiv.textContent = "Arquivo processado com sucesso! 🎉";
      document.getElementById("downloadLink").href = data.downloadUrl;
      document.getElementById("resultImage").src = data.downloadUrl;
      resultDiv.style.display = "block";
    } catch (error) {
      console.error("Erro no processo:", error);
      statusDiv.textContent = `Falha na conversão: ${error.message}`;
    }
  });
