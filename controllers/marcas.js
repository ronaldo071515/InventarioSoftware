
const { Marcas } = require('../models/Marcas');

const crearMarca = async(req, res) => {

    const { nombre_marca } = req.body;

    try {
        await Marcas.create({ nombre_marca });

        res.status(200).json({
            ok: true,
            nombre_marca,
            msg: 'Marca creada'
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}

const obtenerMarcas = async (req, res) => {

    const { cantidad = 5, pagina = 1 } = req.query;

    try {

        const { count, rows } = await Marcas.findAndCountAll({
            where: { estado: true },
            offset: (Number( pagina ) -1 ) * cantidad,
            limit: Number( cantidad )
        });

        return res.status(200).json({
            total: count,
            cantidad: Number(cantidad),
            pagina: Number(pagina),
            marcas: rows
        });
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}

const obtenerMarca = async (req, res) => {
    
    const { id } = req.params;
    
    try {
    
        const marca = await Marcas.findByPk( id );

        return res.status(200).json(marca);

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}

const actualizarMarca = async (req, res) => {

    const { id } = req.params;
    const { body } = req;

    try {

        const marca = await Marcas.findByPk(id);

        if( !marca ) {
            return res.status(400).json({
                msg: `Marca no encontrada con id: ${id}`
            });
        }

        await marca.update( body );

        return res.status(200).json({
            ok: true,
            msg: 'Marca Actualizada'
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}

const eliminarMarca = async (req, res) => {

    const { id } = req.params;

    try {

        const marca = await Marcas.findByPk( id );

        if( !marca ) {
            return res.status(400).json({
                msg: `Marca no encontrada con id: ${id}`
            });
        }

        await marca.update({ estado: false });

        return res.status(200).json({
            ok: true,
            msg: 'Marca eliminada'
        })
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}


module.exports = {
    crearMarca,
    obtenerMarcas,
    obtenerMarca,
    actualizarMarca,
    eliminarMarca
}