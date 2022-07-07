const Sequelize = require('sequelize');

const sequelize = require('../utils/database.js');

const User = sequelize.define('usuarios', {
   UsuarioID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   NomeUsuario: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   Email: {
      type: Sequelize.STRING,
   },
   Nivel: {
      type: Sequelize.INTEGER,
   },
   Senha: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   SenhaSal: {
      type: Sequelize.STRING,
      allowNull: true,
   }},
   {
      timestamps: false,
});

module.exports = User;