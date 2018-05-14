
/**
 * @description servicio que realiza las operaciones sobre el modelo de datos del usuario
 * @author Saúl Llamas Parra 
 */

//=======================================================
//Importación de dependencias de node
//=======================================================
//Importación de bcrypt para la encriptación de contraseñas
const bcrypt = require('bcrypt');

//=======================================================
//Importación de los modelos utilizados
//=======================================================
//Importacion del modelo user
const User = require('../models/user.model');

/**
 * @description Obtiene todos los usuarios de la base de datos
 * @param {*} request 
 * @param {*} response 
 */
module.exports.getAllUsers =(request,response) =>{

    User.find({},'email name surnames password image role')
        .exec(
            (error,users)=>{
                if (error) {
                    return response.status(500).json({
                        ok:false,
                        message:"ERROR al obtener los datos",
                        errors:error
                    })
                } else {
                    return response.status(200).json({
                        ok:true,
                        users:users
                    })
                }
            }
        )
};

/**
 * @description Crea un nuevo documento en la coleción usuario
 * @param {*} request 
 * @param {*} response 
 */
module.exports.createUser =(request,response)=>{

    /**
     * @description Guarda los parametros para la creación de un nuevo usuario obtenidos del body
     * @var body
     */
    let body = request.body;

    /**
     * @description Crea un nuevo objeto usuario partiendo de los parametros
     * @var user
     */
     let user = new User({
        email:body.email, 
        name:body.name,
        password:bcrypt.hashSync(body.password,10),
        surnames:body.surnames,
        image:body.image,
        role:body.role
     });

    user.save((error,user_saved)=>{
        //Si hay algun error al guardar el usuario se envia el error y el estado de la petición sera 400
        if (error) {
            return response.status(400).json({
                ok: false,
                message: "Error al guardar el usuario",
                errors: error
            })
        }else{
            return response.status(200).json({
                ok: true,
                message:'Usuario guardado correctamente',
                user_saved:user_saved
            })
        }
    })



};

/**
 * @description Actualiza un documento de la coleción User de la base de datos
 * @param {*} request 
 * @param {*} response 
 */
module.exports.updateUser = (request,response)=>{

    /**
     * @description identificación del usuario que se quiere actualizar
     * @var id
     */
    let id = request.params.id;

    /**
     * @description Guarda los parametros para la actualización de un usuario obtenidos del body
     * @var updateParams
     */
    let updateParams = request.body;

    //Utilizando findById de mongoose se busca el usuario que se quiere actualizar
    User.findById(id,(error,user_found)=>{

        //Si ha habido un error al buscar el usuario para actualizar sera un error 500
        if (error){
            return response.status(500).json({
                ok:false,
                message:"Ocurrio un error al buscar el usuario ",
                error:error
            })
        } 

        //Si no se encontro el usuario sera un error 400
        if (!user_found) {
            return response.status(400).json({
                ok:false,
                message:"No se encontro el usuario  ",
            })
        }

        if(user_found){

            //Se comprueban los parametros que se han enviado en el body y se establece su valor a la propiedad correspondiente del usuario

            if(updateParams.email){
                user_found.email = updateParams.email;
            }

            if(updateParams.name){
                user_found.name = updateParams.name;
            }

            if (updateParams.surnames) {
                user_found.surnames= updateParams.surnames;
            }

            if(updateParams.role){
                user_found.role= updateParams.role;
            }

         
            user_found.save((error,user_updated)=>{

                //Si ha habido un error al guardar el usuario actualizado sera un error 400
                if (error){
                    return response.status(400).json({
                        ok:false,
                        message:"Ocurrio un error al actualizar el usuario ",
                        error:error
                    })
                }

                if(user_updated) {

                    //Por motivos de seguridad cuando se envia un usuario al Front no se debe de enviar el valor de su password
                    //Por lo tanto la propiedad password del usuario que se va a enviar se establecera como null
                    user_updated.password = null;

                    return response.status(200).json({
                        ok:true,
                        message:"El usuario se actualizo correctamente ",
                        user_updated:user_updated
                    })
                }
            })
        

        }

    })

}


module.exports.deleteUser = (request,response)=>{

    /**
     * @description identificación del usuario que se quiere borrar
     * @var id
     */
    let id = request.params.id

    User.findByIdAndRemove(id,(error,user_deleted)=>{

        //Si ha habido un error al borrar el usuario sera un error 500
        if(error){
            return response.status(500).json({
                ok:false,
                message:"Error al Borrar el usuario",
                error:error
            })
        }

        //Si no hay ususario es que no sea encontrado , entonces sera error 404
        if(!user_deleted){
            return response.status(404).json({
                ok:false,
                message:"No se encontró el usuario"
            })
        }

        if(user_deleted){


            //Por motivos de seguridad cuando se envia un usuario al Front no se debe de enviar el valor de su password
            //Por lo tanto la propiedad password del usuario que se va a enviar se establecera como null
            user_deleted.password = null;

            return response.status(200).json({
                ok:true,
                message:"El usuario se borro correctamente",
                user_deleted:user_deleted
            })
        }

    })

}