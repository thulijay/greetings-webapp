const flash = require('express-flash');
const session = require('express-session');
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');

const greetings = require('./greetings-factory');
const greetingEntry = greetings();

//const handlebarSetup = exphbs({
// viewPath:  './views/main',
//layoutsDir : './views/layouts'
//});

//app.engine('handlebars', handlebarSetup);

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));
// initialise the flash middleware
app.use(flash());

//app.get('/action', function (req, res) {
//  req.flash('info', 'Flash Message Added');
// res.redirect('/');

app.engine('handlebars', exhbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/', function (req, res) {
  // let count = greetingEntry.countNames();

  res.render('index', {
  });
})

app.post('/', function (req, res) {
  let greetingsX = req.body.enterUser;
  let solidGreet = req.body.solidGreet;

  greetingEntry.namesX(greetingsX)
  // var msg = greetingEntry.alertUser(greetingsX, solidGreet);
  // var nameMsg = greetingEntry.displayName(greetingsX);


  // if (msg !== '') {
  //   req.flash('info', message);
  // }

  res.render('index', {
    message: greetingEntry.languageSelector(greetingsX, solidGreet),
    count: greetingEntry.countNames()

  })
})

app.get('/greeted', function(req, res){
    res.render('greeted',{  names : greetingEntry.displayName()} ); 
})

app.get('/counter/:username', function(req, res){
let userGreet = req.params.username;
let namesList = greetingEntry.displayName()
let counterMsg = "Hi, " + userGreet + " you have been greeted " + namesList[userGreet] + " times"
res.render('counter', {message : counterMsg})
})

const PORT = process.env.PORT || 1101;
app.listen(PORT, function () {
  console.log('App started at:', PORT);
});