

// This is project entry point. If you start the
// server by typing node expresstut.js and then open the
// browser at localhost:3000 you'll get a 404 error if
// you haven't defined any routes
// Imports
var express = require('express');
var bodyParser = require('body-parser'); 
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
//imported filesystem
var fs = require('file-system');

var app = express();

var router = express.Router()
var realtimeRoute = express.Router()
var controlRoute = express.Router()

app.disable('x-powered-by');

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');


 


// //write to json
// let data = JSON.stringify(rData);  
// fs.writeFileSync('./realtimedb.json', data);  


 //global variable of json data
app.locals.realtimedbObj = require('./realtimedb.json')







// fs.mkdir('1/2/3/4/5', [0o777], function(err) {});
// fs.mkdirSync('1/2/3/4/5', [0o777]);
// fs.writeFile('path/test.txt', 'aaa', function(err) {})

//using RESTful
//routing request to add user
//app.post('/users/:userid',1001);
 


//define port to run on
app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/public'));


app.use('/', router);
//middleware bodyparser
router.use(bodyParser.json())
 

// route to home.handlebars
router.get('/', (req, res) => {
  res.render('home') 
});



// route realtimep.handlebars - go realtime > show
router.use('/realtime', realtimeRoute )


//access /realtime/show
realtimeRoute.get('/show', (req, res) => {
   res.render('realtimep')
});

 //access /realtime/data
realtimeRoute.get('/data', (req, res) => {

 // random number generator
 var rNum = Math.floor((Math.random() * 999) + 1);
 let rData = {  
    data: rNum
};
//write random data number to json when is page accessed
let data = JSON.stringify(rData);  
fs.writeFileSync('./realtimedb.json', data);  

//load and parse JSON database to a variable
var text = fs.readFileSync('./realtimedb.json','utf8')
text = JSON.parse(text)
//console.log (typeof text)
res.send(text)
})



//route to control page
router.use('/users', controlRoute )
// access /control/
controlRoute.get('/control', (req, res) => {

	res.render('usersp')
});
 



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


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate');
});