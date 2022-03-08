const passport = require('passport');
const localStrategy = require('passport-local').Strategy; //estrategia para autenticar
const User = require('../models/User'); //usaremos nuestro modelo para poder interactuar con la BD

//creamos una nueva estrategia que nos pide 2 parmetros. 
//1. Los datos que validaremos. userNameField lo definimos como el input con name="email" y passwordField como el input con name="password" 
//2. Un callback que será donde se hará la validación. Enviaremos el email, password y un callback para algunas instrucciones adicionales
passport.use(new localStrategy({
    usernameField: 'email',
    passwordField:'password'
}, async (email,password,done)=>{
    //Match Email's. Existe en nuestra base de datos el correo? es lo primero que vamos a validar
    const user = await User.findOne({email}); //si exite el correo me devolverá un objeto con los datos del usuario y si no existe me devolverá un objeto vació
    if(!user){
        return done(null,false,{message:'Not user found'});
    }else{
        //Match password's. Si el correo existe ahora vamos a validar si la contraseña es la correcta
        const match = await user.matchPassword(password);
        if(match){
            return done(null,user); //si existe el usuario nos devolverá los datos del usuario
        }else{
            return done(null,false,{message: 'Incorrect password'});
        }
    }
    
}));


//Luego que hemos iniciado. COmo hace passport para guardar al usuario?
passport.serializeUser((user,done)=>{
    done(null, user.id); //guardamos los datos del usuario con su id
})

//cada vez que navegamos va a tratar de deserializar al usuario guardado con id con el metodo
passport.deserializeUser((id,done)=>{
    //buscaremos por id en la BD. y pasaremos un callback donde devolverá al usuario si existe y si no enviará un error
    User.findById(id,(err,user)=>{
        done(err,user);  
    })
});




