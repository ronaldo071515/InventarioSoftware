const { ImagenesProductos } = require('../models/Imagenes');

const crearImagenes = async (req, res) => {

    const { url } = req.body;
    const { id } = req.params;

    try {
        const imagenProducto = await ImagenesProductos.create({ url, productoId: id });
        console.log(imagenProducto);
        res.status(200).json({
            ok: true,
            msg: 'Imagen agregada'
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: error,
            msg: 'Contacta con el administrador'
        });
    }

}


module.exports = {
    crearImagenes,
}