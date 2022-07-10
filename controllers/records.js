const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');
const Message = require('../models/message.js');
const records = (req, res, next) =>{
    Message.findAndCountAll({
        attributes: ['Categoria', [sequelize.fn('count', sequelize.col('Categoria')), 'cnt']],
        group: "Categoria",
    })
    .then((count,rows)=>{
        if(count != 0){
            return res.status(200).json({count: count,rows: rows});
        }else{
            return res.status(404).json({message: "Nenhum registro encontrado"});
        }
    })
    .catch(err => {
        console.log('error', err);
    });
}
module.exports = {records};
