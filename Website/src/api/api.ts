import Axios from 'axios';
import qs from 'query-string'

const instance = Axios.create({
	baseURL: "http://betting-hub.sixhands.co/api/",
	headers: {
		
	}
});

export const setTokenForAPI = (token: string) => {
    instance.defaults.headers.Authorization = "Bearer " + token;
}



export const userAPI = {
	login(usernameOrEmail: string, password: string) {
		// "username": "test3@yandex.ru",
		// "password": "123456789",
		let obj = {
			"grant_type": "password",
			"client_id": "2",
			"client_secret": "V79SdKGIlqFgbmlRGLNIm5r8wPevKerRePbqwzDT",
			"username": usernameOrEmail,
			"password": password,
			"scope": "*"
		  }

		return instance.post(`https://cors-anywhere.herokuapp.com/http://betting-hub.sixhands.co/oauth/token`, qs.stringify(obj))
			.then((response) => {
				return response.data
			})
			.catch((err) => { console.log(err) })
		
	},

	register(username: string, email: string, password: string) {
		return instance.post(`register`, { username, email, password })
			.then((response) => {
				return response.data
			}
		);
	},
	changeEmail(email: string) {
		console.log('Changing email: ' + email)
		// return instance.post(`change-email`, { email })
		// 	.then((response) => {
		// 		return response.data
		// 	}
		// );
	},
	resetPassword(email: string) {		
		// return instance.post(`reset-pass`, { email })
		// 	.then((response) => {
		// 		return response.data
		// 	}
		// );
	},
	changePassword(password: string) {
		console.log('Changing password: ' + password)
		// return instance.post(`change-pass`, { password })
		// 	.then((response) => {
		// 		return response.data
		// 	}
		// );
	},

	getUserInfo(){
		return instance.get(`user`, )
			.then((response) => {
				return response.data
			}
		);
	}
}



export const forecastsAPI = {
	getForecasts(page: number, quanity: number, options: any) {
		return instance.post(`forecastList`, {
			page,
			quanity,
			tf: options.tf || 'all',
			sport: options.sport || 'all',
			useSubscribes: options.useSubscribes || false,
			useFavorites: options.useFavorites || false
		})
			.then((response) => {
				return response.data
			}
		);
	},
	getForecast(id: number) {
		return instance.get(`forecast/${id}`)
			.then((response) => {
				return response.data
			}
		);
	},
	rateForecast(forecastId: number, type: number) {
		return instance.post(`forecastLike`, {forecastId, type})
			.then((response) => {
				return response.data
			}
		);
	},
	commentForecast(forecastId: number, text: string, replying: boolean) {
		return instance.post(`forecastComment`, {forecastId, text, replying})
			.then((response) => {
				return response.data
			}
		);
	},
	favouriteForecast(forecastId: number) {
		return instance.post(`forecastFav`, {forecastId})
			.then((response) => {
				return response.data
			}
		);
	}
}

