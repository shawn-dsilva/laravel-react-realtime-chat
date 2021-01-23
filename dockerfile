FROM php:7.3-fpm

# Copy current directory contents to directory /main in container
COPY . /var/www/

# Change current directory to /main
WORKDIR /var/www/

# Arguments defined in docker-compose.yml

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install PHP extensions
RUN docker-php-ext-install pdo_mysql mbstring exif pcntl bcmath gd

# Install Composer and NodeJS v12
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

# Install Composer and NPM packages
RUN composer install 
RUN npm install

# Create system user to run Composer and Artisan Commands
RUN chown -R root:root *