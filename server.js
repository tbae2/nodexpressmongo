const express = require('express');
const app = express();
//module installed, ability to extract data from form element
const bodyParser = require('body-parser');
//nodejs built in module , requird to build the path to index.html
const path = require('path');
//this is expresses way of responding to a browsers GET request
// / is the root of a domain, res = response to the request that is sent back
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

//this sets the view engine to ejs via express
app.set('view engine', 'ejs');


//makes the public folder accessible to publicusers , built in middleware static

app.use(express.static('public'));
//lets nodejs/app read JSON data sent from site
app.use(bodyParser.json());
// app.get('/', function(req, res){
//   //__dirname name of the directory the currently executing script resides in
//   res.sendFile(path.join(__dirname + '/index.html'));
// });

//tells body parser to extract data from form and put in body of request
app.use(bodyParser.urlencoded({extended: true}));

//this var allows us to use the database when getting requests from browser
var db;

//connect url is locally hosted mongodb
MongoClient.connect('mongodb://localhost:27017/swquote', function(err, database){
    if(err){
      return console.log('unable to connect to mongodb. error:', err);
    }
    //this is the linking of the var to the database from mongo
    db = database;

    //this is moved into here so that it only starts when it has a database connection
    app.listen(3000, function(){
      console.log('listening on 3000');
    });

});

app.post('/quotes', function(req, res){
//extends the database collection method (mongodb) + the save method
  db.collection('quotes').save(req.body, function(err, result){
   if(err) return console.log(err);
   console.log(req.body);
    console.log('saved to database');
    //redirect the user back to the index page
    res.redirect('/');


  })

});

app.get('/', function(req, res){
  //the find method off the mongodb collectio returns a "cursor" mongodb type object
  //to Arry turns it into a readable array
  db.collection('quotes').find().toArray(function(err, result){
     if(err) return console.log(err);
     res.render('index.ejs', {quotes: result})
  });
});

app.put('/quotes', function(req,res){

})
