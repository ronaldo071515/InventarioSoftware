const { DataTypes } = require("sequelize");
const { db } = require("../db/conection");


const ImagenesProductos = db.define('imagenesproductos', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true
    },
    url: {
        type: DataTypes.STRING
    },
},{
    timestamps: false
});

/* (async () => {
    await ImagenesProductos.sync();
})(); */



module.exports = {
    ImagenesProductos
}