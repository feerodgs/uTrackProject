# Etapa de construção
FROM node:latest AS build

WORKDIR /app

# Copiar apenas os arquivos de dependências primeiro
COPY package.json ./
COPY package-lock.json ./

# Instalar as dependências
RUN npm ci --verbose

# Copiar o restante do código da aplicação
COPY . .

# Construir o aplicativo
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copiar os arquivos estáticos do build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expor a porta 80
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
