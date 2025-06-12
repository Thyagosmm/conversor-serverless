# Projeto: Conversor de Arquivos com Serverless (FaaS)

Este projeto é uma prova de conceito de um sistema de conversão de arquivos baseado em computação serverless, utilizando a plataforma Vercel para hospedagem do frontend e execução da função FaaS (Function as a Service).

A aplicação permite que um usuário envie uma imagem (JPG ou PNG) através de uma interface web simples. Uma função serverless processa essa imagem, convertendo-a para preto e branco, salva o resultado em um serviço de armazenamento em nuvem (Cloudinary) e retorna um link público para visualização e download.

## 🏛️ Arquitetura

A solução utiliza uma arquitetura serverless moderna, combinando a Vercel para computação e hospedagem com o Cloudinary para armazenamento persistente de mídia.

1.  **Usuário**: Acessa a aplicação web estática hospedada na Vercel.
2.  **Frontend (HTML/JS)**: A interface, localizada na pasta /public, envia o arquivo de imagem selecionado pelo usuário para um endpoint da nossa API (/api/converter).
3.  **Vercel Edge Network**: Roteia a requisição HTTP de forma otimizada para a instância mais próxima da nossa função serverless.
4.  **Função Serverless (Node.js)**: A função na pasta /api é executada. Ela: a. Recebe o arquivo de imagem. b. Processa a imagem em memória, convertendo-a para preto e branco com a biblioteca sharp. c. Faz o upload da imagem processada para o Cloudinary.
5.  **Retorno e Download**: O Cloudinary armazena a imagem e retorna uma URL segura. A função envia essa URL de volta para o frontend em um JSON. A interface então exibe a imagem e o link para download.

## 🚀 Tecnologias Utilizadas

- **Plataforma Serverless**: [Vercel](https://vercel.com/)
- **Armazenamento de Objetos**: Cloudinary (para armazenamento e entrega de mídia)
- **Linguagem da Função**: [Node.js](https://nodejs.org/)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Processamento de Imagem**: Biblioteca [Sharp](https://sharp.pixelplumbing.com/) (para conversão rápida e eficiente)
- **Gerenciador de Pacotes**: [NPM](https://www.npmjs.com/)
- **Controle de Versão**: [Git](https://git-scm.com/) & [GitHub](https://github.com/)

## ✅ Requisitos Cumpridos

- **[✔] Função serverless responsável por processar o arquivo**: `api/converter.js` é a função FaaS que orquestra todo o processo.
- **[✔] Integração com sistema de armazenamento**: A função integra-se com o Cloudinary para salvar (upload) e disponibilizar (download) os arquivos processados de forma persistente.
- **[✔] Interface web simples**: Uma página `index.html` funcional permite o envio do arquivo e o acesso ao resultado.
- **[✔] Registro de logs básicos**: A função utiliza `console.log()` para registrar os principais passos da execução (recebimento, processamento, upload), que podem ser inspecionados no painel da Vercel.

## 🛠️ Instruções de Execução e Demonstração

Você pode testar a aplicação de duas formas: acessando a versão em produção ou executando localmente.

### 1. Acessando a Aplicação em Produção

A demonstração funcional está disponível no seguinte link:

**[➡️ Acessar o Conversor de Imagens](https://conversor-serverless.vercel.app)**

### 2. Executando o Projeto Localmente

**Pré-requisitos:**

- [Node.js](https://nodejs.org/en) (versão 18.x ou superior)
- Uma conta gratuita no Cloudinary.

**Passo a passo:**

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Thyagosmm/conversor-serverless
    cd conversor-serverless
    ```

2.  **Instale as dependências do projeto:**

    ```bash
    npm install
    ```
3.  **Configure as Variáveis de Ambiente:**

- Crie um arquivo chamado `.env.local` na raiz do projeto.
- Adicione suas chaves do Cloudinary a este arquivo:

```bash
    CLOUDINARY_CLOUD_NAME="SEU_CLOUD_NAME"
    CLOUDINARY_API_KEY="SUA_API_KEY"
    CLOUDINARY_API_SECRET="SEU_API_SECRET"
```
- O ambiente de desenvolvimento da Vercel (vercel dev) carregará essas variáveis automaticamente.

4.  **Instale a CLI da Vercel (se ainda não tiver):**

    ```bash
    npm install -g vercel
    ```

5.  **Inicie o ambiente de desenvolvimento local:**

    ```bash
    vercel dev
    ```

6.  Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000). A aplicação estará funcionando como na versão em produção.

## ☁️ Processo de Deploy

O deploy para produção é automatizado pela Vercel. Qualquer `git push` para a branch `main` (ou `master`) do repositório no GitHub acionará um novo build e deploy da aplicação.

OBS: Para que o deploy em produção funcione, é fundamental que as mesmas variáveis de ambiente do Cloudinary (CLOUDINARY_CLOUD_NAME, etc.) estejam configuradas no painel do projeto na Vercel, em Settings > Environment Variables.