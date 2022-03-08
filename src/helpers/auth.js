//archivo que nos ayudará a proteger las rutas. De páginas que solo verá el usuario registrado
const helpers = {};

helpers.isAuthenticated = (req,res, next)=>{
    //isAuthenticated es un metodo de passport que nos indica si tiene una sesión o no
    if(req.isAuthenticated()){  
        return next();
    }
    req.flash('error_msg','Login for see the files');
    res.redirect('/users/signin');

}

module.exports = helpers; 