const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('meu_banco_de_dados', 'postgres', 'chocolate10', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;