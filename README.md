# Projeto: Conversor de Arquivos com Serverless (FaaS)

Este projeto é uma prova de conceito de um sistema de conversão de arquivos baseado em computação serverless, utilizando a plataforma Vercel para hospedagem do frontend e execução da função FaaS (Function as a Service).

A aplicação permite que um usuário envie uma imagem (JPG ou PNG) através de uma interface web simples. Uma função serverless processa essa imagem, convertendo-a para tons de cinza, e retorna o resultado para download imediato no navegador.

## 🏛️ Diagrama da Arquitetura

A solução utiliza uma arquitetura simplificada e robusta, totalmente hospedada na Vercel, o que garante escalabilidade, facilidade de deploy e um generoso plano gratuito.

1.  **Usuário**: Acessa a aplicação web estática hospedada na Vercel.
2.  **Frontend (HTML/JS)**: O frontend, localizado na pasta `/public`, envia o arquivo selecionado pelo usuário para um endpoint de API.
3.  **Vercel Edge Network**: Roteia a requisição para a função serverless apropriada.
4.  **Função Serverless (Node.js)**: Uma função na pasta `/api` recebe o arquivo, processa a imagem em memória (convertendo para tons de cinza com a biblioteca `sharp`) e envia a imagem convertida diretamente na resposta da requisição.
5.  **Retorno e Download**: O frontend recebe a imagem processada como um `blob`, cria um URL de objeto e apresenta o link para download e uma prévia da imagem.

Aqui está a representação visual do fluxo da nossa aplicação:

```mermaid
graph TD
    subgraph "Plataforma Vercel"
        direction LR
        B[/"Frontend (Página Estática)"/]
        C[/("Função Serverless (Node.js)")/]
    end

    A[/"👤 Usuário (Navegador)"/]

    A -- "1. Upload de Imagem" --> B
    B -- "2. Requisição POST com a imagem" --> C
    C -- "3. Processamento em memória (com Sharp)" --> C
    C -- "4. Resposta com imagem processada" --> B
    B -- "5. Exibição e link de download" --> A
```

## 🚀 Tecnologias Utilizadas

- **Plataforma Serverless**: [Vercel](https://vercel.com/)
- **Linguagem da Função**: [Node.js](https://nodejs.org/)
- **Frontend**: HTML5, CSS3, JavaScript (Vanilla JS)
- **Processamento de Imagem**: Biblioteca [Sharp](https://sharp.pixelplumbing.com/) (para conversão rápida e eficiente)
- **Gerenciador de Pacotes**: [NPM](https://www.npmjs.com/)
- **Controle de Versão**: [Git](https://git-scm.com/) & [GitHub](https://github.com/)

## ✅ Requisitos Cumpridos

- **[✔] Função serverless responsável por processar o arquivo**: `api/converter.js` é a função FaaS.
- **[✔] Integração com sistema de armazenamento**: O armazenamento é efêmero (em memória), uma abordagem válida e eficiente para processamentos rápidos, com o resultado sendo transmitido diretamente ao cliente.
- **[✔] Interface web simples**: Uma página `index.html` funcional permite o envio do arquivo e o acesso ao resultado.
- **[✔] Registro de logs básicos**: A função utiliza `console.log()` para registrar eventos, que podem ser visualizados em tempo real no dashboard da Vercel.

## 🛠️ Instruções de Execução e Demonstração

Você pode testar a aplicação de duas formas: acessando a versão em produção ou executando localmente.

### 1. Acessando a Aplicação em Produção

A demonstração funcional está disponível no seguinte link:

**[➡️ Acessar o Conversor de Imagens](https://SEU_LINK_DO_VERCEL_AQUI)**

### 2. Executando o Projeto Localmente

**Pré-requisitos:**
* [Node.js](https://nodejs.org/en) (versão 18.x ou superior)

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

3.  **Instale a CLI da Vercel (se ainda não tiver):**
    ```bash
    npm install -g vercel
    ```

4.  **Inicie o ambiente de desenvolvimento local:**
    ```bash
    vercel dev
    ```

5.  Abra seu navegador e acesse [http://localhost:3000](http://localhost:3000). A aplicação estará funcionando como na versão em produção.

## ☁️ Processo de Deploy

O deploy para produção é automatizado pela Vercel. Qualquer `git push` para a branch `main` (ou `master`) do repositório no GitHub acionará um novo build e deploy da aplicação.