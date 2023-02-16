import dotenv from 'dotenv'; 
const { Sequelize } = require("sequelize");

dotenv.config();

const hostname:any = process.env.DB_HOST;
const user:any = process.env.DB_USER;
const password:any = process.env.DB_PASSWORD;
const dbname:any = process.env.DB_NAME;

console.log(`password is ${password}`);

const sequelize = new Sequelize(dbname, user, password, {
  dialect: 'postgres',
  logging: false
});

sequelize.sync();

export default sequelize;