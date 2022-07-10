const Sequelize = require('sequelize');
const sequelize = require('../utils/database.js');
const Message = require('../models/message.js');
const records = (req, res, next) =>{
    Message.findAndCountAll({
        attributes: ['Conteudo','Categoria', 'usuarioUsuarioID',[sequelize.fn('count', sequelize.col('Categoria')), 'cnt']],
        group: "Categoria",
    })
    .then((db)=>{
        if(db.count != 0){
            return res.status(200).json(db);
        }else{
            return res.status(404).json({message: "Nenhum registro encontrado"});
        }
    })
    .catch(err => {
        console.log('error', err);
    });
}
module.exports = {records};
