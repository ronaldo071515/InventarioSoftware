const { DataTypes } = require("sequelize");
const { db } = require("../db/conection");
const { Producto } = require("./Productos");



const ImagenesProductos = db.define('imagenesproductos', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    url: {
        type: DataTypes.ARRAY(DataTypes.STRING)
    }
});

(async () => {
    await ImagenesProductos.sync();
})();

ImagenesProductos.hasMany( Producto, {
    foreignKey: 'productoId',
    sourceKey: 'id',
    type: DataTypes.UUIDV4,
});

module.exports = {
    ImagenesProductos
}