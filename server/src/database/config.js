const fs = require("fs")
const path = require("path")
const Sequelize = require("sequelize")
const process = require("process")
require("dotenv").config()

const settings = {
    development: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        host: "127.0.0.1",
        dialect: "postgres",
        logging: false,
    },
    test: {},
    production: {},
}

const basename = path.basename(__filename)
const env = process.env.NODE_ENV || "development"
const config = settings[env]
const db = {}
let sequelize

if (config.use_env_variable) {
    sequelize = new Sequelize(process.env[config.use_env_variable], config)
} else {
    sequelize = new Sequelize(
        config.database,
        config.username,
        config.password,
        config
    )
}

fs.readdirSync(__dirname + "/models")
    .filter((file) => {
        return (
            file.indexOf(".") !== 0 &&
            file !== basename &&
            file.slice(-3) === ".ts"
        )
    })
    .forEach((file) => {
        const model = require(path.join(__dirname, file))(
            sequelize,
            Sequelize.DataTypes
        )
        db[model.name] = model
    })

Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
        db[modelName].associate(db)
    }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
