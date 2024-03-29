const express = require('express');
const fileUpload = require('express-fileupload');
require('dotenv').config();

const { db } = require('./db/conection');
const { Usuario } = require('./models/Usuario');
const { Producto } = require('./models/Productos');
const { Proveedor } = require('./models/Proveedores');
const { Marcas } = require('./models/Marcas');
const { ImagenesProductos } = require('./models/Imagenes');

const app = express();


async function main() {

    try {

        await db.sync();/* sincronizar con la BD */
        await db.authenticate();
        console.log('Conection has been stablished successfully');

        //Lectura y parseo en el body
        app.use( express.json() );

        //directoriopublico
        app.use( express.static('public') );

        //fileupload -carga de archivos
		app.use(fileUpload({
			useTempFiles : true,
			createParentPath: true,
			tempFileDir : '/tmp/'
		}));

        //rutas
        app.use( '/api/auth', require('./routes/auth') );
        app.use( '/api/productos', require('./routes/productos') );
        app.use( '/api/proveedores', require('./routes/proveedores') );
        app.use( '/api/marcas', require('./routes/marcas') );
        app.use( '/api/clientes', require('./routes/clientes') );
        app.use( '/api/imagenes', require('./routes/imagenes') );
        //subida de archivos
        app.use( '/api/uploads', require('./routes/uploads') );


        app.listen( process.env.PORT, () => {
            console.log(`Server runing in port: ${ process.env.PORT }`);
        });

    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }

}

main();