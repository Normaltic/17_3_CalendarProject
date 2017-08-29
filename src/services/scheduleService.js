import axios from 'axios';

const rootURL = 'http://mango-tree.xyz:3002/api/secret/schedule';
axios.defaults.headers['Content-Type'] = "application/json"

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

export function getMonthSchedule(include_shared = true, year, month) {
    return axios.get(rootURL + '/getMonthSchedules/' + include_shared + '/' + year + '/' + month);
}