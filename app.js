const express = require('express');
const todoController = require('./controllers/todo');
const app = express();

// set a templete engine
app.set('view engine', 'ejs');

//statics file

app.use(express.static('./public'));

//fire controllerrs

todoController(app);

//listen to the pport
app.listen(3000);
console.log('you are listening to the port 3000');
