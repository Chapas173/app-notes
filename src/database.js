const mongoose = require('mongoose'); //mongoose nos ayudará a conectar a la base de datos mongodb


const {NOTES_APP_MONGODB_HOST,NOTES_APP_MONGODB_DATABASE} = process.env; //obtenemos las variables de entorno del archivo .env con el mismo nombre
//esto es igual a: const NOTES_APP_MONGODB_HOST = process.env.NOTES_APP_MONGODB_HOST

const MONGODB_URI = `mongodb://${NOTES_APP_MONGODB_HOST}/${NOTES_APP_MONGODB_DATABASE}`; //creamos una variable con la URL de la BD 


//el método connect es el que nos ayuda a conectarnos a la BD. El cual pide la URL de la BD
// y un objeto con configuraciones por defecto de ser necesario
mongoose.connect(MONGODB_URI,{
    useUnifiedTopology:true,
    useNewUrlParser: true
}).then(db=>console.log('DB is connected')).catch(e=>console.error(e));
//then se ejecuta si todo va bien. catch captura los errores
