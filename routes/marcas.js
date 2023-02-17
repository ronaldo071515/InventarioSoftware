const { Router } = require('express');
const { check } = require('express-validator');
const { 
    crearMarca, 
    obtenerMarcas, 
    obtenerMarca,
    actualizarMarca,
    eliminarMarca
} = require('../controllers/marcas');

const { existeMarca } = require('../helpers/db-validators');
const { validarToken } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();


router.post('/new-marca', [ 
    validarToken,
    check('nombre_marca').custom( existeMarca ),
    validarCampos
], crearMarca);

router.get('', obtenerMarcas);
router.get('/:id', obtenerMarca);

router.put('/update-marca/:id', [ validarToken ], actualizarMarca);
router.delete('/:id', eliminarMarca)

module.exports = router;