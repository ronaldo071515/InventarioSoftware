const jwt = require('jsonwebtoken');
const { Usuario } = require('../models/Usuario');


const validarToken = async (req, res, next) => {

    const token = req.header('x-token');

    //validamos
    if(!token){
        return res.status(401).json({
            ok: false,
            msg: 'Error en el token'
        });
    }

    try {
        //verificamos el token
        const { id } = jwt.verify( token, process.env.SECRET_JWT_SEED );
        req.id = id;
        const usuario = await Usuario.findByPk(id);

        if (!usuario) {
			return res.status(401).json({
				msg: 'Token no válido - Usuario no existe en DB'
			})			
		}

		//verificar si uid tiene estado en true
		if (!usuario.estado) {
			return res.status(401).json({
				msg: 'Token no válido - Usuario con estado: false'
			})
		}

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            ok: false,
            msg: 'Token no válido'
        })
    }

    //TODO OK
    next();

}

module.exports = {
    validarToken
}