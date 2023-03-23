
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
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }
}

const obtenerProductos = async (req, res) => {
    const { cantidad = 5, pagina = 1 } = req.query;
    try {
        const { count, rows } = await Producto.findAndCountAll({
            where: { estado: true },
            offset: (Number( pagina ) -1 ) * cantidad,
            limit: Number( cantidad )
        });
        return res.status(200).json({
            total: count,
            cantidad: Number(cantidad),
            pagina: Number(pagina),
            productos: rows
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        })
    }
}

const obtenerProducto = async (req, res) => {
    const { id } = req.params;
    try {

        const producto = await Producto.findByPk( id );
        return res.status(200).json(producto);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        })
    }
}

const actualizarProducto = async (req, res) => {

    const { id } = req.params;
    const { body } = req;
    
    try {

        if( !body.stock ) body.stock = 0;

        const producto = await Producto.findByPk(id);
        body.stock += producto.stock;
        
        if(!producto) {
            return res.status(400).json({
                msg: `Producto no encontrado`
            });
        }
        await producto.update( body );
        return res.status(200).json({
            ok: true,
            msg: 'Producto Actualizado'
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}

const eliminarProducto = async (req, res) => {

    const { id } = req.params;

    try {
        console.log('mi id de producto', id);
        const producto = await Producto.findByPk(id);

        if(!producto) {
            return res.status(400).json({
                msg: `Producto no encontrado`
            });
        }
        await producto.update({ estado: false });
        return res.status(200).json({
            ok: true,
            msg: 'Producto Eliminado'
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        })
    }

}


module.exports = {
    actualizarProducto,
    crearProducto,
    eliminarProducto,
    obtenerProducto,
    obtenerProductos,
}