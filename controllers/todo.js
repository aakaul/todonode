const bodyParser= require('body-parser');
const mongoose= require('mongoose');

//connect to database

 mongoose.connect('mongodb://username:password@ds229609.mlab.com:29609/todo')
//let data = [{item: 'get milk'}, {item: 'walk dog'},{item:'kick some coding ass'}];

// create schema- this is like a blue print

const todoSchema= new mongoose.Schema({
  item: String
});

// create a model

const Todo = mongoose.model('Todo', todoSchema);
/*const itemOne= Todo({item:'getflowers'}).save(function (err) {
if (err) throw err;
console.log('item saved');
});*/


const urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app){

  app.get('/todo', function (req, res){
    //get data from mongodb and pass it to view

Todo.find({}, function (err, data) {
if (err) throw err;
res.render('C:/Users/Adarsh/Documents/mysites/nodejs/todoapp/view/todo.ejs',{todos: data});
})
  });

  app.post('/todo',urlencodedParser, function (req, res){
    //get data from the view and add it to mongodb
    const newTodo= Todo(req.body).save(function (err,data) {
      if(err) throw err;
      res.json(data);
    });
  });

  app.delete('/todo/:item', function (req, res){
    // delete the requested item from the mongodb
    Todo.find({item: req.params.item.replace(/\-/g," ")}).remove(function (err, data) {
      if (err) throw err;
      res.json(data)

    });
});
};
