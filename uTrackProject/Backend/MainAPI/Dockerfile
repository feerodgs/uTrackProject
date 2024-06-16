# Use a imagem oficial do Node.js como base
FROM node:14

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos de configuração do Node.js para o diretório de trabalho
COPY package.json package-lock.json ./

# Instale as dependências
RUN npm install

# Copie o restante da aplicação para o diretório de trabalho
COPY . .

# Exponha a porta que a aplicação irá rodar
EXPOSE 3000

# Comando para rodar a aplicação
CMD ["node", "src/index.js"]
