const { Router } = require('express');

const { crearImagenes } = require('../controllers/imagenes');

const router = Router();

router.post('/new/:id', crearImagenes);

module.exports = router;