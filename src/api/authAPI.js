import axios from 'axios';

import {host, headers} from './apiConfig';

const axiosInstance = axios.create({
    baseURL: host + 'users' + '/',
    timeout: 4000
});

const request = {
    async login(username, password) {
        const url = 'login';
        return axiosInstance.post(url, {},
            {auth: {username: username, password: password}}
        );
    },

    async register(username, password) {
        const url = 'register';
        const data = JSON.stringify({'username': username, 'password': password});
        return axiosInstance.post(url, data, {headers: headers});
    },

    async logout() {
        const url = 'logout';
        return axiosInstance.get(url);
    }
};

export const login = (username, password) => {
    return request.login(username, password);
}

export const register = (username, password) => {
    return request.register(username, password);
}

export const logout = () => {
    request.logout();
}
