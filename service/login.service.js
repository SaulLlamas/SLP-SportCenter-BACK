/**
* @description Archivo que se encarga del login/logout del usuario desde el servidor
* @author Saúl Llamas Parra
*/

//=======================================================
//Importación de dependencias de node
//=======================================================
//Importación de jsonwebtokens
const jwt = require('jsonwebtoken');
//Importación de bcrypt
const bcrypt = require('bcrypt');

//Inportación de fichero de configuración del token
const token_config = require('../config/token.config');

//=======================================================
//Importación de modelos de datos utilizados
//=======================================================
//Modelo de datos del usuario
const User = require('../models/user.model');

module.exports.login =  (request,response)=>{

    /**
     * @description Guarda los parametros para el login obtenidos del body
     * @var body
     */
    let body = request.body;

    User.findOne({email:body.email},(error,user_found)=>{

        if (error) {
            return response.status(500).json({
                ok:false,
                message:"Error del servidor al buscar el usuario",
                error:error
            })
        }

        //Si no existe un usuario con el email enviado se envia un estado 403 con un mensaje de aceso denegado
        if(!user_found){
            return response.status(403).json({
                ok:false,
                message:"Aceso Denegado (email)",
            })
        }

        //En caso de que exista el usuario 
        if(user_found){


            //si el password del usuario no es correcto se envia un estado 403 con un mensaje de aceso denegado
            if (!bcrypt.compareSync(body.password,user_found.password)) {
                return response.status(403).json({
                    ok:false,
                    message:"Aceso Denegado (password)",
                })
            } else {
            //En caso de que el password del usuario sea correcto se devolvera un estado 200 con el ususario y el token

                //Por motivos de seguridad cuando se envia un usuario al Front no se debe de enviar el valor de su password
                //Por lo tanto la propiedad password del usuario que se va a enviar se establecera como null
                user_found.password = null;

                //Se genera un token con la información del usuario
                //La clave y la fecha de expiración del token se obtendran del fichero de configuración del token
                let token = jwt.sign({user:user_found},token_config.SEED,{expiresIn:token_config.exp});
            
                return response.status(200).json({
                    ok:true,
                    message:"usuario logeado correctamente",
                    token:token,
                    user:user_found
                })

            }

        }

    })

}