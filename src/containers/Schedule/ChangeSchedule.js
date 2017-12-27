import moment from 'moment';

const change = (timeObject) => {
	let result = moment().add(9, 'hours');
	let nowDate = moment().add(9, 'hours');
	
	let addYear = 0,
		addMonth = 0,
		addDate = 0;

	let timeString = undefined;

	for( let item of timeObject ) {
		if( item.type == 'ARGM-TMP' ) {
			timeString = item.text;
			break;
		}
	}

	if( !timeString ) return null;

	const sliceToSpace = (str) => {
		return str.split(' ');
	}

	const sliceToSlash = (str) => {
		return str.split('/');
	}

	for( let i = 0; i < timeString.length; i++ ) {
		if( timeString[i] == ' ' ) {
			timeString = sliceToSpace(timeString);
			break;
		} else if ( timeString[i] == '/' ) {
			timeString = sliceToSlash(timeString);
			break;
		}
	}

	const checkDayofWeek = (str) => {
		if( str == '일' || str == '일욜' || str == '일요일' ) return 0;
		if( str == '월' || str == '월욜' || str == '월요일' ) return 1;
		if( str == '화' || str == '화욜' || str == '화요일' ) return 2;
		if( str == '수' || str == '수욜' || str == '수요일' ) return 3;
		if( str == '목' || str == '목욜' || str == '목요일' ) return 4;
		if( str == '금' || str == '금욜' || str == '금요일' ) return 5;
		if( str == '토' || str == '토욜' || str == '토요일' ) return 6;
		return 7;
	}

	if( isNaN(timeString[0][0]) ) {
		let dayofWeek;
		let dateStr;
		let monthDate;
		switch( timeString[0] ) {
			case '이번달':
				dateStr = timeString[1].slice(0,2);
				if( dateStr[1] == '일' ) dateStr = dateStr.slice(0, -1);
				monthDate = parseInt(dateStr);
				result.date(monthDate);
				break;

			case '다음달':
				dateStr = timeString[1].slice(0,2);
				if( dateStr[1] == '일' ) dateStr = dateStr.slice(0, -1);
				monthDate = parseInt(dateStr);
				result.date(monthDate);
				addMonth++;
				break;

			case '오늘':
				break;

			case '내일':
				addDate++;
				break;

			case '모레':
				addDate += 2;
				break;

			case '이번주':
				dayofWeek = checkDayofWeek(timeString[1]);
				if( dayofWeek == 0 ) dayofWeek += 7;

				if( nowDate.day() >= dayofWeek ) return null;

				while( result.day() != 0 ) result.add(-1, 'days');

				addDate += dayofWeek;

				break;

			case '다음주':
				dayofWeek = checkDayofWeek(timeString[1]);

				while( result.day() != 0 ) result.add(1, 'days');
				
				if( dayofWeek == 0 ) addDate += 7;
				else addDate += dayofWeek;

				break;

			case '다다음주':
				dayofWeek = checkDayofWeek(timeString[1]);
				let flag = true;
				while( result.day() != 0 ) {
					result.add(1, 'days');
					if( flag ) {
						result.add(1, 'days');
						flag = false;
					}
				}
				if( dayofWeek == 0 ) addDate += 7;
				else addDate += dayofWeek;

				break;
		}

		result.add(addYear, 'years').add(addMonth, 'months').add(addDate, 'days');

	}

	else if( parseInt(timeString[0][0]) ) {
		if( timeString[0][timeString[0].length-1] == '월' ) {
			let month = timeString[0].slice(0,2);
			if( month[1] == '월' ) month = month.slice(0, -1);
			let m = parseInt(month);
			if( nowDate.month() == 11 ) result.add(1, 'months');
			if( result.month() > --m ) return null;

			let date = timeString[1].slice(0,2);
			if( date[1] == '일' ) date = date.slice(0, -1);
			let d = parseInt(timeString[1]);
			if( nowDate.month() == m && nowDate.date() >= d ) return null;

			result.month(m).date(d);

		}

		else if( timeString[0][timeString[0].length-1] == '일' ) {
			let date = timeString[0].slice(0,2);
			if( date[1] == '일' ) date = date.slice(0, -1);
			let d = parseInt(timeString[1]);
			if( nowDate.date() > d ) {
				if( nowDate.date() > 25 ) result.add(1, 'months');
				else return null;
			}
			result.date(d);

		}
	}

	if( timeString[2] ) {
		let time = timeString[2];
		let hour = 0,
			min = 0;
		result.minute(0).second(0).millisecond(0);
		
		if( isNaN(time[0]) ) {
			if( time == '오전' ) hour = 0;
			else if( time == '오후' ) hour += 12;

			let hourString = timeString[3].slice(0,2);
			if( hourString[1] == '시' ) hourString = hourString.slice(0, -1);

			hour += parseInt(hourString);

			if( timeString[4] ) {
				let minString = timeString[4].slice(0,2);
				if( minString[1] == '분' ) minString = minString.slice(0, -1);

				min += parseInt(minString);
			}
				
		}
		
		else if( parseInt(time[0]) ) {
			let hourString = time.slice(0,2);
			if( hourString[1] == '시' ) hourString = hourString.slice(0, -1);
			hour += parseInt(hourString);
			
			if( timeString[3] ) {
				let minString = timeString[3].slice(0,2);
				if( minString[1] == '분' ) minString = minString.slice(0, -1);

				min += parseInt(minString);
			}
		}

		result.add(hour, 'hours').add(min, 'minutes');
	}

	return result;
}

export default change;
