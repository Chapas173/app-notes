//Es un archivo donde se guardará las rutas para el archivo index.routes.js

//definimos un objeto vacio al cual le agregaremos atributos que serán las funciones de renderizacion del archivo ../routes/index.routes.js
//para luego exportar el objeto 
const indexCtrl = {}; 

//agragsmo un atributo al objeto llamado renderIndex que lo que hace es renderizar a la ruta incial el archivo index.js
indexCtrl.renderIndex = (request,response)=>{
    response.render('index'); //renderizamos el archivo about.hbs de la carpeta views cuando entramos al enlace /about
}

indexCtrl.renderAbout = (request,response)=>{
    response.render('about'); //renderizamos el archivo about.hbs de la carpeta views cuando entramos al enlace /about
}

module.exports = indexCtrl;
