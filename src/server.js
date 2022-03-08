const express = require('express'); //requerimos express para inicial el servidor
const path = require('path') //modulo para rutas en nuestra pc que viene por defecto al instalar nodejs
const exphbs = require('express-handlebars'); //handlebars es un motor de plantillas que nos ayuda a poder dividir codigo HTML en partes y usar comando de programación en HTML
const morgan = require('morgan'); //modulo que nos ayudará a que noe envie un msj en consola sobre el tipo de peticion qs a realizado al servidor

const methodOverride = require('method-override') //modulo (middleware) que nos ayudará con las peticiones put,delete,.., en nuestros archivos hbs

const flash = require('connect-flash'); //middleware para enviar mensajes de un página a otra
const session = require('express-session'); //middleware que nos ayuda a guardar la información de los mensajes de connect-flash en el servidor

const passport = require('passport') //nos ayuda con la validación de usuario y el mantener una sesión

//Inicializations
const app = express(); //ejecutamos el servidor
require('./config/passport'); //pedimos el archivo para que sea usado por passport

//Settings
app.set('port', process.env.PORT || 3000); //configuramos el puerto donde se va ejecutar. process.env.PORT nos indica que si el sistema tiene una variable port que utilice esa variable (puerto) sino que use el puerto 3000
app.set('views', path.join(__dirname,'views')); //necesitamos configurar donde esta la carpeta views. ya que por defcto debería estar donde está nuestra carpeta de módulos. 
        //__dirname nos devuelve la ruta donde está ez|ste archivo. path.join() nos ayuda a concatenar directorios.  
app.engine('.hbs',exphbs.engine({
    defaultLayout: 'main', //nuestro archivo principal se llama main
    layoutsDir: path.join(app.get('views'),'layouts'), //le indicamos donde esta la carpeta layouts donde se encontrará el cídigo en común
    partialsDir: path.join(app.get('views'),'partials'),
    extname: '.hbs', //indicamos que extensión tendrán nuestros archivos
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true,
    } //este atributo nos ayuda a poder usar objetos enviados en otros archivos
})); //configuramos donde esta nuestro motor de plantillas
app.set('view engine','.hbs'); //establecemos nuestro motor de plantillas


//Middlewares
app.use(express.urlencoded({entended:false})); //middleware que nos ayuda a que se pueda entender los datos que nos envía los formularios y los convierte en JSON
app.use(morgan('dev')); //opcion dev porque estamos en desarrollo
app.use(methodOverride('_method')); //_method nos ayuda a poder enviar el tipo de peticion como consulta en los archivos hbs

app.use(session({
    secret: 'secret', //palabra secreta
    resave: true, //configuración x defecto del módulo
    saveUninitialized: true //configuración x defecto del módulo
})); //configuramos session para luego usarlo en flash
app.use(passport.initialize()); //iniciamos passport y tiene que ir después de session porque se basa en ese módulo
app.use(passport.session()); //

app.use(flash()); //middleware que nos permite enviar mensajes entre ventanas

//Global variables
app.use((req,res,next)=>{
    //req.flash('sucess_msg'); //nos permite obtener el valor de success_msg. La guardaremos en una variable del servidor res.local.success_msg
    res.locals.success_msg = req.flash('success_msg'); 
    res.locals.error_msg = req.flash('error_msg'); 

    res.locals.error = req.flash('error') //nos ayuda a poder mostrar mensajes de error en pantalla con flash
    res.locals.user = req.user || null; //nos permite saber si el usuario fue autenticado o no. Para eliminar los botones que solo puede ver un usuario autenticado y los botones que puede ver uno q no. Gracias a passport. La cual lo haremos con if else en el archivo navigation

    next(); //nos permite continuar con las demás instrucciones del programa y no quedarse estancado acá
});

//Routes
app.use(require('./routes/index.routes.js')); //en vez de colocar las rutas. Usaremos la carpeta routes para especificar las rutas
app.use(require('./routes/notes.routes.js')); // agregamos las rutas para las notas
app.use(require('./routes/users.routes.js')); // rotas asociadas a los usuarios 

//Static files
//son archivos que cualquier usuario puede ingresar en nuestra páginas (css,js,imagenes,..) y que puede ser accedido por todos los demás archivos del proyecto sin necesidad de brindar la ruta exacta, solo el nombre del archivo 
app.use(express.static(path.join(__dirname,'public'))); //tenemos que iniciar y establecer donde están nuestros archivos públicos
    //express.static nos pide la ruta donde está la carpeta public


module.exports = app;   //como index será nuestro archivo princiapl lo exportamos para usarlo en index