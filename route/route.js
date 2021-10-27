const route = require('express').Router();
const path = require('path');
const fs = require('fs')
const userController = require('../controller/user_controller')
const multer  = require('multer');
const db = require('../Db/db.js')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      
      fs.mkdir('./uploads/',(err)=>{
       cb(null, './uploads/');
    });
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname))
  }
})
const upload = multer({ storage: storage })
const cpUpload = upload.fields([{ name: 'Personalimage' }, { name: 'FPP' },{name:'BPP'}]);


route.get('/getAlluser',(req,res)=>{
  let sql = "select * from users"
 
   db.query(sql, (err, result) => {
            if (err) throw err
          res.json({result})
        })
})
route.post('/createpost',(req,res)=>{

    let post = req.body.text;
    let title = req.body.title;
    let sql = `INSERT INTO posts(title,post) VALUES (?,?)`
   db.query(sql,[title,post], (err, result) => {
            if (err) throw err
          res.json({result})
           
        })

})
route.post('/deletepost/:id',(req,res)=>{

  let param = req.params.id;
    let sql ='DELETE FROM posts WHERE id=?;'
   db.query(sql,param, (err, result) => {
            if (err) throw err
          res.json({result})
           
        })
})
route.post('/updatepost/:id',(req,res)=>{
  let post = req.body.text;
  let title = req.body.title;
  let param = req.params.id;
    let sql =`UPDATE posts
                 SET post = ?,title=?
                           WHERE id = ?`;
   db.query(sql,[post,title,param] ,(err, result) => {
            if (err) throw err
         res.json({result})
           
        })
})
route.get('/getuser/:id',(req,res)=>{
  let param = req.params.id;
  let sql = "select * from users where id=?"
   db.query(sql,param, (err, result) => {
            if (err) throw err
          res.json({result})
          console.log(result)
        })
})

route.post('/adduser',cpUpload , (req,res)=>{
    let name = req.body.name;
     let email = req.body.Email;
     let phone = req.body.phone;
     let address = req.body.address;
     console.log(req.files,req.body)
     let Personalimage= req.files.Personalimage[0].filename;
     let fpp = req.files.FPP[0].filename;
      let Bpp = req.files.BPP[0].filename;
   let sql = `INSERT INTO users(Username,Email,Phone,address, Fpassport ,Bpassport,Personalimage) VALUES (?,?,?,?,?,?,?)`
    db.query(sql, [name,email,phone,address,Personalimage,fpp,Bpp], (err, result) => {
            if (err) throw err
            console.log("data uploaded")
        })
 
})
module.exports = route