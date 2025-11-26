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

# Limpar e cachear configurações
echo "[render] Otimizando aplicação..."
php artisan config:cache
# Não cacheia rotas em produção para evitar problemas com health check
# php artisan route:cache

# View cache só se o diretório existir
if [ -d "resources/views" ]; then
    php artisan view:cache || echo "[render] AVISO: Falha ao cachear views"
else
    echo "[render] Diretório resources/views não existe, pulando view:cache"
fi

# Gerar documentação Swagger
echo "[render] Gerando documentação Swagger..."
php artisan l5-swagger:generate || echo "[render] AVISO: Falha ao gerar Swagger"

# Iniciar servidor
echo "[render] Iniciando servidor na porta ${PORT:-8000}..."
exec php artisan serve --host=0.0.0.0 --port=${PORT:-8000}
