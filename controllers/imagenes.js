const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;

const { subirArchivo } = require('../helpers/subir-archivo');
const { ImagenesProductos } = require('../models/Imagenes');

const subirImagen = async (req, res) => {
    // const { url } = req.body;
    // const { id } = req.params;
    try {
        // txt md
		const nombre = await subirArchivo( req.files, undefined, 'imgs' );
		// const nombre = await subirArchivo( req.files, ['txt', 'md'], 'textos' );//crea la carpeta textos
		res.json({ nombre });
        
    } catch (error) {
        return res.status(500).json({
            ok: error,
            msg: 'Contacta con el administrador'
        });
    }

}


module.exports = {
    subirImagen,
}