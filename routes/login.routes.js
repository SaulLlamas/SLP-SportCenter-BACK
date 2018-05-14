/**
 * @description Archivo de rutas login/logout
 * @author Saúl Llamas Parra
 */

//=======================================================
//Importación de dependencias de node
//=======================================================
//Importación de express
const express = require('express');


//Inicialización de express en la constante app
const app = express();

//=======================================================
//Importación de servicios utilizados
//=======================================================
//Servicio login
const login_service = require('../service/login.service');

app.post('/',login_service.login);



module.exports = app;
