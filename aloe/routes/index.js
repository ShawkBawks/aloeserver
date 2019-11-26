var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();
/* GET home page. *
 */
const key = process.env.ACCESS_KEY;
console.log(key)

router.get('/', function(req, res, next) {
		axios.get(`http://api.ipstack.com/check?access_key=${key}&fields=latitude,longitude`).then(function (response) {
		console.log(response.data)
  res.render('index', { title: 'Express' })
	})
});

module.exports = router;
