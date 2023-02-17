
const { Router } = require('express');
const { check } = require('express-validator');

const { 
    crearProveedor, 
    obtenerProveedores, 
    obtenerProveedor,
    actualizarProveedor
} = require('../controllers/proveedores');

const { existeProveedor } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarToken } = require('../middlewares/validar-jwt');

const router = Router();


router.post('/new-proveedor', [
    validarToken,
    check('nombre_proveedor').custom( existeProveedor ),
    validarCampos
], crearProveedor);

router.get('/', obtenerProveedores);
router.get('/:id',[
    check('id', 'No es un ID válido').isUUID(),
    validarCampos
], obtenerProveedor);

router.put('/update-proveedor/:id', [
    validarToken,
    check('id', 'No es un ID válido').isUUID(),
    validarCampos
], actualizarProveedor);

module.exports = router;