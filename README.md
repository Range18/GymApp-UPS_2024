## GraphQL API приложение для тренировок

Простое приложения для сети залов, разработанное на NestJS и использующее GraphQl. Реализует основные CRUD методы для клиентов, филиалов и тренировок.

API доступно по [ссылке](). (<-прикрепить ссылку)

Демонстрация приложения на [YouTube](). (<-прикрепить ссылку)

## Установка зависимостей

```bash
# install dependencies
$ npm install
```

## Запуск приложения

### Первый запуск

**При первом запуске важно создать таблицы сущностей, при повторном запуске этого не требуется**

``` bash
# create and syncronize database schema
$ npm run typeorm:sync
```

**Дальше используйте одну из следующих команд:**

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```
