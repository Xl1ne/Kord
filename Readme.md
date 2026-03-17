=== ДЕПЛОЙ САЙТА КОРД (netsolve.ru) ===

1. Подключиться к серверу:
   ssh serg@netsolve.ru

2. Перейти в рабочую директорию:
   cd /var/www/netsolve/www/cp/05

3. Клонировать репозиторий (первый раз):
   git clone <URL_РЕПОЗИТОРИЯ> .
   
   Если файлы уже есть:
   git init
   git remote add origin <URL_РЕПОЗИТОРИЯ>
   git fetch origin
   git reset --hard origin/main

4. Переименовать index.html → index.php:
   mv index.html index.php

5. Настроить почту в send-form.php (строка 4):
   $RECIPIENT_EMAIL = 'реальная@почта.ru';

6. Убедиться что PHP-FPM запущен.

=== ОБНОВЛЕНИЕ ===
   cd /var/www/netsolve/www/cp/05
   git pull origin main

Composer НЕ нужен. Всё работает через встроенный mail().
