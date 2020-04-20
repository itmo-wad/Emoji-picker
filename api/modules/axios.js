'use strict';
const axios = require("axios");

exports.request = function (url, data = "", method = 'GET', cookie = "") {
    if (cookie !== "") {
        return axios({
            method: method,
            url: url,
            data: data,
            headers: {"Cookie": cookie}
        })
            .then(data => {
                return data
            })
            .catch(err => {
                return err.response
            })
    } else if (data !== "") {
        return axios({
            method: method,
            url: url,
            data: data
        })
            .then(data => {
                return data
            })
            .catch(err => {
                return err.response
            })
    } else {
        return axios({
            method: method,
            url: url
        })
            .then(data => {
                return data
            })
            .catch(err => {
                return err.response
            })
    }
};
