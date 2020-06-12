import userNoImg from '../assets/img/user-no-image.png'
import { apiURL } from '../api/api'


export const getUserImg = (avatar) => {
	let avatarImg = ''

	if (avatar) {
		if (avatar.includes('http'))
			avatarImg = avatar
		else 
			avatarImg = apiURL + avatar
	} else {
		avatarImg = userNoImg
	}

	return avatarImg
}