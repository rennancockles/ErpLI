export default {
  "type": "mysql",
  "host": process.env.DB_HOST,
  "port": process.env.DB_PORT,
  "username": process.env.DB_USER,
  "password": process.env.DB_PWD,
  "database": process.env.DB_DATABASE,
  "entities": [
     "src/models/index.ts"
  ],
  "migrations": [
     "src/database/migrations/**/*.ts"
  ],
  "cli": {
      "migrationsDir": "src/database/migrations"
  }
}
