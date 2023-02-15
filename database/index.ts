const { Sequelize } = require("sequelize");

const sequelize = new Sequelize('sqlite::memory:');

sequelize.sync();

export default sequelize;