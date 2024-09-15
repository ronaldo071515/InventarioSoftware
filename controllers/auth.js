const bcrypt = require('bcryptjs');

const { googleVerify } = require('../helpers/google-verify');
const { generarToken } = require('../helpers/jwt');

const { Usuario } = require('../models/Usuario');

const crearUsuario = async (req, res) => {

    const { body } = req;

    try {

        let usuario = await Usuario.findOne({
            where: {
                email: body.email
            }
        });

        if( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: `El usuario ya existe`
            });
        }

        const salt = bcrypt.genSaltSync();
        body.password = bcrypt.hashSync( body.password, salt );

        
        //crear usuarioa de BD
        const dbUser = await Usuario.create( body );

        //genero token
        const token = await generarToken( dbUser.id );

        //generar respuesta exitosa
        return res.status(201).json({
            ok: true,
            msg: 'Usuario creado',
            dbUser,
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}

const loginUsuario = async (req, res) => {
    const { email, password } = req.body;

    try {

        const dbUser = await Usuario.findOne({ where: { email, estado: true } });

        if(!dbUser) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectos'
            });
        }

        const validarPassword = bcrypt.compareSync( password, dbUser.password );
        if( !validarPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectos'
            });
        }

        const token = await generarToken(dbUser.id);

        return res.status(200).json({
            ok: true,
            dbUser, 
            token
        });
        
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Contacta con el administrador'
        });
    }

}

const revalidarToken = async (req, res) => {
    const { id } = req;

    const dbUser = await Usuario.findByPk(id);

    if( !dbUser ) {
        throw new Error('No existe el usuario');
    }

    const token = await generarToken( id );

    return res.json({
        ok: true,
        token
    });
}

const google = async (req, res) => {

    const { id_token } = req.body;

    try {
        const { nombre_completo, img, email } = await googleVerify( id_token );
        let usuario = await Usuario.findOne({ where: { email } });

        if( !usuario ) {
            //lo creo
            const data = {
                nombre_completo,
                email,
                password: ':P',
                img,
                google: true
            }

            usuario = await Usuario.create( data );
        }
        //si el usuario en bd tiene el estado false
        if( !usuario.estado ) {
            return res.status(401).json({
                ok: false,
                msg: 'Contacta con el administrador'
            });
        }
        //generar el jwt
        const token = await generarToken( usuario.id );

        return res.status(200).json({
            ok: true,
            msg: 'Inicio vía google, satisfactoriamente',
            usuario,
            token
        });
        
    } catch (error) {
        return res.status(400).json({
            ok: false,
            msg: 'El token no se pudo verificar'
        });
    }

}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken,
    google
}