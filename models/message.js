const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');
const User = require('../models/user.js');
const Message = sequelize.define('messages', {
   MessageID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
   },
   Conteudo: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   Categoria: {
      type: Sequelize.STRING,
      allowNull: false,
   },
   Urgente: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
}});
User.hasMany(Message,{
   onDelete: 'CASCADE',
});
Message.belongsTo(User);
module.exports = Message;
