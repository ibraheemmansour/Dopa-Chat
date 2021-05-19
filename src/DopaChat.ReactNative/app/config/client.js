import axios from "axios"

import { loginSuccessAction } from '../redux/actions/loginActions';
import { createUserSuccessAction, updateUserSuccessAction } from '../redux/actions/userActions';

import Settings from './settings';

export function login(username, password, callback) {
    return dispatch => {
        return axios.post(Settings.WEB_API_URI + 'auth', {
            username: username,
            password: password
        })
        .then(function (response) {
            dispatch(loginSuccessAction(response.data));
            callback(response.data, null, response);
        })
        .catch(function (error) {
            callback(null, error.message, null);
        });
    }
}

export function createAccount(user, callback) {
    return dispatch => {
        return axios.post(Settings.WEB_API_URI + 'user', {
            nickname: user.username,
            password: user.password,
            firstName: user.firstName,
            lastName: user.lastName,
            description: user.description,
            languages: user.languages,
            keywords: user.keywords,
            cityId: user.cityId
        })
        .then(function (response) {
            dispatch(createUserSuccessAction(response.data));
            callback(response.data, null, response);
        })
        .catch(function (error) {
            callback(null, error.message, null);
        });
    }
}

export function updateAccount(user, callback) {
    return dispatch => {
        axios.put(Settings.WEB_API_URI + 'user/' + user.nickname, user)
        .then(function (response) {
            console.log(response);
            dispatch(updateUserSuccessAction(response.data));
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

export function getUser(id, callback) {
    return dispatch => {
        axios.get(Settings.WEB_API_URI + 'user/' + id).then(function (response) {
            callback(response.data, null, response);
        }).catch(function (error) {
            callback(null, error, null);
        });
    }
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
            console.log(error);
            callback(null, error, null);
        });
    }
}

export function searchPeople(query, callback) {
    return dispatch => {
        return axios.post(Settings.WEB_API_URI + 'user/search', {
            id: query.id,
            country: query.country,
            showLocation: query.showLocation,
            keywords: query.keywords,
            city: query.city
        })
        .then(function (response) {
            callback(response.data, null, response);
        })
        .catch(function (error) {
            callback(null, error.message, null);
        });
    }
}

export function getAssistants(id, callback) {
    return dispatch => {
        axios.get(Settings.WEB_API_URI + 'assistants/country/' + id)
        .then(function (response) {
            callback(response.data, null, response);
        }).catch(function (error) {
            callback(null, error, null);
        });
    }
}
