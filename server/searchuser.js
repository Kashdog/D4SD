var express = require('express');
var router = express.Router();
var pg = require('pg');

var config = { 
    user:"postgres",
    database:"d4sd",
    password:"alsirg",
    port:5432,
    max:20,
    idleTimeoutMillis:3000,
    }
    
var pool = new pg.Pool(config);

router.post('/', function (req, res) {
    var msg = '';
    var email = req.body.email;
    console.log(email)
    pool.connect().then(client=>{ 
        console.log("connected");
        return client.query("Select * FROM users WHERE email = $1",[email])
        .then(res=>{
            if (res.rows.length){
                console.log(res.rows[0])
                msg = "We found ur friend!"
            }else{
                console.log("no found")
                msg = "ur friend didn't register yet!"
            }
        }).then(res=>{
            client.release()
        })
        })
        .then(()=>{
            res.json({
                message: msg
            });
        })
});


module.exports = router;