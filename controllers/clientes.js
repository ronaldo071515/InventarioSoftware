
const { Cliente } = require('../models/Clientes');


const crearCliente = async (req, res) => {

    const { body } = req;

    try {

        let cliente = await Cliente.findOne({
            where: {
                cedula: body.cedula
            }
        });

        if( cliente ) {
            return res.status(400).json({
                ok: false,
                msg: `El cliente ya existe /cedula`
            });
        }

        const clienteDb = await Cliente.create( body );

        return res.status(200).json({
            ok: true,
            msg: 'Cliente creado',
            clienteDb
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}


module.exports = {
    crearCliente
}