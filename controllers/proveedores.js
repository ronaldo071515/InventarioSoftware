
const { Proveedor } = require('../models/Proveedores');

const crearProveedor = async (req, res) => {

    const { nombre_proveedor, direccion } = req.body;

    try {
        await Proveedor.create( { nombre_proveedor, direccion } );

        return res.json({
            ok: true,
            nombre_proveedor,
            msg: 'Proveedor Creado',
        });
    
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });    
    }

}

const obtenerProveedores = async (req, res) => {

    const { cantidad = 5, pagina = 1 } = req.query;

    try {
        
        const { count, rows } = await Proveedor.findAndCountAll({
            where: { estado: true },
            offset: (Number( pagina ) -1 ) * cantidad,
            limit: Number( cantidad )
        });

        return res.status(200).json({
            total: count,
            cantidad: Number(cantidad),
            pagina: Number(pagina),
            proveedores: rows
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        }); 
    }

}

const obtenerProveedor = async (req, res) => {

    const { id } = req.params;
    console.log(id);
    try {

        const proveedor = await Proveedor.findByPk( id );

        return res.status(200).json(proveedor);
        
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}

const actualizarProveedor = async (req, res) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const proveedor = await Proveedor.findByPk( id );

        if( !proveedor ) {
            return res.status(400).json({
                ok: false,
                msg: `Proveedor no encontrado con id: ${ id }`
            });
        }

        await proveedor.update( body );

        return res.status(200).json({
            ok: true,
            msg: 'Proveedor actualizado'
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
    crearProveedor,
    obtenerProveedores,
    obtenerProveedor,
    actualizarProveedor
}