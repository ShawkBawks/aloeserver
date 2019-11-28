var express = require('express');
var router = express.Router();
const axios = require('axios');
require('dotenv').config();
const key = process.env.ACCESS_KEY;

const url = `http://api.istack.com/check?access_key=${key}&fields=latitude,longitude`;
console.log('url', url);
axios.get('https://google.com')
.then(res => {
	console.log('res', res);
}).catch(e => console.log(e));
axios.get(url)
	.then(function (response){
		console.log('first then:')
		axios({
			method: 'post',
			url: 'http://localhost:3001/api/new-user-sensor',
			data: {
				longitude: response.data.longitude,
				latitude: response.data.latitude
			}
		}).then(console.log('last then'))
	}).catch(e => {
		console.log('error!', e);
	})
//refactor cb:
