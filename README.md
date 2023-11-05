## GraphQL API приложение для тренировок

Простое приложения для сети залов, разработанное на NestJS и использующее GraphQl. Реализует основные CRUD методы для клиентов, филиалов и тренировок.

API доступно по [ссылке](https://graphql.batworlds.net/graphql).

Демонстрация приложения на [YouTube](https://youtu.be/L8M2zrmjlZM). 

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
