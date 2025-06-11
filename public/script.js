document.getElementById('uploadForm').addEventListener('submit', async function(event) {
    event.preventDefault();

    const fileInput = document.getElementById('fileInput');
    const statusDiv = document.getElementById('status');
    const resultDiv = document.getElementById('result');

    if (fileInput.files.length === 0) {
        statusDiv.textContent = 'Por favor, selecione um arquivo.';
        return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    statusDiv.textContent = 'Enviando e processando... Por favor, aguarde. 🙏';
    resultDiv.style.display = 'none';

    // O URL agora é um caminho relativo para nossa API!
    const functionUrl = '/api/converter'; 

    try {
        const response = await fetch(functionUrl, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Erro na API: ${errorText}`);
        }

        // A resposta agora é o próprio arquivo de imagem (um "blob")
        const imageBlob = await response.blob();
        
        // Criamos um URL local no navegador para o arquivo recebido
        const objectURL = URL.createObjectURL(imageBlob);

        statusDiv.textContent = 'Arquivo processado com sucesso! 🎉';
        document.getElementById('downloadLink').href = objectURL;
        // Para o nome do arquivo no download
        document.getElementById('downloadLink').download = `convertido-${file.name.split('.')[0]}.png`; 
        document.getElementById('resultImage').src = objectURL;
        resultDiv.style.display = 'block';

    } catch (error) {
        console.error('Erro no processo:', error);
        statusDiv.textContent = `Falha na conversão: ${error.message}`;
    }
});