#!/bin/bash
set -e

cd /var/www

echo "[dev] Checando vendor..."
# if [ ! -f vendor/autoload.php ]; then
echo "[dev] vendor vazio: executando composer install"
composer install
# fi

# Gera key se necessário
if grep -q "APP_KEY=" .env 2>/dev/null; then
  php artisan key:generate --force >/dev/null 2>&1 || true
fi

echo "[dev] Executando migrations (ignorado se falhar)"
php artisan migrate --force || true

echo "[dev] Limpando caches (rotas, config, views, eventos)"
php artisan optimize:clear || true

echo "[dev] Verificando necessidade de regenerar Swagger..."
SWAGGER_FILE="storage/api-docs/api-docs.json"
CONTROLLERS_DIR="app/Adapters/Http"

# if [ ! -f "$SWAGGER_FILE" ] || [ "$CONTROLLERS_DIR" -nt "$SWAGGER_FILE" ]; then
echo "[dev] Gerando documentação Swagger (arquivo desatualizado)..."
php artisan l5-swagger:generate || echo "[dev] AVISO: Falha ao gerar Swagger"


echo "[dev] Rotas registradas:"
php artisan route:list || true

echo "[dev] Iniciando servidor artisan em 0.0.0.0:8000"
exec php artisan serve --host=0.0.0.0 --port=8000
