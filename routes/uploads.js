const { Router } = require('express');
const { 
    cargarArchivo, 
    actualizarImagen, 
    actualizarImagenCloudinary,
    mostrarImagen
} = require('../controllers/uploads');
const { validarArchivoSubir } = require('../middlewares/validar-archivo');


const router = Router();

router.get('/:id', mostrarImagen);

router.post('/', validarArchivoSubir, cargarArchivo);

router.put('/:id', actualizarImagenCloudinary)


module.exports = router;