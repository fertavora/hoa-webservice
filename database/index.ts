import dotenv from 'dotenv'; 
const { Sequelize } = require('sequelize');

dotenv.config();
const hostname:any = process.env.DB_HOST;
const user:any = process.env.DB_USER;
const password:any = process.env.DB_PASSWORD;
const dbname:any = process.env.DB_NAME;
const environment:any = process.env.NODE_ENV;

let sequelize:typeof Sequelize;

const setEnvironment:any = {
  development: () => new Sequelize('sqlite::memory:'),
  production: () => new Sequelize(dbname, user, password, {
    dialect: 'postgres',
    logging: false
  })
}

sequelize = setEnvironment[environment]();
sequelize.sync();

export default sequelize;