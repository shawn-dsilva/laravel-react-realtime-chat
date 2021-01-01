FROM php:7.3-fpm

# WORKDIR /server

# EXPOSE 5000
# # sets env to node_modules in app
# ENV PATH /server/node_modules/.bin:$PATH

# # copies package.json from directory and installs packages
# COPY package*.json /server/
# RUN npm install

# # start command

WORKDIR /home/admin/main

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash -

RUN apt-get install -y nodejs

RUN useradd -G www-data,root -u 1000 -d /home/admin admin
RUN mkdir -p /home/admin/.composer && \
    chown -R admin:admin /home/admin

COPY package*.json /home/admin/main/

COPY composer.json /home/admin/main/
COPY composer.lock /home/admin/main/

RUN composer install

RUN npm install

RUN npm run dev

USER admin

CMD ["npm", "run", "all"]