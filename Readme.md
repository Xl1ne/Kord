=== ИНСТРУКЦИЯ ПО РАЗВЁРТЫВАНИЮ САЙТА КОРД ===

1. Подключиться к серверу:
   ssh serg@netsolve.ru

2. Перейти в рабочую директорию:
   cd /var/www/netsolve/www/cp/05

3. Клонировать репозиторий (первый раз):
   git clone <URL_РЕПОЗИТОРИЯ> .

   Если файлы уже есть — вместо clone:
   git init
   git remote add origin <URL_РЕПОЗИТОРИЯ>
   git fetch origin
   git reset --hard origin/main

4. Установить PHPMailer:
   composer install

   Если composer не установлен:
   curl -sS https://getcomposer.org/installer | php
   php composer.phar install

5. Настроить SMTP в файле send-form.php (строки 8-13):
   - $RECIPIENT_EMAIL — почта, куда приходят заявки
   - $SMTP_HOST — SMTP сервер (smtp.yandex.ru / smtp.mail.ru / и т.д.)
   - $SMTP_USER — логин SMTP
   - $SMTP_PASS — пароль SMTP

6. Если index.html нужно переименовать:
   mv index.html index.php

7. Убедиться что PHP-FPM запущен для этого сайта.

=== ОБНОВЛЕНИЕ (в дальнейшем) ===
cd /var/www/netsolve/www/cp/05
git pull origin main
