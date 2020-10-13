const flash = require('express-flash');
const session = require('express-session');
let express = require('express');
let app = express();
const bodyParser = require('body-parser');
const exhbs = require('express-handlebars');
const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgresql://melissa:pg123@localhost:5432/users';

const Pool = pg.Pool;
const pool = new Pool({ //a connection pool
  connectionString
});


const greetings = require('./greetings-factory');
const greetingEntry = greetings(pool);

// initialise session middleware - flash-express depends on it
app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

app.engine('handlebars', exhbs({ defaultLayout: 'main' }));

app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json());

app.get('/', function (req, res) {
 // let count = await greetingEntry.getData();
  res.render('index');
})

app.get('/addFlash', function (req, res) {
  req.flash('info', 'Flash Message Added');
  res.redirect('/');
});

app.get('/greeted', async function (req, res) {
  const usersWait = await greetingEntry.getData();
  console.log({ usersWait: usersWait.rows })
  res.render('greeted', { names: usersWait.rows, count: 1 });

})

app.get('/counter/:username', async function (req, res) {
  let userGreet = req.params.username;
  let namesList = await greetingEntry.getUser(userGreet);
  const user = namesList.rows[0];
  console.log({ user });

  let counterMsg = "Hi, " + user.user_name + " you have been greeted " + user.user_count + " times"
  res.render('counter', { message: counterMsg })
})

app.post('/', async function (req, res) {
  let greetingsX = req.body.enterUser;
  let solidGreet = req.body.solidGreet;

  var msg = greetingEntry.alertUser(greetingsX, solidGreet);

  if (msg === '') {
    req.flash('error', "please make sure you've entered your name")
  }

  const message = await greetingEntry.greetWorkFlow(greetingsX, solidGreet)

  let count = await greetingEntry.getData();

  count = count.rowCount

  res.render('index', {
    message,
    count
  })
})

app.get("/reset", async function (req, res) {
  await greetingEntry.deleteUsers();
  res.redirect("/")
})

const PORT = process.env.PORT || 1102;
app.listen(PORT, function () {
  console.log('App started at:', PORT);
});

