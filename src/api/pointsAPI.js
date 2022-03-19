import axios from 'axios';

import store from "../store/store";
import {host, headers} from './apiConfig';

const axiosInstance = axios.create({
    baseURL: host + 'points' + '/',
    timeout: 4000
});

const pointsAPI = {
    async getPoints() {
        const url = 'get';
        const log = store.getState().auth.login;
        const pass = store.getState().auth.password;
        return axiosInstance.get(url, {
            auth: {username: log, password: pass}
        });
    },

    async check(x, y, r) {
        const url = 'check';
        const log = store.getState().auth.login;
        const pass = store.getState().auth.password;
        const data = JSON.stringify({'x': x, 'y': y, 'radius': r});

        return axiosInstance.post(url, data, {
            auth: {username: log, password: pass},
            headers: headers
        });
    },

    async clear() {
        const url = 'clear';
        const log = store.getState().auth.login;
        const pass = store.getState().auth.password;

        return axiosInstance.delete(url, {
            auth: {username: log, password: pass}
        });
    }
}

export default pointsAPI;