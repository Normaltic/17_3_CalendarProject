import axios from 'axios';

const rootURL = 'http://mango-tree.xyz:6001/api/';
const schedule = 'secret/schedule';
const vote = 'secret/vote';
const group = 'secret/group';

//axios.defaults.headers.common['Content-Type'] = "application/json"
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
        axios.defaults.headers['calendar-token'] = token
    } else delete axios.defaults.headers['calendar-token']
}

export function SearchAccount(userID) {
    return axios.get(`${rootURL}account/find/${userID}`)
}



//////--------------------------------------------------------------------

export function createSchedule(scheduleData) {
    return axios.post(`${rootURL + schedule}/create`, scheduleData);
}

export function deleteSchedule(sche) {
    return axios.post(`${rootURL + schedule}/delete`, sche)
}

export function updateSchedule(scheduleData) {
    return axios.post(`${rootURL + schedule}/update`, scheduleData);
}

export function getOptionSchedule(include_shared) {
    return axios.get(rootURL + '/getOptionSchedules/' + include_shared);
}

export function getMonthSchedule(include_shared, year, month, groupList) {
    return axios.post(`${rootURL + schedule}/getMonthSchedules`, {
        include_shared: include_shared,
        year: year,
        month: month,
        groupList: groupList
    });
}

export function sendToServerAndroidRead( string ) {
	return axios.post(`${rootURL + schedule}/sendToServerAndroidRead`, {
		str: string
	});
}

//////---------------------------------------------------------------------
export function createVote(voteData) {
    return axios.post(`${rootURL + vote}/create`, voteData);
}

export function updateVote(voteData) {
    return axios.post(`${rootURL + vote}/update`, voteData);
}

export function deleteVote(voteID) {
    return axios.post(`${rootURL + vote}/delete/`, {
        voteID: voteID
    });
}

export function getVoteList() {
    return axios.get(`${rootURL + vote}/getVoteList`);
}

export function getVoteData(voteID) {
    return axios.get(`${rootURL + vote}/${voteID}`);
}

export function doVote(voteID, is_yes) {
    return axios.post(`${rootURL + vote}/vote`, {
        _id: voteID,
        is_yes: is_yes
    })
}

export function updateComment(voteID, comment) {
    return axios.post(`${rootURL + vote}/updateComment`, {
        _id: voteID,
        comment: comment
    })
}

export function ChangeSchedule(voteData) {
    return axios.post(`${rootURL + vote}/ChangeSchedule`, voteData);
}

//////---------------------------------------------------------------------

export function createGroup(groupData) {
    return axios.post(`${rootURL + group}/create`, groupData);
}

export function updateGroupList() {
	return axios.get(`${rootURL + group}/getGroupList`);
}

export function getGroupMonthSchedule(groupName, year, month) {
    return axios.post(`${rootURL + group}/getMonthSchedules`, {
        groupName: groupName,
        year: year,
        month: month
    })
}

export function getGroupData(groupName) {
	return axios.get(`${rootURL + group}/getGroupData/${groupName}`);
}

export function updateGroupData(grp) {
	return axios.post(`${rootURL + group}/updateGroupData`, {
		name: grp.name,
		description: grp.description,
		members: grp.members
	})
}

export function deleteGroup(groupName) {
	return axios.post(`${rootURL + group}/delete`, {
		name: groupName
	});
}
