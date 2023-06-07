# secret
## Устанавливаем зависимости веба

npm i

## Запускаем бэк

Сначала создайте .env в secret/server и заполните конфигурацию
```
DB_HOST=postgres(название контейнера)
DB_USER
DB_NAME
DB_PASSWORD
DB_PORT
PORT
```

Далее запустите контейнер

```
docker-compose up --build
```
