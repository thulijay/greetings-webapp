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
const routesGreeting = require('./routes')
const greetingEntry = greetings(pool);
const greetingsR = routesGreeting(greetingEntry)

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

app.get('/', greetingsR.homeRoute)

app.get('/addFlash', greetingsR.addedFlash)

app.get('/greeted', greetingsR.userCount)

app.get('/counter/:username', greetingsR.personsCount)

app.post('/', greetingsR.flashMsg)

app.get("/reset", greetingsR.resetUsers)

const PORT = process.env.PORT || 3101;
app.listen(PORT, function () {
  console.log('App started at:', PORT);
});