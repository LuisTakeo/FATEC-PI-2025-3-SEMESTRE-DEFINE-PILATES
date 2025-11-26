#!/bin/bash
set -e

echo "[render] Iniciando aplicação Laravel..."


# Gerar chave da aplicação se necessário
# if ! grep -q "APP_KEY=base64:" .env 2>/dev/null; then
#     echo "[render] Gerando APP_KEY..."
#     php artisan key:generate --force
# fi

# Executar migrations
echo "[render] Executando migrations..."
php artisan migrate --force

# Limpar caches antes de tudo
echo "[render] Limpando caches antigos..."
php artisan config:clear || true
php artisan route:clear || true
php artisan cache:clear || true

# Cachear configurações (sem rotas para evitar problemas com health check)
echo "[render] Cacheando configurações..."
php artisan config:cache || echo "[render] AVISO: Falha ao cachear config"

# View cache só se o diretório existir
if [ -d "resources/views" ]; then
    php artisan view:cache || echo "[render] AVISO: Falha ao cachear views"
else
    echo "[render] Diretório resources/views não existe, pulando view:cache"
fi

# Gerar documentação Swagger
echo "[render] Gerando documentação Swagger..."
php artisan l5-swagger:generate || echo "[render] AVISO: Falha ao gerar Swagger"

# Verificar rotas disponíveis
echo "[render] Verificando rotas registradas..."
php artisan route:list --path=up || true

# Iniciar servidor
echo "[render] =========================================="
echo "[render] Porta configurada: ${PORT:-10000}"
echo "[render] Host: 0.0.0.0"
echo "[render] Health check: /up"
echo "[render] Iniciando servidor Laravel..."
echo "[render] =========================================="
exec php artisan serve --host=0.0.0.0 --port=${PORT:-10000}
