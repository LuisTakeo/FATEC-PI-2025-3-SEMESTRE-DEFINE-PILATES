# Use PHP 8.2 CLI for Symfony development
FROM php:8.2-cli

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    libssl-dev \
    pkg-config \
    libsasl2-dev \
    zip \
    unzip \
    nodejs \
    npm

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd zip

# Install MongoDB PHP extension (latest version)
RUN pecl install mongodb-1.21.0 && docker-php-ext-enable mongodb

# Get latest Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Install Symfony CLI
RUN curl -sS https://get.symfony.com/cli/installer | bash && \
    mv /root/.symfony*/bin/symfony /usr/local/bin/symfony

# Create user for Symfony
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Set working directory
WORKDIR /var/www

# Switch to non-root user
USER www

# Expose port 8001 (different from Laravel)
EXPOSE 8001

# Create start script
RUN echo '#!/bin/bash\n\
cd /var/www\n\
if [ ! -f "bin/console" ]; then\n\
    echo "Symfony project not found. Please ensure Symfony is properly installed."\n\
    sleep infinity\n\
fi\n\
symfony server:start --port=8001 --allow-http --no-tls\n\
' > /home/www/start-symfony.sh && chmod +x /home/www/start-symfony.sh

# Start Symfony server
CMD ["/home/www/start-symfony.sh"]
