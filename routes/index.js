var express = require('express');
var router = express.Router();
var DBClient = require('../Utils/redis-client');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.use('/add', (req, res) => {

    DBClient.GetHAll('ADDFORM', (err, data) => {
        if (err) {
            res.send('Something went wrong');
        } else {
            console.log(data);
            res.render('addUser', { formdata: data });
        }
    });
});
router.use('/search', (req, res) => {
    res.render('searchUser')
});
router.use('/delete', (req, res) => {
    res.render('deleteUser')
});





module.exports = router;