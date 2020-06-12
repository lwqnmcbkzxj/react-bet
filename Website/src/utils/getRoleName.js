import { RolesEnum } from '../types/types'

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
