var express = require('express');
var router = express.Router();
var DBClient = require('../Utils/redis-client');


/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('pingpong');
});


router.post('/find', (req, res) => {
    if (typeof req.body.username === 'undefined') {
        res.send('Usernmae is missing');
    } else {
        DBClient.Get(req.body.name, function(error, data) {
            if (error != null) {
                res.send('something went wrong Error is ' + error);
            }
            res.send(data);
        });
    }
});


router.post('/addUser', (req, res) => {
    if (typeof req.body.key === 'undefined' || typeof req.body.value === 'undefined') {
        res.send('Key and value can not be blank');
    }
    DBClient.Add(req.body.key, req.body.value, (err, data) => {
        if (err) {
            res.send('something is wrong');
        } else {
            res.send('ok');
        }
    });
})

router.post('/addNewUser', (req, res) => {
    console.log(req.body.Username);
    DBClient.GetHAll(req.body.Username, (err, userData) => {


            if (userData === null) {


                DBClient.AddH(req.body.Username, req.body, (err, data) => {
                    console.log('6');

                    if (err) {
                        res.send('something is wrong');
                    } else {
                        // res.send('User created');
                        res.render('../views/index.ejs', { Userdata: "", data: "User is created" })
                    }
                });
            } else {
                //res.send('user already present');
                res.render('../views/index.ejs', { Userdata: "", data: "User Already Present" })

            }
        })
        //}
})

router.post('/searchUser', (req, res) => {
    if (typeof req.body.Username === 'undefined') {
        res.send('Key and value can not be blank');
    } else {
        DBClient.GetHAll(req.body.Username, (err, data) => {
            if (err) {
                res.send('something is wrong');
            } else {
                if (data === null) {
                    data = "User not present";
                }
                //res.send(data);
                res.render('../views/index.ejs', { Userdata: data, data: "" })

            }
        })
    }
})

router.post('/deleteUser', (req, res) => {
    if (typeof req.body.username === 'undefined') {
        res.send('Key and value can not be blank');
    } else {
        DBClient.DelUser(req.body.username, (err, data) => {
            if (err) {
                res.send(err);
            } else {
                //res.send('ok');
                res.render('../views/index.ejs', { Userdata: "", data: "User Deleted successfully" })

            }

        });
    }
})

module.exports = router;