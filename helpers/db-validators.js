const uuid = require('uuid');

const { Marcas } = require('../models/Marcas');
const { Proveedor } = require('../models/Proveedores');
const { Producto } = require('../models/Productos');


const isUUID = async ( uuidValid ) => {
    if( !uuid.validate( uuidValid ) ) {
        throw new Error(`No es un UUID válido, intente nuevamente`);
    }
}

const existeMarca = async ( nombre_marca = '' ) => {
    let nombre_buscar = nombre_marca.toLowerCase();
    const existeMarcaEnBd = await Marcas.findOne({ where: { nombre_marca: nombre_buscar } });
    if ( existeMarcaEnBd ) {
		throw new Error(`La marca ${ nombre_buscar } ya existe en la bd`);
	}
}
const existeMarcaId = async ( id ) => {
    const existeId = await Marcas.findByPk(+id)
    if ( !existeId ) {
		throw new Error(`La marca no existe en la bd`);
	}
}

const existeProveedor = async (nombre_proveedor) => {
    let nombre_buscar = nombre_proveedor.toLowerCase();
    const existeProveedorEnBd = await Proveedor.findOne({ where: { nombre_proveedor: nombre_buscar } });
    if( existeProveedorEnBd ) {
        throw new Error(`El proveedor ${ nombre_buscar } ya existe en la bd`);
    }
}

const existeProveedorId = async ( proveedorId ) => {
    const existeProveedorId = await Proveedor.findByPk(proveedorId);
    if( !existeProveedorId ) {
        throw new Error(`No existe el proveedor, intente nuevamente`);
    }
}

const existeProducto = async (nombre_producto) => {
    let nombre_buscar = nombre_producto.toLowerCase();
    const existeProductoEnBd = await Producto.findOne({ where: { nombre: nombre_buscar } });
    if( existeProductoEnBd ) {
        throw new Error(`El producto ${ nombre_buscar } ya existe en la bd`);
    }
}

const existeProductoId = async (id) => {
    const existeProductoId = await Producto.findByPk(id);
    if( !existeProductoId ) {
        throw new Error(`No existe el producto, intente nuevamente`);
    }
}

module.exports = {
    existeMarca,
    existeMarcaId,
    existeProducto,
    existeProductoId,
    existeProveedor,
    existeProveedorId,
    isUUID,
}