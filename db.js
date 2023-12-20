import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('shiwkes1_project_avish', 'shiwkes1_project_keshav', 'ProAv!@12', {
  host: '114.69.243.148',
  dialect: 'mysql',
  logging: console.log,
});

export {sequelize};
