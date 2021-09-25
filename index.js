const { json } = require('express');
const express= require('express');
const app=express(); // Se crea el servidor
//Se instalo ejs con npm install, esto es un motor de plantillas.No es necesario importarlo, ya que, esta integrado con express
//otros motores de plantillas son pug, handlebars, entre otros

//Settings
app.set('appName','Practica de Express');// Se crea una variable con nombre appName y se le asigna el valor Practica de Express
app.set('port',3000);//Se asigan el puerto 3000
app.set('view engine','ejs');// Se indica que como motor de plantilla se usara ejs



// Middlewares
function logger(req,res,next){// Maneja una peticion antes de que llegue a su ruta final
    console.log(`Route received: ${req.protocol}://${req.get('host')}${req.originalUrl}`);
    next();
}

app.use(express.json());//recibe al objeto request body y lo procesa
app.use(logger);



/*Routes
app.all('/contact',(req,res,next)=>{ //Todas las rutas contact pasan por aqui primero
    console.log("Por aqui paso");
    //res.send('finish');
    next();// va al siguiente contact


});
*/

app.get('/', (req,res) =>{
    const data=[{name: 'Marcos',age: 24},{name: 'Juan',age: 34},{name: 'Jose',age: 25}]
    res.render('index.ejs',{people: data});
});

app.get('/contact',(req,res) => {  //Se hace una peticion get al servidor en la ruta inical
    res.json([{
        username: 'Marcos',
        lastname: 'silva',
        age: 24
    },{username: 'Marcelo',
    lastname: 'silva',age: 21}]); //.send() solo envia texto, se puede cambiar por .json()
});

app.get("/about",(req,res) =>{ // Se hace una petion (request) get al servidor en la ruta /about
    //res.send("Peticion GET recibida");
    res.render('about.ejs');
    
});

//otro cambio mas jaja
//salu2
app.post("/contact/:id",(req,res) =>{ // Se hace una petion get al servidor en la ruta /about
    console.log(req.body); //req.body es el cuerpo de la peticion
    console.log(req.params);//En este caso id es un parametro de la peticion
    res.send("Peticion POST recibida");
});

app.put("/test/:id",(req,res) =>{ // Se hace una peticion get al servidor en la ruta /about
    console.log(req.body);
    res.send(`User ${req.params.id} updated`);
    //res.send("Peticion PUT recibida"); //Se le pasa un parametro y tambien puede recibir un body
});

app.delete("/contact/:userId",(req,res) =>{ // Se hace una petion get al servidor en la ruta /about
    res.send(`User ${req.params.userId} deleted`);
    //console.log(req.params);
});

app.use(express.static('public'));// este middleware viene instalado con express

app.listen(app.get('port'), () =>{
    console.log(app.get('appName'));
    console.log("Server on port", app.get('port'));
});