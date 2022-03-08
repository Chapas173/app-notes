const {Schema,model} = require('mongoose'); //esta parte es similar al archivo Notes.js donde está explicado
const bcryptjs = require('bcryptjs')

const UserSchema = new Schema({
    name:{type: String, required:true},
    email:{type: String,required:true,unique:true}, //unique:true nos enviará un error si el correo que registra ya se encuentra registrado
    password: {type: String, required:true}
},{timestamps:true})

//usamos el método methods de mongoose para crear un metodo a nuestra clase UserSchema para cifrar la contraseña del usuario.
//el nombre de este método es encryptPassword
UserSchema.methods.encryptPassword = async password=>{
    const salt = await bcryptjs.genSalt(10); //genSalt es un algoritmo que pide un parámetro (cuantas veces quieres ejecutar el algoritmo). Esto puede tardar así que lo generamos de manera asíncrona para ello usamos await y async
    return await bcryptjs.hash(password,salt); //hash nos pide 2 parámetros. la palabra a cifrar y un salt (palabra clave para hacer el cifrado). Devuelve la contraseña cifrada q se guardará en la BD
}

//este método tomará una contraseña pero para poder comparar si la contraseña es correcta
//para este método usaremos las funciones normales para poder usar ela palabra clave this que hace referencia al password del esquema de UserSchema
UserSchema.methods.matchPassword = async function(password){
    return await bcryptjs.compare(password,this.password); //compara la contraseña que se le da con la del esquema . Devuelve true o false
}

module.exports = model('User',UserSchema)