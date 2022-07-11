const User = require('../models/user.js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const signup = (req, res, next) => {
    // checks if email already exists
    User.findOne({ where : {
        Email: req.body.email, 
    }})
    .then(dbUser => {
        if (dbUser) {
            return res.status(409).json({message: "email já em uso"});
        } else if (req.body.email && req.body.password) {
            // password hash
            bcrypt.hash(req.body.password, 12, (err, passwordHash) => {
                if (err) {
                    return res.status(500).json({message: "couldnt hash the password"}); 
                } else if (passwordHash) {
                    return User.create(({
                        NomeUsuario: req.body.name,
                        Email: req.body.email,
                        Nivel: 0,
                        Senha: passwordHash,
                    }))
                    .then(() => {
                        return res.status(200).json({message: "usuário criado"});
                    })
                    .catch(err => {
                        console.log(err);
                        return res.status(502).json({message: "erro ao criar o usuário"});
                    });
                };
            });
        } else if (!req.body.password) {
            return res.status(400).json({message: "password not provided"});
        } else if (!req.body.email) {
            return res.status(400).json({message: "email not provided"});
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const login = (req, res, next) => {
    // checks if email exists
    User.findOne({ where : {
        Email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "usuario não encontrado"});
        } else {
            // password hash
            /* if(req.body.password == dbUser.Senha){
                const token = jwt.sign({email: req.body.email}, 'secret', {expiresIn: '1h'});
                res.status(200).json({message: "logando...", "token": token});
            }else{
                res.status(401).json({message: "senha ou email invalidos"});
            } */
            bcrypt.compare(req.body.password, dbUser.Senha, (err, compareRes) => {
                if (err) { // error while comparing
                    return res.status(502).json({message: "error while checking user password"});
                } else if (compareRes) { // password match
                    const token = jwt.sign({id: dbUser.UsuarioID, name: dbUser.NomeUsuario, email: req.body.email, level: dbUser.Nivel }, 'secret', { expiresIn: '1h' });
                    return res.status(200).json({message: "Logando...", "token": token});
                } else { // password doesnt match
                    return res.status(401).json({message: "Senha ou email invalidos"});
                };
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
};

const loginAnon = (req, res, next) => {
    const token = jwt.sign({name: 'Anônimo', email: '' }, 'secret');
    return res.status(200).json({message: "user logged in", "token": token});
};

const deleteUser = (req,res,next) =>{
    User.findOne({ where : {
        Email: req.body.email, 
    }})
    .then(dbUser => {
        if (!dbUser) {
            return res.status(404).json({message: "usuario não encontrado"});
        } else {
            dbUser.destroy({
                where: { email: req.body.email },
            })
            .then(() => {
                return res.status(200).json({message: "usuário excluido"});
            })
            .catch(err => {
                console.log(err);
                return res.status(502).json({message: "erro ao excluir o usuário"});
            });
        };
    })
    .catch(err => {
        console.log('error', err);
    });
}
const isAuth = (req, res, next) => {
    const authHeader = req.get("Authorization");
    if (!authHeader) {
        return res.status(401).json({ message: 'not authenticated' });
    };
    const token = authHeader.split(' ')[1];
    let decodedToken; 
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({ message: err.message || 'could not decode the token' });
    };
    if (!decodedToken) {
        return res.status(401).json({ message: 'unauthorized' });
    } else {
        return res.status(200).json({ message: 'here is your resource', "token":decodedToken });
    };
};

module.exports = { signup, login, loginAnon, deleteUser, isAuth };
