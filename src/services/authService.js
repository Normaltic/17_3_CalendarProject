import axios from 'axios';

const rootURL = 'http://52.187.29.173:3002/api/';
axios.defaults.headers.common['Content-Type'] = "application/json"
/*axios.defaults.headers['Access-Control-Allow-Methods'] = "GET, POST, OPTIONS";
axios.defaults.headers['Access-Control-Max-Age'] = "3600";
axios.defaults.headers['Access-Control-Allow-Origin'] = "*";*/

export function SignIn(userID, password) {
    return axios.post(rootURL + 'account/signin', {
        ID: userID,
        password: password
    })
}

export function SignUp(userID, password, name, intro) {
    return axios.post(rootURL + 'account/signup', {
        ID: userID,
        password: password,
        name: name,
        intro: intro != '' ? intro : undefined
    })
}

export function setHeaderToken(token) {
    if( token !== undefined ) {
        axios.defaults.headers['x-access-token'] = token
    } else delete axios.defaults.headers['x-access-token']
}

//////--------------------------------------------------------------------
export function createSchedule(scheduleData) {
    return axios.post(rootURL + '/create', {
        scheduleData
    })
}

export function update(scheduleData) {
    return axios.post(rootURL + '/update', {
        scheduleData
    })
}

export function getOptionSchedule(include_shared) {
    return axios.get(rootURL + '/getOptionSchedules/' + include_shared)
}

export function getMonthSchedule(include_shared, year, month) {
    return axios.get(`${rootURL}secret/schedule/getMonthSchedules/${include_shared}/${year}/${month}`);
}