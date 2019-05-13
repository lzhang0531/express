const express = require('express');
const router = express.Router();
const request = require('request ');
const fs = require('fs');

const config = require('config-lite')(__dirname);
const server = config.server;


router.get('/', function (req, res, next) {
    var url = server + req.url;
    request(url, function (error, response, body) {
        /*if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.send(data);
        } else {
            res.send('{error:404}');
        }*/
        console.log(response)
        console.log(body)
        res.send(JSON.parse(body));
    });
    // res.render('index', { title: '首页' });
});
router.post('/', function (req, res, next) {
    var url = server + req.url;
    request(url, function (error, response, body) {
        /*if (!error && response.statusCode === 200) {
            var data = JSON.parse(body);
            res.send(data);
        } else {
            res.send('{error:404}');
        }*/
        console.log(response)
        console.log(body)
        res.send(JSON.parse(body));
    });
    // res.render('index', { title: '首页' });
});


router.get('/tuijian', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('login', {});
    }
    res.render('tuijian', {});
});

router.get('/edit', function (req, res, next) {
    if (!req.cookies.user) {
        return res.render('login', {});
    }
    var type = req.query.type;
    if (type) {
        var obj = {};
        switch (type) {
            case 'sanwen':
                obj = {};
                break;
            case 'it':
                obj = {};
                break;
            case 'manager':
                obj = {};
                break;
            case 'cookies':
                obj = {};
                break;
            default :
                return res.send({
                    status: 0,
                    info: '参数错误'
                });
                break;
        }
        fs.readFile(PATH + type + '.json', (err, data) => {
            if (err) {
                return res.send({
                    status: 0,
                    info: 'fail.....'
                });
            }
            var obj = JSON.parse(data.toString());
            return res.render('edit', {
                data: obj
            });
        });
    } else {
        return res.send({
            status: 0,
            info: '参数错误'
        });
    }
});

module.exports = router;
