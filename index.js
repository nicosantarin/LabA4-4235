

// This is project entry point. If you start the
// server by typing node expresstut.js and then open the
// browser at localhost:3000 you'll get a 404 error if
// you haven't defined any routes
// Import the express module
var express = require('express');
var app = express();

var router = express.Router()
var realtimeRoute = express.Router()
var controlRoute = express.Router()

app.disable('x-powered-by');


var bodyParser = require('body-parser'); 

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//imported filesystem
var fs = require('file-system');
 
 // random num generator
 var rNum = Math.floor((Math.random() * 999) + 1);
 let rData = {  
    data: rNum
};
// //write to json
// let data = JSON.stringify(rData);  
// fs.writeFileSync('./realtimedb.json', data);  


 //global variable of json
app.locals.realtimedbObj = require('./realtimedb.json')







// fs.mkdir('1/2/3/4/5', [0o777], function(err) {});
// fs.mkdirSync('1/2/3/4/5', [0o777]);
// fs.writeFile('path/test.txt', 'aaa', function(err) {})

//using RESTful
//routing request to add user
//app.post('/users/:userid',1001);
 

//more imports
//define port to run on
app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

app.use('/', router);

//middleware bodyparser
router.use(bodyParser.json())
 

// lab 3 route
router.get('/', (req, res) => {
  res.render('home') 
});




// go realtime > show
router.use('/realtime', realtimeRoute )
realtimeRoute.get('/show', (req, res) => {
  //write to json
let data = JSON.stringify(rData);  
fs.writeFileSync('./realtimedb.json', data);  
   res.render('realtimep')
});
 
 //access /realtime/data
realtimeRoute.get('/data', (req, res) => {

 	
// let rData = {  
//     data: rNum
// };

// let data = JSON.stringify(rData);  
// fs.writeFileSync('./realtimedb.json', data);  

 
var text = fs.readFileSync('./realtimedb.json','utf8')
text = JSON.parse(text)
//console.log (typeof text)
res.send(text)
})



//go to users control.
router.use('/users', controlRoute )
controlRoute.get('/control', (req, res) => {

	res.render('usersp')
});
 

// //middleware example
// app.use(function(req, res, next){
//   console.log('Looking for URL : ' + req.url);
//   next();
// });
// //middleware report and throw errors
// app.get('/junk', function(req, res, next){
//   console.log('Tried to access /junk');
//   throw new Error('/junk does\'t exist');
// });
// Catches the error and logs it and then continues
// down the pipeline
// app.use(function(err, req, res, next){
//   console.log('Error : ' + err.message);
//   next();
// });









// Defines a custom 404 Page and we use app.use because
// the request didn't match a route (Must follow the routes)
app.use(function(req, res) {
  // Define the content type
  res.type('text/html');
// The default status is 200
  res.status(404);
// Point to 404.handlebars view
  res.render('404');
});
// // Custom 500 Page
// app.use(function(err, req, res, next) {
//   console.error(err.stack);
//   res.status(500);
// // Point to 500.handlebars view
//   res.render('500');
// });








app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});