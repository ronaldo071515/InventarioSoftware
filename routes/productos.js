
const { Router } = require('express');
const { check } = require('express-validator');
const { crearProducto } = require('../controllers/productos');
const { 
    existeProducto, 
    isUUID, 
    existeProveedorId,
    existeMarcaId,
    existeUsuarioId}
    = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');


const router = Router();


router.post('/new', [
    validarToken,
    check('nombre').custom( existeProducto ),
    check('proveedorId').custom( isUUID ) && check('proveedorId').custom( existeProveedorId ),
    check('marcaId').isInt() && check('marcaId').custom( existeMarcaId ),
    validarCampos
], crearProducto);


module.exports = router;