// implement all the required inputs
const express = require('express')
const bodyParser = require('body-parser')
const mysql = require('mysql')
const session = require('express-session')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

// declare the app
const app = express()

// declare and use cors
const cors = require('cors')
const { response } = require('express')
app.use(cors())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }
}))

//parse the application using json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

// create a database connection
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'legalconclave'
})

// connect the database
connection.connect((err) => {
    if (err) throw err;
    console.log('Databse Connected')
})

// get request
app.get('/', (req, res) => {
    res.send('Hello, world')
})

// user registration request
app.post('/api/users/register', (req, res) => {
    let password = req.body.password
    let confirmpassword = req.body.confirmpassword
    if (password !== confirmpassword) {
        res.send('password mismatch')
        return;
    }
    // retrieve the data from the request so that it can be inserted into the table
    // this data is to be inserted into either lawyer table or client table
    let data = {
        lawyer_name: req.body.name,
        email: req.body.email,
        user_id: '',
    }

    // this data is to be inserted into the login table
    let user = {
        username: req.body.username,
        password: md5(req.body.password.toString()),
        user_type: req.body.user_type,
        phone: req.body.mobile,
        status: '1',
    }

    // Insert query
    let sql = `INSERT INTO login SET ?`;
    console.log('registered')
    let query = connection.query(sql, user, (err, result) => {
        if (err) {
            res.send('error occurred')
        }
        // set user_id in the data object
        console.log(user.user_type)
        console.log(result)
        console.log(result.insertId)
        data.user_id = result.insertId
        // insert data into customer table or lawyer table
        if (user.user_type === 'customer') {
            console.log('Hello, user')
        }
        if (user.user_type === 'customer') {
            let sql2 = `INSERT INTO client SET ?`;
            let query = connection.query(sql2, user``, (err, result) => {
                if (err) throw err;
                console.log('user added to client table')
                console.log(result)
                res.send(JSON.stringify({ "status": 200, "error": null, "response": result }))
            })
        } else {
            let sql2 = `INSERT INTO lawyer SET ?`;
            let query = connection.query(sql2, data, (err, result) => {
                if (err) throw err;
                console.log('user added to lawyer table')
                console.log(result)
                res.send(JSON.stringify({ "status": 200, "error": null, "response": result }))
            })
        }
    })
})

// api for the login of an user
app.post('/api/users/login', (req, res) => {
    let sql = 'SELECT * FROM login WHERE username="' + req.body.username + '" and password="' + md5(req.body.password.toString()) + '"';
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        req.session.username = req.body.username;
        console.log('User logged in')
        console.log(req.sessionID)
        let token = jwt.sign({ data: result }, 'secret')
        console.log(token)
        res.send({ "status": 200, "error": null, "response": result, token: token })
    })
})

// trigger this api as soon as the user logs in
app.get('/api/lawyer', (req, res) => {
    let sql = 'SELECT * FROM lawyer';
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log('lawyers detals fetched')
        res.send(result)
    })
})

app.get('/api/lawyer/:type', (req, res) => {
    let sql = 'SELECT * FROM lawyer JOIN category ON category.category_id = lawyer.category_id WHERE category_name LIKE "%'+ req.params.type+'%";'
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log('lawyer type fetched')
        res.send(result)
    })
})

// app.listen so that our server is connected to a port from where we can fetch the data
app.listen(3000, () => {
    console.log('Application connected to port 3000')
})