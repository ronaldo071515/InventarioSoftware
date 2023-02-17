
const { Producto } = require('../models/Productos');


const crearProducto = async (req, res) => {
    
    const { ...producto } = req.body;

    try {

        const productoDb = await Producto.create( producto );

        return res.status(200).json({
            ok: true,
            msg: 'Producto creado',
            productoDb
        });
        
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}


module.exports = {
    crearProducto
}