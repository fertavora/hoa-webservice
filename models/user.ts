import { DataTypes } from 'sequelize';
import sequelize from '../database';

const User = sequelize.define('User', {
  username: DataTypes.STRING,
  password: DataTypes.STRING,
});

export default User;