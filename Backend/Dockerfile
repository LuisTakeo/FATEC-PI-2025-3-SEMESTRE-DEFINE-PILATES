# Etapa 1: Composer install
FROM composer:2.8 AS composer

WORKDIR /app
COPY composer.json composer.lock ./
RUN composer update --no-scripts

# Etapa 2: PHP + app
FROM php:8.2-cli

# Instala dependências do sistema necessárias para extensões PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    && rm -rf /var/lib/apt/lists/*

# Instala extensões PHP
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Copia o Composer para a imagem final
COPY --from=composer:2.7.6 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
COPY . .
COPY --from=composer /app/vendor ./vendor

# Cria usuário para o Laravel
RUN groupadd -g 1000 www \
    && useradd -u 1000 -ms /bin/bash -g www www

EXPOSE 8000

# Cria script de inicialização
RUN echo '#!/bin/bash\n\
cd /var/www\n\
if [ ! -f "artisan" ]; then\n\
    echo "Laravel project not found. Please ensure Laravel is properly installed."\n\
    sleep infinity\n\
fi\n\
# Instala dependências se vendor não existir\n\
if [ ! -d "vendor" ]; then\n\
    echo "Installing Composer dependencies..."\n\
    composer install --no-scripts --no-dev --optimize-autoloader\n\
fi\n\
# Ajusta permissões\n\
chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache 2>/dev/null || true\n\
# Inicia o servidor\n\
php artisan serve --host=0.0.0.0 --port=8000\n\
' > /usr/local/bin/start-laravel.sh && chmod +x /usr/local/bin/start-laravel.sh

CMD ["/usr/local/bin/start-laravel.sh"]
