import { ForecastStatusEnum } from '../types/forecasts'
import { MatchStatusEnum } from '../types/matches'

export const getForecastStatus = (statusId) => {
	let status = ''
	if (statusId === ForecastStatusEnum.back) {
		status = 'Возврат'
	} else if (statusId === ForecastStatusEnum.wait) {
		status = 'Ожидание'
	} else if (statusId === ForecastStatusEnum.win) {
		status = 'Победа'
	} else if (statusId === ForecastStatusEnum.loss) {
		status = 'Поражение'
	} 
	return status	
}

export const getMatchStatus = (statusId) => {
	let status = ''
	if (statusId === MatchStatusEnum.completed) {
		status = 'Событие завершено'
	} else if (statusId === MatchStatusEnum.uncompleted) {
		status = 'Событие не завершено'
	} 
	return status	
}
