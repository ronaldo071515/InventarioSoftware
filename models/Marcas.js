const { DataTypes } = require('sequelize');
const { db } = require('../db/conection');
const { Producto } = require('./Productos');

const Marcas = db.define('marcas', {

    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },

    nombre_marca: {
        type: DataTypes.STRING,
        unique: true
    },

    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    hooks: {
        beforeCreate(marca) {
            const nombreLowerCase = marca.nombre_marca.toLowerCase();
            marca.nombre_marca = nombreLowerCase;
        }
    }
});

/* (async () => {
    await Marcas.sync();
})(); */

Marcas.hasMany( Producto, {
    foreignKey: 'marcaId',
    sourceKey: 'id',
    type: DataTypes.INTEGER,
});


module.exports = {
    Marcas
}