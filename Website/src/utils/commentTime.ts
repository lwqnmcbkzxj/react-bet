export const getTimeSinceSending = (timestamp: number) => {
	let dateDifference = (+Date.now()  - timestamp) / 1000

	let minute = 60;
	let hour = minute * 60;
	let day = hour * 24;
	let week = day * 7;
	let month = week * 30;



	
	let timeSince = ''
	if (dateDifference < 5) {
		timeSince = 'Только что'
	} else if (dateDifference / minute < 1) {
		timeSince = Math.floor(dateDifference) + 'с'
	} else if (dateDifference / hour < 1) {
		timeSince = Math.floor(dateDifference / minute) + 'м'
	} else if (dateDifference / day < 1) {
		timeSince = Math.floor(dateDifference / hour) + 'ч'
	} else if (dateDifference / month < 1) {
		timeSince = Math.floor(dateDifference / day) + 'д'
	} else if (dateDifference / month < 1) {
		timeSince = Math.floor(dateDifference / month) + 'мес'
	} 

	return timeSince;
}