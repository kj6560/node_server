import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('myshop', 'root', '', {
  host: 'localhost',
  port: 3307,
  dialect: 'mysql',
  logging: false,
});

export {sequelize};
