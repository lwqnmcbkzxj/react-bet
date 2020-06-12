import { ForecastStatusEnum } from '../types/forecasts'

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

