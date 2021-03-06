var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');
var passport = require('./server/auth/passport');
var configs = require('./server/auth/authConfig');
//routes folder
var private = require('./server/routes/private/index');
var form = require('./server/routes/form.js');
var auth = require('./server/routes/auth.js');
var adminview = require('./server/routes/private/adminview');
var applicantRouter = require('./server/routes/private/applicant.js');
var emailTemplateRouter = require('./server/routes/private/emailTemplate.js');
var confirmEmailRouter = require('./server/routes/confirmEmail.js');
var sendEmailRouter = require('./server/routes/private/sendEmail.js');
var volunteerRouter = require('./server/routes/private/volunteer.js');
var isLoggedIn = require('./server/utils/auth');

var session = require('express-session');
var MongoDB = mongoose.connect(process.env.MONGODB_URI).connection;

//app.use('/public', express.static('public'));  // serve files from public
app.use(express.static('Volunteer/public'));
app.use(express.static('Admin/public'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

MongoDB.on('error', function (err) {
    console.log('mongodb connection error:', err);
});

MongoDB.once('open', function () {
  console.log('mongodb connection open!');
});

/**
 * Creates session that will be stored in memory.
 * @todo Before deploying to production,
 * configure session store to save to DB instead of memory (default).
 * @see {@link https://www.npmjs.com/package/express-session}
 */
app.use(session({
  secret: configs.sessionVars.secret,
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: { maxage: 60000, secure: false },
}));
/** ---------- PASSPORT ---------- **/
app.use(passport.initialize()); // kickstart passport
/**
 * Alters request object to include user object.
 * @see {@link auth/passport}
 */
app.use(passport.session());

/** ---------- ROUTES ---------- **/
app.use('/auth', auth);
app.use('/', form);
app.use('/confirmEmail', confirmEmailRouter);
app.use('/private', isLoggedIn, private);
app.use('/private/adminview', isLoggedIn, adminview);
app.use('/applicant', isLoggedIn, applicantRouter);
app.use('/private/emailTemplate', isLoggedIn, emailTemplateRouter);
app.use('/private/sendEmail', isLoggedIn, sendEmailRouter);
app.use('/volunteer', isLoggedIn, volunteerRouter);

//listen on port 3000
app.listen((process.env.PORT || '3000'), function(){
  console.log("Server listening");
});

// Temporary code to make all Prime group members admins.
// Remove in production code, maybe.

// var init = require('./server/utils/init');
// init();
