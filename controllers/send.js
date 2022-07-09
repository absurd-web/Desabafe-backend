const Message = require('../models/message.js');
const send = (req, res, next) =>{
    return Message.create(({
        Conteudo: req.body.conteudo,
        Urgente: req.body.isUrgente,
        usuarioUsuarioID: req.body.id,
    }))
    .then(()=> {
        return res.status(200).json({message: "mensagem enviada"});
    })
    .catch(err => {
        console.log(err);
        return res.status(502).json({message: "erro ao enviar a mensagem"});
    });
}
module.exports = {send};
