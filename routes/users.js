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

    console.log('1');
    console.log(req.body);
    // var kvPair = JSON.parse(req.body);

    // if (typeof req.body.username === 'undefined' || typeof kvPair === 'undefined') {
    //     console.log('2')
    //     res.send('Key and value can not be blank');
    // } else {
    console.log('3');

    DBClient.GetHAll(req.body.username, (err, userData) => {
            console.log('4');

            if (userData === null) {
                console.log('5');

                DBClient.AddH(req.body.username, req.body, (err, data) => {
                    console.log('6');

                    if (err) {
                        res.send('something is wrong');
                    } else {
                        res.send('User created');
                    }
                });
            } else {
                res.send('user already present');
            }
        })
        //}
})

router.post('/searchUser', (req, res) => {
    if (typeof req.body.username === 'undefined') {
        res.send('Key and value can not be blank');
    } else {
        DBClient.GetHAll(req.body.username, (err, data) => {
            if (err) {
                res.send('something is wrong');
            } else {
                if (data === null) {
                    data = "User not present";
                }
                res.send(data);
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
                res.send('ok')
            }

        });
    }
})

module.exports = router;