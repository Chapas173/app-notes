//vamos a modelar nuestros datos para ello usamos el modulo mongoose  de los cuales se usará 2 clases
//Schema la cual me permite definir un esquema. Que es lo que voy a guardar dentro de mongodb
//model a partir de un esquema me permite crear una clase que tenga métodos y propiedades que podré acceder desde código
//ambos se complementan para poder definir un modelo de dato. que se va guardar dentro de la base de datos
const {Schema,model} = require('mongoose');

//esquema de que va tener cada nota. Solo agregaremos un titulo y una descripción
//tenesmoq eu definir el tipo. title será String. Podemos poner solo eso o hacer un objeto para poner más características 
const NoteSchema = new Schema({
    title: {
        type: String,
        required:true //indica que es obligatorio que cada nota tenga un titulo
    },
    description: {
        type: String,
        required: true
    },
    //agregamos la propiedad que nos indica a que usuario pertenece la nota
    user:{
        type: String,
        required: true
    }
},{
    timestamps: true //este objeto crea 2 propiedades createdAt(cuando fue creado) y updatedAt(cuando fue modificado)
});

module.exports = model('Note',NoteSchema); //creamos nuestro modelo Note y lo exportamos. 
//Al guardar informacion se creará de manera automática en una coleccion "notes" en este caso 
//si queremos colocarle un nombre a la colección como notas. Lo haremos así : module.exports = model('Note',NoteSchema,"notas"); 
//Para poder ver lo guardado en la BD. Abrimos otra terminal e ingresamos como cliente
//1.Ejecutamos la instrucción : "mongo" para ingresar como cliente
//2."show dbs" : nos mostrará las BD
//3."use notes-app" e. Estamos ingresando a la BD "notes-app" que es nuestra BD principal creada en el archivo database.js
//4."show collections" : nos mostrará nuestras colecciones como "notes" que es creada cuando se usa. ya que este archivo no creará la colección si no se usa
//5.db.notes.find(). //para ver el contenido de la coleccion
//db.notes.find().pretty() nos devolverá lo mismo q el paso 5 pero de una manera + entendible
//db.users.drop() //elimina todos los datos que hay en la BDs
