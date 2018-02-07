//using cmd prompt 'npm install'
//'node index.js' to start server


// Import the express module
var express = require('express');
//imports
var bodyParser = require('body-parser');
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var app = express();

var router = express.Router()
var realtimeRoute = express.Router()
var controlRoute = express.Router()

app.disable('x-powered-by');



app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({ extended: false }));
// Parse application/json
app.use(bodyParser.json());

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


//  //global variable of json
// app.locals.realtimedbObj = require('./realtimedb.json')

//load json file
var userDB = fs.readFileSync('./usersDB.json','utf8');
userDB = JSON.parse(userDB);





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
realtimeRoute.get('/reactshow', (req, res) => {
//   //write to json
// let data = JSON.stringify(rData);
// fs.writeFileSync('./realtimedb.json', data);
   res.render('realtimep')
});

 //access /realtime/data
realtimeRoute.get('/data', (req, res) => {

  randNum = Math.floor((Math.random() * 999) + 1);
  res.json({"data": randNum });



var text = fs.readFileSync('./realtimedb.json','utf8')
text = JSON.parse(text)
//console.log (typeof text)
res.send(text)
})



//go to users control.
router.use('/users', controlRoute )
controlRoute.get('/reactcontrol', (req, res) => {

	res.render('usersp')
});


//PUT
app.put('/users', function(req, res){
	var body = req.body;
	console.log(body);
	res.send("PUT request success");
});

app.get('/users', function(req, res){
	console.log ("GET: is a " + typeof userDB + " type");
	res.send(userDB);
});

// POST - Update json using the form from /users/reactcontrol
app.post('/users/submit', function(req, res){
	var nBody = req.body;
	var newid = Number(nBody.id);
	userDB['theUsers'].push(nBody);
	userDBstringObj = JSON.stringify(userDB, null, 2);
	/*if(users[id]){
		var reply = {
			msg: "ID already exists."
		}
	}else{
	users[id] = firstname + " " + lastname;*/

	nBody = JSON.stringify(userDB, null, 2);
	fs.writeFile('./usersDB.JSON', userDBstringObj, function (err) {
		if (err) throw err;

		console.log('Updated!');
    // console.log(userDB);
		res.send("User ID: " + nBody + " created Successfully!");
	});
});
//DELETE
app.delete('/users/:id', function(req, res){
	console.log ("DELETE: ");
	res.send(userDB);
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
