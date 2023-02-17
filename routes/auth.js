const { Router } = require('express');
const { check } = require('express-validator');

const { 
    crearUsuario, 
    loginUsuario, 
    revalidarToken,
    google
} = require('../controllers/auth');

const { validarToken } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/new', crearUsuario);
router.post('/google', [
    check('id_token', 'El id_token de google es necesario').not().isEmpty(),
    validarCampos
], google);

router.post('/', loginUsuario);

router.get('/renew', validarToken, revalidarToken);

module.exports = router;