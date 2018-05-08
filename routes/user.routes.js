/**
 * @description Archivo de rutas 
 * @author Saúl Llamas Parra
 */

//=======================================================
//Importación de dependencias de node
//=======================================================
//Importación de express
const express = require('express');

//=======================================================
//Importación de los servicios utilizados
//=======================================================
const user_service = require('../service/user.service');



//Inicialización de express en la constante app
const app = express();

//Peticion get
app.get("/",user_service.getAllUsers);

app.post("/",user_service.createUser);

app.put("/:id",user_service.updateUser);

app.delete("/:id",user_service.deleteUser);

module.exports = app;