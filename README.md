Movies Database Sample.

To start the project run the following shell commands.
```shell
createdb moviesdb
npm install
```

To run the knex setup
```shell
knex migrate:latest
knex seed:run
```

To run the bookshelf seed file.
```shell
node seeds/bookshelf/seeds.js
```

To run the express server.
```shell
yarn install
yarn start
```
