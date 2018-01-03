/**
 * app.js
 *
 * Use `app.js` to run your app without `sails lift`.
 * To start the server, run: `node app.js`.
 *
 * This is handy in situations where the sails CLI is not relevant or useful.
 *
 * For example:
 *   => `node app.js`
 *   => `forever start app.js`
 *   => `node debug app.js`
 *   => `modulus deploy`
 *   => `heroku scale`
 *
 *
 * The same command-line arguments are supported, e.g.:
 * `node app.js --silent --port=80 --prod`
 */


// Ensure we're in the project directory, so cwd-relative paths work as expected
// no matter where we actually lift from.
// > Note: This is not required in order to lift, but it is a convenient default.
process.chdir(__dirname);

// Attempt to import `sails`.
var sails;
try {
  sails = require('sails');
} catch (e) {
  console.error('To run an app using `node app.js`, you usually need to have a version of `sails` installed in the same directory as your app.');
  console.error('To do that, run `npm install sails`');
  console.error('');
  console.error('Alternatively, if you have sails installed globally (i.e. you did `npm install -g sails`), you can use `sails lift`.');
  console.error('When you run `sails lift`, your app will still use a local `./node_modules/sails` dependency if it exists,');
  console.error('but if it doesn\'t, the app will run with the global sails instead!');
  return;
}

// --•
// Try to get `rc` dependency (for loading `.sailsrc` files).
var rc;
try {
  rc = require('rc');
} catch (e0) {
  try {
    rc = require('sails/node_modules/rc');
  } catch (e1) {
    console.error('Could not find dependency: `rc`.');
    console.error('Your `.sailsrc` file(s) will be ignored.');
    console.error('To resolve this, run:');
    console.error('npm install rc --save');
    rc = function () { return {}; };
  }
}

var express=require('express');
var mongoose=require('mongoose');
var bodyparser=require('body-parser');
var cors=require('cors');
var path=require('path');
var app=express();
const register=require('./config/register');
const login=require('./config/login');
const playlist=require('./config/playlist');
const addsong=require('./config/addsong');
const removesong=require('./config/removesong');

//connect to mongodb
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/userSchema',
  { useMongoClient: true });

//on database connection
mongoose.connection.on('connected',function () {
  console.log('Connected to database mongodb @ 27017');
});

//on database connection failure
mongoose.connection.on('error',function(err){
  if(err)
  {
    console.log('Error in database connection:'+err);
  }

});

//port no
const port=3000;

//adding middleware-cors
app.use(cors());

//body-parser
app.use(bodyparser.json());

app.post('/register',register);
app.post('/login',login);
app.post('/addsong',addsong);
app.post('/removesong',removesong);
app.get('/playlist',playlist);
//get home page
app.get('/',function(req,res){
  res.send('Hi! Welcome to server');
});

app.listen(port,function () {
  console.log('Server started on port'+port);

});

// Start server
sails.lift(rc('sails'));
