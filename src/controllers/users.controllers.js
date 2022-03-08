const userCtrl = {};
const User = require('../models/User'); //traemos
const passport = require('passport')//requerimos passport para que el atributo sigin pueda autenticar al usuario

userCtrl.renderSignUpForm = (req,res)=>{
    res.render('users/signup');
}

userCtrl.signup = async (req,res)=>{
    const errors = [];
    //console.log(req.body); //mostramos los datos que nos envía la página
    const {name,email,password, confirm_password} = req.body;
    if(password != confirm_password){
        errors.push({text: 'Password do not match'});
    }
    if(password.length < 4){
        errors.push({text: 'Password must be at least 4 characters.'})
    }
    if(errors.length>0){
        res.render('users/signup',{
            errors,
            name,
            email
        });        
    }else{
        const emailUser = await User.findOne({email:email})
        if(emailUser){
            req.flash('error_msg','The email is already in use');
            res.redirect('/users/signup');
        }else{
            const newUser = new User({name,email,password});
            newUser.password = await newUser.encryptPassword(password); //ciframos la contraseña para guardarlo en la BD
            await newUser.save();
            req.flash('success_msg','You are registered');
            res.redirect('/users/signin');
        }
    }
}

userCtrl.renderSigninForm = (req,res)=>{
    res.render('users/signin');
}

//atributo que nos ayudará a validar datos de usuario. Usaremos el módulo passport. Lo haremos en el archivo passport.js de la carpeta config
//passport.authenticate nos permite validar siempre informacion obtenida.1.nos pide el nombre del método de autenticación que por defecto es local
userCtrl.signin = passport.authenticate('local',{
    failureRedirect: '/users/signin',//si hay un error redireccionamos a la misma página
    successRedirect: '/notes', //si todo es correcto a la pantalla de notes
    failureFlash: true //si existe un error quiero que use flash para enviar el mensaje. que lo guardará en la variable error
});


userCtrl.logout = (req,res)=>{
    req.logout(); //passport nos ayuda a eliminar los datos de sesión
    req.flash('success_msg','You are logged out now.');
    res.redirect('/users/signin');
}

module.exports = userCtrl;