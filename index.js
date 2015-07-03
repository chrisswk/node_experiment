// This is where we require all the modules.



var express = require('express'); //requires express, our node server
var app = express();//starts an instance of express

var jade = require('jade'); //requires and instantiates jade

var mongoClient = require('mongodb').MongoClient; //requires and instantiates a database
var url = 'mongodb://localhost:27017/node_sample'; //directs us to a location for our database, I think
var dbConnection;//  allocates dbConnection into the global namespace without assigning anything to it.

// mongoClient.connect(url, function(err, db) {  tests to see if we have a database.  If not,
  // will not assign the database to our dbConnection variable
//   if (err) {
//     console.log("ohhh noooo", err);
//   } else {
//     dbConnection = db;
//   }
// })

app.set('view engine', 'jade');  //sets jade as our viewing engine
app.set('views', './views');  //Specifies where we'll find our views

// Sample server var to show the server is running @ a place.//Tests to see if everything works
var server = app.listen(3000, function(){
  console.log('listening on port: ', server.address().port);
});



// Routes go down here
app.get('/', function (req, res) { //establishes a route at the route of our folder, passes two arguments
  //request and response, to the below block of code.
  // console.log(req); // This <<-- right here..... Don't do that.........
  var writeUsers = dbConnection.collection('users').insert({name: "Sue", //I think this inserts an object into the db column users...
                                              age: 26,  //if a column is the right way to think of a non-relational database
                                              status: "A",
                                              groups: [ "news", "sports" ]})
  // var users = dbConnection.collection('users');
  var users = dbConnection.collection('users').find({age: { $gt: 29 }})  //searches through our database using MongoDB syntax $
  res.status(200).render('index', { //responds to requests with http code 200 EVERYTHING OK, passes 'Hunter' and specifies our users object to
    //be render by index, which is probably the same as the JSON object.
    name: 'Hunter',
    users: users
  });
});
