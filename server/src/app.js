const   express     = require('express'),
        path        = require('path'),
        bodyParser  = require('body-parser'),
        cons        = require('consolidate'),    // for dust
        dust        = require('dustjs-helpers'), // switch out to vuejs later
        cors        = require('cors'),
        morgan      = require('morgan'),
        app         = express();


// For Connecting to PSQL
const {Client} = require('pg');
const conString = "postgres://pevn_admin:pevn1234@localhost/g_store";
const client = new Client({
    connectionString: conString,
});

app.set('views', __dirname + '/views');

// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

app.use((cors()));
app.use(morgan('combine'));
client.connect();


// GET DATA FROM PSQL
app.get('/', function(req, res) {
  
    client.query('SELECT * FROM users', function(err, result) {
        if (err) {
            return console.log('error running query', err);
        }
        //sending data to home route
        
        res.send(result.rows);
        // res.render('index', {users: result.rows});
    });
});

app.get('/login/:id/:pw', function (req, res) {
    const id = req.params.id;
    const pw = req.params.pw;
    client.query('SELECT * FROM users where username = $1 AND pword = $2', [id, pw], function(err, result) {
        if (err) {
            return console.log('error running query', err);
        }
        //sending data to home route
         
        res.send(result.rows);
        // res.render('index', {users: result.rows});
    });
})

// insert data to psql when register route is called
app.post('/register', (req, res) => {
    client.query('INSERT INTO users(username, pword) VALUES ($1, $2)', [req.body.username, req.body.password]);
    res.redirect('/');
});





app.listen(3000, function() {
    console.log('Server is running on 3000');
});