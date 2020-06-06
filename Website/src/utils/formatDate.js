import moment from 'moment'

export const formatDate = (createdAt) => {
	let createdDate = Date.parse(createdAt)
	let momentFormat = moment.unix(createdDate / 1000)
	let now = Date.now()

	let startDate = ''
	if ((now - createdDate) / 1000 / 86400 < 1) {
		startDate = 'Сегодня, ' + momentFormat.format("HH:mm")
	} else if ((now - createdDate) / 1000 / 86400 < 2) {
		startDate = 'Вчера, ' + momentFormat.format("HH:mm")
	} else {
		startDate = momentFormat.format("DD.MM.YYYY в HH:mm")
	}

	return startDate
}

export const formatStartDate = (dateNoFormat) => {
	let date = Date.parse(dateNoFormat)
	let momentFormat = moment.unix(date / 1000)
	let now = Date.now()

	let startDate = momentFormat.format("DD.MM.YYYY в HH:mm")
	if ((date - now) / 1000 / 86400 < 1) {
		startDate = 'Сегодня, ' + momentFormat.format("HH:mm")
	} else if ((date - now) / 1000 / 86400 < 2) {
		startDate = 'Завтра, ' + momentFormat.format("HH:mm")
	} else {
		startDate = momentFormat.format("DD.MM.YYYY в HH:mm")
	}

	return startDate
}

export const formatDateSimply = (date) => {
	let dateParsed = Date.parse(date)
	return moment.unix(dateParsed / 1000).format("DD.MM.YYYY в HH:MM")
}