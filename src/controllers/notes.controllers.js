//Es un archivo donde se guardará las rutas para el archivo notes.routes.js

//definimos un objeto vacio al cual le agregaremos atributos que serán las funciones de renderizacion del archivo ../routes/notes.routes.js
//para luego exportar el objeto 
const notesCtrl = {}; 
const Note = require('../models/Note'); //esto nos envía el modelo de la nota que será guardado en nuestra base de datos
const { response } = require('../server');

notesCtrl.renderNoteForm = (request,response)=>{
    response.render('notes/newNote');
}

notesCtrl.createNewNote = async (req,res)=>{
    //console.log(req.body); //req.body nos muestra la información q se envia en el formulario. Lo mostramos en consola y nos muestra un objeto donde la clave es el name de los inputs y el valor es la informacion que le enviamos. que lo guarda como string
    const {title, description} = req.body; //guardamos la información enviada en varaibles con el mismo nombre que el name de los input
    const newNote = new Note({title:title,description:description}); //creamos y guardamos los datos en una constate como un objeto. Con las nuevas actualizaciones de JS podemos simplificar title: title y poner solo title que significa lo mismo
    //console.log(newNote);  //es para mostrar por consola el objeto creado. Donde vemos los atributos title y description y un adicional "id" con el  lo guardaremos en mongodb
    newNote.user = req.user.id; //antes de guardar al usuario le agregamos el id del usuario que creo la nota para asociarlo
    await newNote.save(); //guardamos la nueva nota dentro de mongodb. La cual se hará de manera asíncrona

    //mensaje con flash y session
    req.flash('success_msg','Note add successfully');

    res.redirect('/notes'); //redireccionamos a /notes o actualizamos la paginas de notas
}

notesCtrl.renderNotes = async (req,res)=>{
    const notes = await Note.find({user: req.user.id}); //Note.find() nos devolverá toda la colección guardada de notas. Pero el objeto {user:req.user.id} filtrará solo las notas que tengan el id de incio de sesión
    res.render('notes/all-notes',{notes}); //renderizamos el archivo all-notes y le enviamos el objeto notes para que nos muestra las notas el cual se mdificara la vista en el archivo que renderizamos
}

notesCtrl.renderEditForm = async (req,res)=>{
    const note = await Note.findById(req.params.id); //buscamos la nota con el id que se hará la consulta
    if(note.user != req.user.id){
        req.flash('error_msg','I not found');
        return res.redirect('/notes');
    }
    res.render('notes/edit-note',{note});


}

notesCtrl.updateNote = async (req,res)=>{
    //console.log(req.body); //lo usamos para mostrar la informacion que se obtiene al editar una nota
    const {title,description} = req.body; //guardamos los datos en variables del mismo nombre
    await Note.findByIdAndUpdate(req.params.id,{title,description}); //buscamos y actualizamos los datos. 1er parametro es el id del archivo que vamos a actualizar. 2do es los datos que actualziaremos. title: title es igual a title

    //mensaje con flash y session
    req.flash('success_msg','Note updated successfully');

    res.redirect('/notes');  //redireccionamos a la pagina de notas 
}

notesCtrl.deleteNote = async (req,res)=>{
    await Note.findByIdAndDelete(req.params.id); //con esto eliminaremos los datos con el id 
    
    //mensaje con flash y session del archivo server.js
    req.flash('success_msg','Delete successfully');
    
    res.redirect('/notes'); //redireccionamos a la misma página o actualizamos la página 
}

module.exports = notesCtrl;

