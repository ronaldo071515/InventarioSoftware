const path = require('path');
const fs = require('fs');

const cloudinary = require('cloudinary').v2;
cloudinary.config( process.env.CLOUDINARY_URL );

const { subirArchivo } = require("../helpers/subir-archivo");

const { Producto } = require('../models/Productos');
const { ImagenesProductos } = require('../models/Imagenes');

const cargarArchivo = async( req, res ) => {
	try {
		const nombre = await subirArchivo( req.files, undefined, 'productosImgs' );
		res.json({ nombre });
		
	} catch (error) {
		res.status(400).json({msg: error});
	}
}

const actualizarImagen = async(req, res) => {
	const { id } = req.params;

	try {
		const usuarioExiste = await Producto.findByPk( id );
		if( !usuarioExiste ) {
			return res.status(400).json({
				msg: `No existe el producto con el id: ${id}`
			});
		}

		const url = await subirArchivo( req.files, undefined, 'productosImgs' );
		const data = {url, productoId: id};
		const imgProductos = new ImagenesProductos( data );
		await imgProductos.save();
		res.json( imgProductos );

		
	} catch (error) {
		res.status(400).json({msg: error});
	}

}

const actualizarImagenCloudinary = async (req, res) => {
	const { id } = req.params;
	try {
		const usuarioExiste = await Producto.findByPk( id );
		if( !usuarioExiste ) {
			return res.status(400).json({
				msg: `No existe el producto con el id: ${id}`
			});
		}
		const { tempFilePath } = req.files.archivo;
		const { secure_url } = await cloudinary.uploader.upload( tempFilePath );

		const data = {url: secure_url, productoId: id};
		const imgProductos = new ImagenesProductos( data );
		await imgProductos.save();
		res.json( imgProductos );
		
	} catch (error) {
		res.status(400).json({msg: error});
	}	
}

const mostrarImagen = async( req, res = response ) => {
	const { id } = req.params;
	try {
		const usuarioExiste = await Producto.findByPk( id );
		if( !usuarioExiste ) {
			return res.status(400).json({
				msg: `No existe el producto con el id: ${id}`
			});
		}
		if(usuarioExiste) {
			const pathImagen = await ImagenesProductos.findAll({
				where: {
					productoId: id
				}
			});
			const arrImagenes = pathImagen.map((imagen) => imagen.url);
			return res.json(arrImagenes);
			/* const pathImagenes = path.join(__dirname, '../uploads', 'productosImgs', arrImagenes[0]);
			if ( fs.existsSync( pathImagenes ) ) {
				return res.sendFile( pathImagenes );
			} */
		} else {
			const notImage = path.join(__dirname, '../assets/no-image.jpg');
			res.sendFile( notImage );
		}

		
	} catch (error) {
		res.status(400).json({msg: error});
	}	

}

module.exports = {  
	actualizarImagen,
	actualizarImagenCloudinary,
	mostrarImagen,
    cargarArchivo,
} 