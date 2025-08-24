//controlado que retorna la url de la pagina de AlexDessarrolla

const url = 'https://alexdesarrolla.com';

const alexDessarrolla = (req, res) => {
    return res.status(200).json({
        ok: true,
        message: '¡Que mierdota!',
        url
    });
}


module.exports = {
    alexDessarrolla
}