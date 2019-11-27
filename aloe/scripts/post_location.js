var express = require('require');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();
const key = process.env.ACCESS_KEY;
axios.get(`http://api.istack.com/check?access_key=${key}&fields=latitude,longitude`)
	.then function (response){
		axios({
			method: 'post',
			url: 'api/user-sensors',
			data: {
				latitude: response.data.latitude,
				longitude: response.data.longitude
			}
		})
	};
