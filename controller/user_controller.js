const db = require('../Db/db')
const multer  = require('multer')



const uploadDetails = (req,res)=>{
     const username = req.body['name'];
      const email = req.body['Email'];
      const Phone = req.body['phone'];
      const Address = req.body['address'];
       console.log(req.file)
     res.json({body:req.body,files:req.file})
    
       let sql = "INSERT INTO `USER` (Username, Email, Phone,address,Fpassport,Bpassport,Personalimage) VALUES (?,?,?,?,?,?,?)";
        db.query(sql, [username,email,phone,Address,Personalimage,FPP,Bpp], (err, result) => {
            if (err) throw err
            console.log("data uploaded")
        })
    }

module.exports={
    uploadDetails
   
}