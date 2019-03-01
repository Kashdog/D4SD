var express = require('express');
var router = express.Router();
var pg = require('pg');
var nodemailer = require('nodemailer');

var config = { 
    user:"postgres",
    database:"d4sd",
    password:"alsirg",
    port:5432,
    max:20,
    idleTimeoutMillis:3000,
    }
    
var pool = new pg.Pool(config);

function sendInvitation(email){
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: 'aneeshkashalikar@gmail.com',
        pass: 'feanarocurufinwe40260$#'
        }
    });
    var mailOptions = {
        from: 'aneeshkashalikar@gmail.com',
        to: email,
        subject: 'Invitation from your friend',
        html: `<p>Your friend invite you to join D4SD!</p>`
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
};

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
                msg = "We found your friend and invited him/her"
            }else{
                console.log("no found")
                msg = "Your friend didn't register, but we invited him/her"
                sendInvitation(email);
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