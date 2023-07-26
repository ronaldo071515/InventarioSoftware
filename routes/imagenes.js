const { Router } = require('express');

const { subirImagen } = require('../controllers/imagenes');

const router = Router();

router.post('/new/:id', subirImagen);

module.exports = router;