export const getTimeSinceSending = (timestamp: number) => {
	let dateDifference = (+Date.now() / 1000  - timestamp) 

	let minute = 60;
	let hour = minute * 60;
	let day = hour * 24;
	let week = day * 7;
	let month = week * 30;

	let timeSince = ''
	if (dateDifference < 5) {
		timeSince = 'Только что'
	} else if (dateDifference / minute < 1) {
		timeSince = Math.ceil(dateDifference / minute) + 'с'
	} else if (dateDifference / hour < 1) {
		timeSince = Math.ceil(dateDifference / hour) + 'м'
	} else if (dateDifference / day < 1) {
		timeSince = Math.round(dateDifference / day) + 'ч'
	} else if (dateDifference / week < 1) {
		timeSince = Math.ceil(dateDifference / week) + 'д'
	} else if (dateDifference / month < 1) {
		timeSince = Math.ceil(dateDifference / month) + 'мес'
	}

	return timeSince;
}