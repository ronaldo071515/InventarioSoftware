const { DataTypes, Sequelize } = require('sequelize');

const { Producto } = require('../models/Productos');
const { db } = require('../db/conection');


const Usuario = db.define('usuarios', {
    
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    email: {
        type: DataTypes.STRING,
        unique: true
    },

    password: {
        type: DataTypes.STRING
    },

    nombre_completo: {
        type: DataTypes.STRING
    },

    roles: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: ['admin']
    },
    
    img: {
        type: DataTypes.STRING
    },

    google: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },

    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    
});

/* (async () => {
    await Usuario.sync({ alter: true });
})(); */

Usuario.hasMany( Producto, {
    foreignKey: 'usuarioId',
    sourceKey: 'id',
    type: DataTypes.UUIDV4,
});

Producto.belongsTo(Usuario, {
    foreignKey: {
      name: 'usuarioId',
      allowNull: false
    }
});

Usuario.prototype.toJSON =  function () {
    const { password, updatedAt, createdAt, ...usuario } = this.get();
    return usuario;
}

module.exports = {
    Usuario
}