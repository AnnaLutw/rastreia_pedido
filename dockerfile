# 1️⃣ Usa uma imagem Node.js para construir o projeto
FROM node:20-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos do projeto para dentro do container
COPY package.json package-lock.json ./
RUN npm ci

# Copia o restante dos arquivos (código-fonte)
COPY . .

# Faz o build do Angular para produção
RUN npm run build

# 2️⃣ Usa a imagem do Nginx para servir a aplicação
FROM nginx:alpine

# Copia a build do Angular para o diretório de páginas do Nginx
COPY --from=build /app/dist/rastreia-pedido /usr/share/nginx/html

# Expõe a porta 80
EXPOSE 80

# Comando para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
