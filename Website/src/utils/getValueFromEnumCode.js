import { ForecastStatusEnum } from '../types/forecasts'
import { MatchStatusEnum } from '../types/matches'
import { RolesEnum, BannerPositionEnum } from '../types/types'

export const getRoleName = (roleId) => {
	let roleName = ''
	if (roleId === RolesEnum.user) {
		roleName = 'Пользователь'
	} else if (roleId === RolesEnum.robotForecaster) {
		roleName = 'Робот-прогнозист'
	} else if (roleId === RolesEnum.moderator) {
		roleName = 'Модератор'
	} else if (roleId === RolesEnum.admin) {
		roleName = 'Администратор'
	} else if (roleId === RolesEnum.techAdmin) {
		roleName = 'Технический администратор'
	} 
	return roleName	
}


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

export const getBannerPosition = (positionId) => {
	let position = 'Позиция'
	if (positionId === BannerPositionEnum.header) {
		position = 'Хедер сайта(маленький)'
	} else if (positionId === BannerPositionEnum.header_big) {
		position = 'Хедер сайта(большой)'
	} else if (positionId === BannerPositionEnum.menu) {
		position = 'Меню'
	} else if (positionId === BannerPositionEnum.comments) {
		position = 'Лайв-комменты'
	} else if (positionId === BannerPositionEnum.main_content_horizontal) {
		position = 'Горизонтальный блок на главной странице'
	} else if (positionId === BannerPositionEnum.mobile_bottom) {
		position = 'Мобильный - панель внизу экрана'
	} else if (positionId === BannerPositionEnum.mobile_full_width) {
		position = 'Мобильный - на весь экран'
	} else if (positionId === BannerPositionEnum.big_left) {
		position = 'Главная - большой баннер - слева'
	} else if (positionId === BannerPositionEnum.big_right) {
		position = 'Главная - большой баннер - справа'
	} 
	return position	
}