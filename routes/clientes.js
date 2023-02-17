const { Router } = require('express');

const { 
    crearCliente 
} = require('../controllers/clientes');

const { 
    validarToken 
} = require('../middlewares/validar-jwt');

const router = Router();


router.post('/new', [
    validarToken
] , crearCliente);


module.exports = router;
