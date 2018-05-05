/**
 * @description Punto de entrada a la app
 * @author Saúl Llamas Parra
 */

//=======================================================
//Importación de dependencias de node
//=======================================================

//Importación de express
const express = require('express');

//Importacion de body-parser
const bodyParser = require('body-parser');

//Importación de mongoose
const mongoose = require('mongoose');



//Importación de app.config
const conf = require('./config/app.config');


//=======================================================
//Importación de archivos de rutas
//=======================================================
//Archivo de rutas del usuario 
const user_router = require('./routes/user.routes');
//Archivo de rutas de las actividades
const act_router = require('./routes/activiti.routes');


//Inicialización de express en la constante app
const app = express();


//=======================================================
//Middleware de body-parser => Permite parsear la informacion de la peticiones a formato json
//=========================================================
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//============================================================
//Middleware para configurar las peticiones que se van a admitir
//============================================================
app.use(function(req, res, next) {
    //Configuración de los equipos desde los cuales se puede hacer peticiones
    //En el caso de que el valor sea * seran todos los equipos
    res.header("Access-Control-Allow-Origin", "*");
    //Configuracion de los tipos de origenes desde los que se permitira realizar peticiones
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept , Authorization");
    //Comfiguracion de los tipos de peticiones que se van a admitir
    res.header("Access-Control-Allow-Methods","POST , GET , PUT , DELETE , OPTIONS");
    next();
});


app.use('/user',user_router);

app.use('/activiti',act_router);


app.listen(conf.express.port,()=>{
    //El texto entre \x1b[32m y \x1b[0m saldra por consola de color verde
    console.log("\x1b[32m Aplicacion corriendo en el puerto "+conf.express.port+" \x1b[0m");
})

//Conexion a la base de datos utilizando los parametros del archivo de configuración
mongoose.connection.openUri(conf.mongoose_uri,(error,response)=>{

    if(error){
        //En caso de que halla un error muestra el error por consola
        console.log("\x1b[31m ERROR: \x1b[0m",error);
    }else{
        //En caso de que no halla ningun error muestra un mensage satisfactorio por consola
        console.log(`\x1b[32m Se ha podido conectar correctamente a ${conf.mongoose_uri} \x1b[0m`);
    }

});


