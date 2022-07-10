express = require('express');

var { signup, login, loginAnon, deleteUser, isAuth } = require('../controllers/auth.js');
var { send } = require('../controllers/send.js');
var { records, messageData } = require('../controllers/records.js');
const router = express.Router();

router.post('/login', login);

router.post('/loginAnon', loginAnon);

router.post('/signup', signup);

router.post('/send', send);

router.delete('/user', deleteUser);

router.get('/private', isAuth);

router.get('/records', records);

router.get('/records/data', messageData);

router.get('/public', (req, res, next) => {
    res.status(200).json({ message: "here is your public resource" });
});

// will match any other path
router.use('/', (req, res, next) => {
    res.status(404).json({error : "page not found"});
});

module.exports = router;