###################################################################################################
# Dockerfile (DEV ONLY) - pi-react
# Simplificado para desenvolvimento local com Vite (hot reload)
# Se futuramente precisar de build de produção, podemos reintroduzir multi-stage.
# Uso:
#   docker build -t pi-react-dev .
#   docker run --rm -it -p 5173:5173 -v ${PWD}:/app -v pi_react_node_modules:/app/node_modules pi-react-dev
###################################################################################################

ARG NODE_VERSION=22.14.0
FROM node:${NODE_VERSION}-alpine

WORKDIR /app
ENV NODE_ENV=development

# Dependências de sistema úteis (git para pacotes e bash para scripts)
RUN apk add --no-cache git bash

# Copiamos manifests primeiro para cache das dependências
COPY package*.json ./

# Instala dependências incluindo dev
RUN --mount=type=cache,target=/root/.npm npm install

# (Opcional) Copiar código. Mantemos comentado para usar bind mount e rebuild instantâneo.
# COPY . .

EXPOSE 5173

# Executa Vite acessível de fora do container
CMD ["npm","run","dev","--","--host","0.0.0.0"]

# FIM
