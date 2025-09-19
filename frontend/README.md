# Define Pilates - Frontend

Frontend da aplicação Define Pilates construído com Next.js 15.

## 🚀 Como executar

### Pré-requisitos
- Docker e Docker Compose instalados
- Node.js 24+ (para desenvolvimento local)

### Executar com Docker (Recomendado)

1. **No diretório raiz do projeto**, execute:
```bash
docker-compose up --build
```

2. Acesse http://localhost:3000

### Executar localmente (Desenvolvimento)

1. Instale as dependências:
```bash
npm ci
```

2. Copie o arquivo de ambiente:
```bash
cp .env.example .env.local
```

3. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

## 🔧 Configuração

### Variáveis de Ambiente

Copie `.env.example` para `.env.local` e ajuste conforme necessário:

- `NEXT_PUBLIC_API_URL`: URL da API backend
- `NODE_ENV`: Ambiente de execução
- `NEXT_TELEMETRY_DISABLED`: Desabilita telemetria do Next.js

## 🐳 Docker

### Estrutura do Container
- **Imagem base**: node:24-alpine
- **Porta**: 3000
- **Ambiente**: Produção (otimizado)
- **Saída**: Standalone (auto-contido)

### Comandos Docker úteis

```bash
# Rebuild apenas o frontend
docker-compose up --build nextjs-frontend

# Ver logs do frontend
docker-compose logs -f nextjs-frontend

# Parar todos os containers
docker-compose down

# Limpar cache do Docker
docker system prune -a
```

## 🛠 Scripts Disponíveis

- `npm run dev`: Servidor de desenvolvimento
- `npm run build`: Build para produção
- `npm run start`: Servidor de produção

## 🔍 Solução de Problemas

### Container não inicia
1. Verifique se o Docker Desktop está executando
2. Execute `docker-compose down` e depois `docker-compose up --build`
3. Verifique os logs: `docker-compose logs nextjs-frontend`

### Erro de build
1. Limpe o cache: `docker system prune -a`
2. Rebuild com `--no-cache`: `docker-compose build --no-cache nextjs-frontend`

### Problemas de rede
- Verifique se a porta 3000 não está sendo usada por outro processo
- Verifique a conectividade com o backend na porta 8000

### Em outras máquinas
1. Certifique-se de que o Docker Desktop está instalado e rodando
2. Clone o repositório completo
3. Execute `docker-compose up --build` no diretório raiz
4. Aguarde o build completo (pode demorar na primeira vez)

## 📚 Tecnologias

- Next.js 15
- React 19
- TypeScript 5
- Tailwind CSS 4
- Docker (produção)
