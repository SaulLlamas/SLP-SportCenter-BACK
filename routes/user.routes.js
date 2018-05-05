/**
 * @description Archivo de rutas 
 * @author Saúl Llamas Parra
 */

//=======================================================
//Importación de dependencias de node
//=======================================================

//Importación de express
const express = require('express');



//Inicialización de express en la constante app
const app = express();

//Peticion get
app.get("/",(request,response)=>{
    response.status(200).json({
        ok:true,
        message:"archivo de rutas user"
    })
});


module.exports = app;