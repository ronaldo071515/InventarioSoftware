const { DataTypes } = require('sequelize');
const { db } = require('../db/conection');

const Cliente = db.define('clientes', {

    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    nombre: { type: DataTypes.STRING },

    cedula: {
        type: DataTypes.STRING,
        unique: true
    },

    telefono: { 
        type: DataTypes.STRING,
        defaultValue: null
    },

    forma_pago: { type: DataTypes.STRING },

    puntos: {
        type: DataTypes.STRING,
        defaultValue: null
    }

});

/* (async () => {
    await Cliente.sync({ force: false });
})(); */


module.exports = {
    Cliente
}