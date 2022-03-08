//antes de iniciar el servidor requerimos el método config del módulo dotenv
//el cual nos ayudará a la seguridad de los datos que se envian. Este método ejecuta el archivo .env si exite y asignara a las variables de entorno
require('dotenv').config(); 


const app = require('./server'); //guardamos el objeto devuelto por server.js
require('./database'); //para tener acceso a la base de datos

app.listen(app.get('port'),()=>{
    console.log(`Server on port 3000`);
})