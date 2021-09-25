const express = require('express');
const router = express.Router();
const userController = require('../controller/user')
const productController = require('../controller/product')
const auth = require('../middleware/auth')
const verify = require('../controller/verifytwillo')
// add user 

router.post('/register', userController.adduser)

router.get('/getuser', auth, userController.getuser)

router.post('/addproduct', productController.addproduct)

router.get('/verfiy',verify)

module.exports = router