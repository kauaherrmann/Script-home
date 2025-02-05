const sequelize = require('./config/database');
const Usuario = require('./models/Usuario');

async function syncDatabase() {
  try {
    await sequelize.sync({ force: true }); // Isso recria as tabelas toda vez que rodar
    console.log('Banco de dados sincronizado com sucesso!');
    process.exit();
  } catch (error) {
    console.error('Erro ao sincronizar o banco de dados:', error);
    process.exit(1);
  }
}

syncDatabase();
