composer update 
php artisan key:generate
php artisan storage:link  
php artisan migrate:fresh --seed 
php artisan passport:install 
php artisan config:clear 
php-fpm -D 
npm run prod