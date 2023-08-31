# API Inventario
Es un proyecto de una API REST para un sistema de inventario de productos, clientes, proveedores, marcas, etc. El proyecto esta desarrollado con NodeJS, Express, PostgreSQL, Sequelize, JWT, Bcrypt, Dotenv, Nodemon, Cloudinary. Es un proyecto que esta en desarrollo y se ira actualizando con el tiempo, por ahora está muy sencillo y básico. La idea es que sea un proyecto base para otros proyectos que necesiten una API REST con NodeJS y PostgreSQL. No pretendemos que sea un proyecto completo y con todas las funcionalidades, pero si que sea un proyecto base para otros proyectos o usado como objeto de estudio por personas que estén iniciando en el mundo del desarrollo web con NodeJS y PostgreSQL. El proyecto es de código abierto y se puede usar para lo que quieran, solo les pido que me apoyen con una estrella en github y si quieren contribuir con el proyecto pueden hacerlo.

## Ejecutar el proyecto

1. Instalar los modulos de node con el comando `npm install`
2. Ejecutar el comando `npm run dev` para iniciar el proyecto en modo desarrollo
3. Configurar las variables de entorno en el archivo `.env` (ver archivo `.env.example`)

#### Nota: 
En caso de tener problemas a la hora de conectar a la bd solo crear la bd manualmente y colocarla en el archivo `.env` en la variable `DB_NAME`. Luego ejecutar el comando `npm run dev` para que se creen las tablas en la bd.

## Documentacion de la API
Falta documentar pero tenemos una documentación basica en postman en el siguiente enlace: [Documentacion](https://documenter.getpostman.com/view/7908350/2s9Y5bQgMx)

## Tecnologias usadas
- NodeJS
- Express
- PostgreSQL
- Sequelize
- JWT
- Bcrypt
- Dotenv
- Nodemon
- Cloudinary

## Modelo de Bd
Imagen del modelo de base de datos en la carpeta `public/img`

## Licencia
MIT

## Autor
[Ronaldo Torres](https://github.com/ronaldo071515)

## Contacto
- [Twitter](https://twitter.com/r_0_n_a_l_d_0)
