composer update 
composer require react/promise:^2.7
composer require pusher/pusher-php-server "~4.0"
php artisan key:generate
php artisan storage:link  
php artisan migrate:fresh --seed 
php artisan passport:install 
php artisan config:clear 
chmod 777 -R storage/
php-fpm -D 
npm run prod