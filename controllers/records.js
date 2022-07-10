const Message = require('../models/message.js');
const records = (req, res, next) =>{
    const {count, rows} = Message.findAndCountAll({
        attributes: ['MessageID','*'],
        group: "Categoria",
    })
    .then(()=>{
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