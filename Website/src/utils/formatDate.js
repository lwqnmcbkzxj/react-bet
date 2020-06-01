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