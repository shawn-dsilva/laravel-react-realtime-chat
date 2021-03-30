php artisan key:generate # Generates Application key
php artisan storage:link  # creates link between storage/app/public/avatars and /public/storage/avatars
php artisan migrate:fresh --seed  # Seeds Database with default values
php artisan passport:install # installs passport and generates keys
php artisan config:clear # clears config of stale data
chmod 777 -R storage/ # fixes permissions issues 