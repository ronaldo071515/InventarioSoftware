
const { DataTypes } = require('sequelize');
const { db } = require('../db/conection');
const { ImagenesProductos } = require('./Imagenes');

const Producto = db.define('productos', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    
    nombre: {
        type: DataTypes.STRING,
        unique: true
    },

    descripcion: {
        type: DataTypes.STRING
    },

    stock: {
        type: DataTypes.INTEGER
    },

    precio_costo: {
        type: DataTypes.INTEGER
    },

    precio_venta: {
        type: DataTypes.INTEGER
    },

    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    hooks: {
        beforeCreate(producto) {
            const nombreLowerCase = producto.nombre.toLowerCase();
            producto.nombre = nombreLowerCase;
        }
    }
});

(async () => {
    await Producto.sync();
})();

Producto.hasMany( ImagenesProductos, {
    foreignKey: 'productoId',
    sourceKey: 'id',
    type: DataTypes.UUID,
});

Producto.prototype.toJSON =  function () {
    const { proveedorId, marcaId, usuarioId, ...producto } = this.get();
    return producto;
}

module.exports = {
    Producto
}