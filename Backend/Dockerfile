############################################################
# Dockerfile DEV - Laravel (vendor isolado em volume)
############################################################
FROM php:8.2-cli

# Dependências de sistema e extensões PHP
RUN apt-get update && apt-get install -y --no-install-recommends \
    git unzip libpng-dev libjpeg-dev libfreetype6-dev libzip-dev \
    libonig-dev libxml2-dev libssl-dev libcurl4-openssl-dev pkg-config \
  && docker-php-ext-configure gd --with-freetype --with-jpeg \
  && docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip \
  && pecl install mongodb \
  && docker-php-ext-enable mongodb \
  && rm -rf /var/lib/apt/lists/*


# Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

# Apenas manifestos para cache de layer (composer install será feito em runtime dev)
COPY composer.json composer.lock ./

# Usuário não-root (opcional)
RUN groupadd -g 1000 www && useradd -u 1000 -ms /bin/bash -g www www || true

# Entry script (montado também pelo bind mount, mas copiamos fallback)
COPY dev-entrypoint.sh /usr/local/bin/dev-entrypoint.sh
RUN chmod +x /usr/local/bin/dev-entrypoint.sh || true

EXPOSE 8000

CMD ["/usr/local/bin/dev-entrypoint.sh"]
