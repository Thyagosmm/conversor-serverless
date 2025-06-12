// --- PARTE 1: Feedback visual ao selecionar o arquivo ---
const fileInput = document.getElementById("fileInput");
const fileLabel = document.querySelector(".file-input-label");
const fileLabelText = document.querySelector(".file-input-label span");
const originalLabelText = fileLabelText.innerText; // Guarda o texto original do label

// Adiciona um "escutador" que é acionado sempre que um arquivo é escolhido
fileInput.addEventListener("change", function () {
  // Verifica se algum arquivo foi realmente selecionado
  if (fileInput.files.length > 0) {
    // Pega o nome do arquivo
    const fileName = fileInput.files[0].name;
    // Atualiza o texto do label com o nome do arquivo
    fileLabelText.innerText = `Arquivo: ${fileName}`;
    // Adiciona a classe 'file-selected' para o CSS aplicar o estilo verde
    fileLabel.classList.add("file-selected");
  } else {
    // Se o usuário cancelou a seleção, volta tudo ao estado inicial
    fileLabelText.innerText = originalLabelText;
    fileLabel.classList.remove("file-selected");
  }
});

// --- PARTE 2: Lógica de envio do formulário ---
document
  .getElementById("uploadForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

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

    // Reseta o visual do campo de seleção após o envio, para o próximo upload
    fileLabelText.innerText = originalLabelText;
    fileLabel.classList.remove("file-selected");

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
