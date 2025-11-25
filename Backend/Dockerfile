############################################################
# Dockerfile DEV - Laravel (vendor isolado em volume)
############################################################
FROM php:8.3-fpm

# Configurar timezone para America/Sao_Paulo
ENV TZ=America/Sao_Paulo
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Atualizar repositórios e instalar dependências base
RUN apt-get update && apt-get upgrade -y

# Instalar dependências do sistema separadamente para melhor debug
RUN apt-get install -y --no-install-recommends \
    git \
    unzip \
    curl \
    zip \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libonig-dev \
    libxml2-dev \
    libssl-dev \
    libcurl4-openssl-dev \
    pkg-config \
    tzdata \
    ca-certificates \
    openssl

# Configurar e instalar extensão GD
RUN docker-php-ext-configure gd --with-freetype --with-jpeg

# Instalar dependências do PostgreSQL
RUN apt-get update && apt-get install -y libpq-dev

# Atualizar certificados SSL do sistema
RUN update-ca-certificates

# Instalar extensões PHP uma por uma (melhor para debug)
RUN docker-php-ext-install pdo_mysql
RUN docker-php-ext-install pdo_pgsql
RUN docker-php-ext-install pgsql
RUN docker-php-ext-install mbstring
RUN docker-php-ext-install exif
RUN docker-php-ext-install pcntl
RUN docker-php-ext-install bcmath
RUN docker-php-ext-install gd
RUN docker-php-ext-install zip

# Instalar MongoDB via PECL
RUN pecl install mongodb \
    && docker-php-ext-enable mongodb

# Limpar cache do apt
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Instalar Composer
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Definir diretório de trabalho
WORKDIR /var/www

# Copiar manifestos do Composer
# COPY composer.json composer.lock ./


# Criar usuário não-root
RUN groupadd -g 1000 www 2>/dev/null || true
RUN useradd -u 1000 -ms /bin/bash -g www www 2>/dev/null || true

# Copiar entrypoint script
COPY dev-entrypoint.sh /usr/local/bin/dev-entrypoint.sh
RUN chmod +x /usr/local/bin/dev-entrypoint.sh

# Expor porta
EXPOSE 8000

# Comando padrão
CMD ["/usr/local/bin/dev-entrypoint.sh"]
