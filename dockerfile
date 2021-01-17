FROM php:7.3-fpm

# Copy current directory contents to directory /main in container
COPY . /main/

# Change current directory to /main
WORKDIR /main

# Install prerequisites
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip 

# Install PHP specific extensions within docker
RUN docker-php-ext-install mysqli pdo pdo_mysql 

# Install Composer and NodeJS v12
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -
RUN apt-get install -y nodejs

# Install Composer and NPM packages
RUN composer install 
RUN npm install
