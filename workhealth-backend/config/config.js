module.exports = {
  development: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: 'self_screening_app_db',
    host: process.env.DB_HOST,
    dialect: "mysql",
    operatorsAliases: false
  }
}
