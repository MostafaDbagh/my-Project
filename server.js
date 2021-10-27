const express = require('express')
const app = express()
const mysql = require('mysql')
const path = require('path')
const cors = require("cors");
const multer  = require('multer');
const Db = require('./Db/db')
const route = require('./route/route')
app.use(cors());
app.use(express.static("./public"))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname ,'uploads')));
 app.use('/',route)





 
//create connection
const PORT = 4000;
app.listen(PORT, () => console.log(`Server is running at port ${PORT}`))