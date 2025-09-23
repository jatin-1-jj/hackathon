const express = require('express');
const { protect } = require('../middlewares/authMessage');
const {check} = require('../controller/authController')
const {register} = require('../controller/authController')
const {login} = require('../controller/authController')

const authRouter = express.Router();


authRouter.get('/check',protect,check);


authRouter.post('/register', register);


authRouter.post('/login', login);


module.exports = {authRouter};