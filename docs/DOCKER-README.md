# Define Pilates - Ambiente Docker

Este projeto utiliza Docker e Docker Compose para criar um ambiente completo de desenvolvimento com Laravel (Backend), Next.js (Frontend), MySQL e MongoDB.

## Estrutura do Projeto

```
├── Backend/                    # Laravel Backend
│   ├── Dockerfile             # Dockerfile otimizado para desenvolvimento
│   └── .dockerignore         # Arquivos ignorados no build
├── frontend/                  # Next.js Frontend
│   ├── Dockerfile            # Dockerfile otimizado para desenvolvimento
│   └── .dockerignore        # Arquivos ignorados no build
├── database/                 # Scripts de inicialização
│   ├── mysql/
│   │   └── init.sql         # Script inicial do MySQL
│   └── mongodb/
│       └── init.js          # Script inicial do MongoDB
└── docker-compose.yml       # Configuração única para desenvolvimento
```## Serviços Disponíveis

- **Laravel Backend**: http://localhost:8000
- **Next.js Frontend**: http://localhost:3000
- **MySQL**: localhost:3306
- **MongoDB**: localhost:27017
- **PHPMyAdmin**: http://localhost:8080
- **Mongo Express**: http://localhost:8081

## Como Usar

### 1. Pré-requisitos
- Docker instalado
- Docker Compose instalado

### 2. Executar o ambiente

```bash
# Subir todos os containers
docker-compose up -d

# Ver logs dos containers
docker-compose logs -f

# Parar todos os containers
docker-compose down

# Parar e remover volumes (CUIDADO: apaga dados do banco)
docker-compose down -v
```

### 3. Comandos úteis

```bash
# Rebuild containers
docker-compose build

# Rebuild e subir
docker-compose up --build

# Executar comando no container Laravel
docker-compose exec laravel-backend php artisan migrate

# Executar comando no container Next.js
docker-compose exec nextjs-frontend npm install

# Acessar shell do container
docker-compose exec laravel-backend bash
docker-compose exec nextjs-frontend sh
```

## Configurações do Banco

### MySQL
- Host: `mysql` (dentro dos containers) ou `localhost` (da máquina host)
- Porta: 3307 (host) / 3306 (container)
- Database: `define_pilates`
- Usuário: `root` / `laravel`
- Senha: `password`

### MongoDB
- Host: `mongodb` (dentro dos containers) ou `localhost` (da máquina host)
- Porta: 27017
- Database: `define_pilates_mongo`
- Usuário: `admin` / `laravel`
- Senha: `password`

## Variáveis de Ambiente

As variáveis estão configuradas no `docker-compose.yml`. Para produção, considere usar arquivos `.env` separados.

## Desenvolvimento

### Características do ambiente:

- **Laravel**: Usa servidor PHP embutido (`php artisan serve`) para hot-reload
- **Next.js**: Servidor de desenvolvimento com hot-reload automático
- **Volumes mapeados**: Mudanças no código são refletidas instantaneamente
- **MongoDB**: Extensão mais recente (1.21.0) para compatibilidade total

### Para usar:
```bash
# Subir ambiente completo
docker-compose up -d

# Ver logs em tempo real
docker-compose logs -f
```

## Troubleshooting

### Problemas comuns:

1. **Porta já em uso**: Altere as portas no `docker-compose.yml`
2. **Permissões Laravel**: Execute `docker-compose exec laravel-backend chown -R www-data:www-data storage bootstrap/cache`
3. **Banco não conecta**: Verifique se os containers dos bancos subiram corretamente

### Logs úteis:
```bash
docker-compose logs laravel-backend
docker-compose logs nextjs-frontend
docker-compose logs mysql
docker-compose logs mongodb
```
