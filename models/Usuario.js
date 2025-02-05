const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Usuario = sequelize.define('Usuario', {
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  dataNascimento: {
    type: DataTypes.DATE,
    allowNull: false
  },
  imagemCliente: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parentescoNome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  parentescoNumero: {
    type: DataTypes.STRING,
    allowNull: true
  },
  remedioContinuo: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  remedioNome: {
    type: DataTypes.STRING,
    allowNull: true
  },
  remedioDescricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  problemasSaude: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  problemasSaudeDescricao: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  alergiaDoenca: {
    type: DataTypes.BOOLEAN,
    allowNull: true
  },
  alergiaDoencaDescricao: {
    type: DataTypes.TEXT,
    allowNull: true
  }
});

module.exports = Usuario;