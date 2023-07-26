const { DataTypes } = require('sequelize');

const { db } = require('../db/conection');

const { Producto } = require('./Productos');

const Proveedor = db.define("proveedores", {
  
    id_proveedor: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },

    nombre_proveedor: {
        type: DataTypes.STRING,
        unique: true
    },

    direccion: {
        type: DataTypes.STRING
    },

    estado: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

}, {
    hooks: {
        beforeCreate(proveedor) {
            const nombreLowerCase = proveedor.nombre_proveedor.toLowerCase();
            proveedor.nombre_proveedor = nombreLowerCase;
        }
    }
});

(async () => {
    await Proveedor.sync();
})();


Proveedor.hasMany( Producto, {
    foreignKey: 'proveedorId',
    sourceKey: 'id_proveedor',
    type: DataTypes.UUID,
});
Producto.belongsTo( Proveedor, {
    foreignKey: 'proveedorId',
    targetId: "id_proveedor",
    type: DataTypes.UUID,
});

module.exports = {
    Proveedor
}