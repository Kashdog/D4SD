var express = require('express');
var router = express.Router();
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads');
    },
    filename: function (req, file, cb) {
        console.log(file);
        cb(null, file.originalname + '-' + Date.now() + '.pdf')
    }
});

var upload = multer({
    storage: storage
}).single('pdf');


router.post('/', function (req, res) {
    upload(req, res, function (err) {
        if (err) {
            // An error occurred when uploading
        }
        res.json({
            success: true,
            message: 'PDF uploaded!'
        });

        // Everything went fine
    })
});


module.exports = router;