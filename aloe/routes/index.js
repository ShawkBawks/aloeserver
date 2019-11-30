var express = require("express");
var router = express.Router();
const axios = require("axios");
require("dotenv").config();
/* GET home page. *
 */
const key = process.env.ACCESS_KEY;
console.log(key);
function getLocation() {
  axios
    .get(
      `http://api.ipstack.com/check?access_key=${key}&fields=latitude,longitude`
    )
    .then(response => {
      let data = {
        latitude: response.data.latitude,
        longitude: response.data.longitude
      };
      return data;
		});
	}

module.exports = {router, getLocation };
