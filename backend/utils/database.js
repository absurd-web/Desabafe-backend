const Sequelize = require('sequelize');

const sequelize = new Sequelize('desabafe', 'root', '', {
    dialect: 'mysql',
    host: 'localhost', 
});

module.exports = sequelize;