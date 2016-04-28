/**
 * Module dependencies.
 */

var express = require('express')
	, routes = require('./routes')
	, http = require('http')
	, path = require('path')
	, session = require('client-sessions')
	, pool = require('./routes/mysql_pool');


//var app = express();

var router = new express.Router();

var about = require('./routes/about');
var register = require('./routes/register');
var login = require('./routes/login');
var homepage = require('./routes/homepage');
var profile = require('./routes/profile');
var logout = require('./routes/logout');
var group = require('./routes/group');
var getJson = require('./routes/getJson');
var getFrnds = require('./routes/getFrnds');
var getJsonTimeline = require('./routes/getJsonTimeline');
var search = require('./routes/search');
var timeline = require('./routes/timeline');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(session({
	  cookieName: "session" ,
	  secret: "mySECRETstring"
	}));
app.use(app.router);
app.engine('ejs', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', login.signin);
app.get('/signin', login.signin);
app.post('/register', register.about);
app.post('/login', login.login);


app.post('/getUserName',homepage.getUserName);
app.get('/homepage', homepage.homepage);

//app.get('/checkFriendStatus', getJsonTimeline.checkFriendStatus);
//app.post('/sendFriendRequest',getJsonTimeline.sendFriendRequest);
//app.post('/acceptFriendRequest',getJsonTimeline.acceptFriendRequest);
//app.post('/ignoreFriendRequest',getJsonTimeline.ignoreFriendRequest);
//
//app.get('/pendingList', getFrnds.pendingList);
//app.get('/getFrndsPage', getFrnds.renderer);
//app.get('/getFrnds', getFrnds.list);
//
//app.post('/addProfile', profile.profile);
//app.get('/getJson', getJson.getJson);
//app.post('/postStatus', getJson.postStatus);
app.get('/about', about.about);
app.get('/logout', logout.logout);




// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}



//pool.createPool(20);

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});
