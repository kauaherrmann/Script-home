const sequelize = require('./config/database');

sequelize.authenticate()
  .then(() => console.log('Conectado ao banco de dados!'))
  .catch(err => console.error('Erro ao conectar:', err));
