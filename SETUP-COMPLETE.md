# ✅ Estrutura Docker Simplificada - Define Pilates

## 📁 Estrutura Final:
```
├── Backend/                    # Laravel Backend
│   ├── Dockerfile             # Container PHP CLI com hot-reload
│   └── .dockerignore
├── frontend/                  # Next.js Frontend
│   ├── Dockerfile            # Container Node.js com hot-reload
│   ├── package.json          # Dependências básicas Next.js
│   └── .dockerignore
├── database/                 # Scripts de inicialização
│   ├── mysql/init.sql
│   └── mongodb/init.js
└── docker-compose.yml       # Configuração única otimizada
```

## 🚀 Comandos principais:

### 1. **Criar projeto Laravel** (já feito):
```bash
cd Backend/
composer create-project laravel/laravel . --prefer-dist
composer require laravel/breeze --dev
php artisan breeze:install api
```

### 2. **Subir ambiente**:
```bash
# Subir todos os serviços
docker-compose up -d

# Ver logs
docker-compose logs -f

# Parar
docker-compose down
```

### 3. **Instalar MongoDB no Laravel**:
```bash
# Dentro do container (extensão 1.21.0 já instalada)
docker-compose exec laravel-backend composer require mongodb/laravel-mongodb
```

### 4. **Comandos Laravel úteis**:
```bash
# Executar migrations
docker-compose exec laravel-backend php artisan migrate

# Criar migration
docker-compose exec laravel-backend php artisan make:migration create_example_table

# Acessar shell do container
docker-compose exec laravel-backend bash
```

## 🌐 **Acessos**:
- **Laravel**: http://localhost:8000
- **Next.js**: http://localhost:3000 (quando criado)
- **MySQL**: localhost:3307
- **MongoDB**: localhost:27017
- **PHPMyAdmin**: http://localhost:8080
- **Mongo Express**: http://localhost:8081

## ✨ **Características**:
- ✅ **Hot-reload** automático Laravel e Next.js
- ✅ **MongoDB 1.21.0** instalado e compatível
- ✅ **Volumes mapeados** para desenvolvimento ágil
- ✅ **Estrutura simplificada** - apenas um docker-compose.yml
- ✅ **Bancos pré-configurados** com scripts de inicialização

## 🎯 **Próximos passos**:
1. **Criar projeto Next.js** na pasta `frontend/`
2. **Configurar .env** do Laravel para os bancos
3. **Criar migrations** para o sistema de Pilates
4. **Instalar MongoDB** no Laravel: `docker-compose exec laravel-backend composer require mongodb/laravel-mongodb`

Ambiente pronto para desenvolvimento! 🚀
