require("dotenv").config()
const express = require('express')
const app = express()
app.use(express.json())

var indexRouter = require('./routes');
var cors = require("cors");

const port = process.env.TOKEN_SERVER_PORT 

app.use('/', cors(), indexRouter);

app.listen(port, () => { 
    console.log(`Authorization Server running on ${port}...`)
})

module.exports = app;













