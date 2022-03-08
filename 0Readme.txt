En este proyecto haremos una página para poder agregar notas. Previamente nos
tenemos que registrar con nuestro usuario y contraseña.
Paso 1
    Necesitaremos los módulos node js y mongodb. Para saber si están instalados usamos 
    el comando : "node --version" y "mongod --version" que nos devolverá la versión
    si los módulos están instalados.
Paso 2 
    Usaremos el comando "npm init -y" que nos creará el archivo package.json que  
    enlistará de manera automática la información de los módulos o dependencias
    que necesita nuestro proyecto. Además podemos colocar descripción acerca del
    proyecto. La parte de scripts nos ayudará a crear nuestros propios comandos.
Paso3:
    Instalaremos los módulos necesarios para el proyecto con el comando 
    "npm install nombre_modulo".
    
    "express" : es un framework que nos ayudará a crear un servidor.
    "connect-flash" : módulo que nos ayudará a enviar mensajes entre las vistas
    "bcryptjs" : módulo de cifrado. que nos ayudará a cifrar las contraseñas para posteriormente guardarlas 
    "express-handlebars" : nos ayudará a crear vistas HBS que son similares a HTML pero con comandos de programación
    "express-sesion" : módulo nos ayuda a guardar datos en el servidor. Lo usaremos para guardar los datos cuando el usuario se logee y no tenga que estar iniciando a cada momento
    "method-override" : módulo que nos ayuda a enviar peticiones put,delete,... desde la vista o formulario
    "mongoose" : módulo que nos ayuda manejar la base de datos de mongodb
    "passport" : módulo que nos va permitir autenticar al usuario mediante un login, el cual se encargará tmb de verificar la cuenta.
    "passport-local" : módulo que nos ayuda a autenticar la información con nuestra propia base de datos. Ya que passport puede autenticar con cualquier base de datos como facebook, ...

    Podemos instalar cada módulo 1x1 o instalar todos a la vez dejando un espacio en blanco
    "npm install express connect-flash bcryptjs ..."
    Al momento de instalarlo se creará un directorio node_modules donde estarán los módulos instalados
    y un archivo package-lock.json que nos brinda mayores detalles de los módulos necesarios

Paso 4
    Instalaremos módulos para facilitar el desarrollo del proyecto
    
    "dotenv" : módulo que nos ayuda a utilizar variables de entorno en nuestro programa de forma segura. Como el link de la base de datos donde está el usuario y la contraseña de usuario así como estos datos tmb.
    "nodemon" : módulo que nos ayuda a reiniciar el servidor de manera automática cada vez que se cambia y guarda un cambio. Ya que si no reiniciamos y tenemos encendido el servidor los cambios no se actualizarán 
    "handlebars" : módulo que se instalará solo si aparece error con express-handlebars
    "npm-check-updates" : módulo que nos ayuda a supervisar si hay nuevos módulos o actualizaciones

    Usamos el comando
    "npm install dotenv nodemon handlebars npm-check-updates -D"
    -D nos indica que estos módulos no son necesarios para nuestro proyecto pero que se instalarán para 
    facilitar el desarrollo del proyecto

Paso 5 
    Crearemos una carpeta src donde estaá todo nuestro código. Dentro de esta carpeta
    crearemos los siguientes archivos y carpetas

    "index.js" : es nuestro archivo principal de donde arrancaremos la aplicación
    "server.js" : este archivo solo tendrá el código del servidor. El código de express ya que este es el módulo para el servidor
    "database.js" : este archivo será encargado de la conexión de la base de datos. El módulo de mongoose

    "config" : carpeta que nos va servir para configurar algunos módulos
    "controllers" : carpeta donde estará las funciones que utilizaremos cuando un usuario visite alguna ruta del servidor
    "helpers" : carpeta que nos ayuda a colocar funciones que de la vista hagan algo. Código adicional para handlebars
    "models" : carpeta que nos ayuda a almacenar los modelos de datos. Los esquemas que usaremos en la base de datos en mongodb
    "public" : carpeta donde estarán archivos públicos, estáticos que el navegador pueda acceder libremente css, imágenes, fuentes, ...
    "routes" : carpeta donde estarán las rutas o URL que tendrá nuestro servidor
    "views" :carpeta para guardar los archivos de handlebars o archivos html (o hbs) que estaremos enviando al navegador 


Paso 6
    Para ejecutar nuestro programa tendremos que poner el comando "node src/index.js"
    ejecutándolo desde consola dentro de nuestra carpeta principal ya que ahí están los módulos, 
    pero cada vez que hagamos un cambio tenemos que parar el servidor y iniciarlo nuevamente
    Para no estar haciendo eso vamos a usar el comando
    "npx nodemon src/index.js" : el cual gracias a nodemon cada vez que se realice un cambio
    y se guarde, nodemon reiniciará el servidor. 
    Este comando lo podemos poner directamente en consola y funcionará pero podemos usar 
    la parte de scripts de nuestro archivo package.json para abreviar este comando y personalizarlo
    Para eso podemos borrar lo que hay dentro o agregar un nuevo comando. Por ejemplo
    "start" : "npx nodemon src/index.js"  
    Hemos creado un comando de nombre start y que cada vez que en consola pongamos
    "npm start" se ejecutará el comando "npx nodemon src/index.js"

    Otro ejemplo
    "dev" : "npx nodemon src/index.js"
    es similar al anterior pero en este caso el nombre al ser diferente de start para ejecutarlo
    debemos colocar el comando "npm run dev"

Paso 7:
    "npm install morgan" : es un middleware de express que nos permite saber en consola el tipo de petición que se a realizado al servidor
Paso 8:
    "npm install -D handlebars@4.5.0 . Si se tiene un error xon express-handlebars se tiene que instalar handlebars la version 4.5.0 

