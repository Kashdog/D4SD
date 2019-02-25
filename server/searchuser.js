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
    res.json({
        success: true,
        message: 'u searched'
    });
    var email = req.body.email;
    console.log(email)
    pool.connect().then(client=>{ 
        console.log("connected");
        return client.query("Select * FROM users WHERE email = $1",[email])
        .then(res=>{
            if (res.rows.length){
                console.log(res.rows[0])
            }else{
                console.log("no found")
            }
        }).then(res=>{
            client.release()
        })
        })
});


module.exports = router;