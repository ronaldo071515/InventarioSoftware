//retornamos la url de la pagina de AlexDessarrolla
const { Router } = require('express');

const { alexDessarrolla } = require('../controllers/alex');

const router = Router();

router.get('/', alexDessarrolla);

module.exports = router;