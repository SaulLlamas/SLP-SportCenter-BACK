/**
 * @description modelo de datos de la coleción Activity que almacenara los datos de las Actividades que se
 * realizan semanalmente 
 * @author Saúl Llamas Parra 
 */

//=======================================================
//Importación de dependencias de node
//=======================================================
//Importación de mongose
const mongoose = require('mongoose');

//=======================================================
//Importación de otros modelos de datos
//=======================================================
const User = require('./user.model')

/**
 * @const Schema
 * @description Guarda una referencia al modelo Schema de mongoose
 */
const Schema = mongoose.Schema;

var SchemaTypes = Schema.Types;

const activity_schema = Schema({

    name:{
        type:String,
        required:true
    },

    day:{
        type:String,
        required: true
    },

    hour:{
        type:number,
        required: true
    },

    createBy:{
        type:SchemaTypes.ObjectId,
        ref:'User',
        required:true
    },

    description:{
        type:String,
        required:true
    },

    image:{
        type:String,
        required:true
    }

})
