FROM php:7.4-fpm

# WORKDIR /server

# EXPOSE 5000
# # sets env to node_modules in app
# ENV PATH /server/node_modules/.bin:$PATH

# # copies package.json from directory and installs packages
# COPY package*.json /server/
# RUN npm install

# # start command

RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    zip \
    unzip

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN curl -sL https://rpm.nodesource.com/setup | bash -

RUN apt-get install -y nodejs

RUN useradd -G www-data,root -u 1000 -d /home/shawn shawn
RUN mkdir -p /home/shawn/.composer && \
    chown -R shawn:shawn /home/shawn

COPY package*.json /server/

COPY composer.json /server/

RUN composer install

RUN npm install

RUN npm run dev

USER shawn

CMD ["npm", "run", "all"]