const express = require('express');
const router = express.Router();

/*Para no poder legibilidad, los callbacks los crearemos en el archivo ./controllers/index.controllers.js
router.get('/',(request,response)=>{
    response.render('index'); //renderizamos el archivo index.hbs de la carpeta views 
});
*/
//llamamos al archivo index.controllers.js y solo requerimos estas 2 funciones que se usarán con el mismo nombre 
const {renderIndex, renderAbout} = require('../controllers/index.controllers');

router.get('/',renderIndex);

router.get('/about',renderAbout);
    

module.exports = router;