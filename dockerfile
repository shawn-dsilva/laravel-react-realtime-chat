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
    unzip \
    libpq-dev  libgd3 libgd-dev \
    libwebp-dev \
    libjpeg62-turbo-dev \
    libpng-dev libxpm-dev \
    libfreetype6-dev

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

RUN docker-php-ext-configure pgsql -with-pgsql=/usr/local/pgsql
RUN docker-php-ext-configure gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_pgsql mbstring exif pcntl bcmath gd

# Install Composer and NodeJS v12
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

# Install Composer and NPM packages
RUN composer install 
RUN npm install

# Create system user to run Composer and Artisan Commands
RUN chown -R root:root *

# Creates php.ini file from php.ini-production, lets php-fpm return correct status codes
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini

