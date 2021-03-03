import axios from "axios"

import { loginSuccessAction } from '../redux/actions/loginActions';

import Settings from './settings';
import { store } from '../redux/store/store';

export function login(username, password, callback) {
    return dispatch => {
        return axios.post(Settings.WEB_API_URI + 'auth', {
            username: username,
            password: password
        })
        .then(function (response) {
            callback(response.data, null, response);
        })
        .catch(function (error) {
            callback(null, error.message, null);
        });
    }
}

export function createAccount(username, password, firstName, lastName, description, callback) {
    return dispatch => {
        return axios.post(Settings.WEB_API_URI + 'user', {
            nickname: username,
            password: password,
            firstName: firstName,
            lastName: lastName,
            description: description
        })
        .then(function (response) {
            callback(response.data, null, response);
        })
        .catch(function (error) {
            callback(null, error.message, null);
        });
    }
}

export function getUsers(callback) {
    axios.get(Settings.WEB_API_URI + 'user').then(function (response) {
        callback(response.data, null, response);
    }).catch(function (error) {
        callback(null, error, null);
    });
}

export function getCities(country, callback) {
    return dispatch => {
        axios.get(Settings.WEB_API_URI + 'city/all/' + country)
        .then(function (response) {
            callback(response.data, null, response);
        }).catch(function (error) {
            callback(null, error, null);
        });
    }
}

export function getKeywords(callback) {
    return dispatch => {
        axios.get(Settings.WEB_API_URI + 'keyword')
        .then(function (response) {
            callback(response.data, null, response);
        }).catch(function (error) {
            callback(null, error, null);
        });
    }
}