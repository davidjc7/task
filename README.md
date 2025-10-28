BACKEND

# Passo 1: Configuração do Projeto e Dependências
## 1. Crie a pasta backend e acesse ela
mkdir backend
cd backend

## 2. Iniciar um projeto Node.js
npm init -y

## 3. Adicione "type": "module" ao seu package.json para habilitar os módulos ES:package.json
"type": "module",
  "scripts": {
    "dev": "nodemon src/index.js",
    "start": "node src/index.js",
    "prisma:dev": "npx prisma migrate dev",
    "prisma:gen": "npx prisma generate"
  },

## 3. Instalar as dependências principais: express, cors e @prisma/client
npm install express cors @prisma/client

## 4.Dependências de desenvolvimento
npm install -D prisma nodemon

# Passo 2: Configuração do Prisma (ORM)
## 1. Inicie o Prisma. Usaremos sqlite por ser mais simples de configurar:
npx prisma init --datasource-provider sqlite

## 2. Configure seu modelo Task no arquivo prisma/schema.prisma e depois rode o comando:
npx prima generate

## 3. Configure o arquivo .env (já deve ter sido criado):
DATABASE_URL="file:./prisma/dev.db"

## 4. Execute a primeira migração para criar o banco de dados e a tabela Task:
npx prisma migrate dev --name init

# Passo 3: O Código do Backend
## TaskController.js
## taskRoutes.js
## index.js

========================================================
FRONTEND

# Passo 1: Iniciar o Projeto Vite e Instalar o Axios
npm create vite@latest frontend
cd frontend
npm install

## Vamos usar o axios para facilitar as requisições HTTP:
pm install axios

# Passo 2: Serviço da API
## src/services/api.js