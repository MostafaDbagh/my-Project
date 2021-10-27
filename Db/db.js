var mysql = require('mysql');

var db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database:"uaevisa"
 
});
db.connect(err=>{
    if(err){
       throw err
    }
    console.log('you are connected ')
})
 
module.exports =db; 