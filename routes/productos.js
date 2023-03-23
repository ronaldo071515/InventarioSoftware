
const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearProducto,
    obtenerProductos, 
    obtenerProducto,
    actualizarProducto,
    eliminarProducto
} = require('../controllers/productos');
const { 
    existeProducto, 
    isUUID, 
    existeProveedorId,
    existeMarcaId,
    existeProductoId}
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

router.get('/', obtenerProductos);
router.get('/:id', [
    validarToken,
    check('id').custom( isUUID ) && check('id').custom( existeProductoId ),
    validarCampos,
], obtenerProducto);

router.put('/update-producto/:id', [
    validarToken,
    check('id').custom( isUUID ) && check('id').custom( existeProductoId ),
    validarCampos,
], actualizarProducto);

router.delete('/:id', [
    validarToken,
    check('id').custom( isUUID ) && check('id').custom( existeProductoId ),
    validarCampos,
], eliminarProducto);

module.exports = router;