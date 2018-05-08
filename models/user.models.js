/**
 * @description modelo de datos de la coleción User que almacena los datos del usuario
 * @author Saúl Llamas Parra 
 */

//=======================================================
//Importación de dependencias de node
//=======================================================
//Importación de mongose
const mongoose = require('mongoose');

/**
 * @const Schema
 * @description Guarda una referencia al modelo Schema de mongoose
 */
const Schema = mongoose.Schema;

/**
 * @var valid_values
 * @description Almacena un objeto con los valores validos para el rol del usuario y el mensaje que se mostrará si el valor no es correcto
 */
var valid_roles = {
    values:['normal','instructor','admin'],
    message:'el valor {VALUE} no es valido para {PATH}'
};

const user_schema= Schema({

    email:{
        type:String,
        required:true,
        unique:true
    },

    name:{
        type:String,
        required:true
    },

    surnames:{
        type:String,
        required:true
    },

    password:{
        type:String,
        required:true
    },

    image:{
       type:String, 
    },

    role:{
        type:String,
        enum:valid_roles
    }

})


/**
 * @var UserModel
 * @description Guarda el modelo de mongoose creado que se guardara como coleción en mongodb
 */
var  UserModel = mongoose.model('User',user_schema)
//Exportación del modelo de mongoose
module.exports = UserModel;