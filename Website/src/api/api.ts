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
		return instance.post(`/users/update/password`, { password })
			.then((response) => {
				return response.data
			}
		);
	},

	getUserInfo() {
		return instance.get(`users/profile`)
			.then((response) => {
				return response.data
			});
	}
}



export const forecastsAPI = {
	getForecasts(page: number, limit: number, options: any) {
		return instance.get(`/forecasts`, {
			params: {
				sport_id: options.sport,
				time: options.time
			}
		})
			.then((response) => {
				return response.data
			});
	},


	getForecast(id: number) {
		return instance.get(`/forecasts/${id}`)
			.then((response) => {
				return response.data
			});
	},
	likeForecast(id: number) {
		return instance.post(`forecasts/${id}/like`)
			.then((response) => {
				return response.data
			});
	},
	dislikeForecast(id: number) {
		return instance.post(`forecasts/${id}/dislike`)
			.then((response) => {
				return response.data
			});
	},

	commentForecast(id: number, text: string) {
		return instance.post(`forecasts/${id}/comment`, { text })
			.then((response) => {
				return response.data
			});
	},
	favouriteForecast(id: number) {
		return instance.post(`forecasts/${id}/follow`)
			.then((response) => {
				return response.data
			});
	}
}

export const matchesAPI = {
	getMatches() {
		return instance.get(`/events`)
			.then((response) => {
				return response.data
			});
	},
	getMatch(id: number) {
		return instance.get(`/events/${id}`)
			.then((response) => {
				return response.data
			});
	}
}
export const bookmakersAPI = {
	getBookmakers() {
		return instance.get(`/bookmakers`)
			.then((response) => {
				return response.data
			});
	},
	getBookmaker(id: number) {
		return instance.get(`/bookmakers/${id}`)
			.then((response) => {
				return response.data
			});
	}
}

export const usersAPI = {
	getUsers(page: number, limit: number, options: any) {
		return instance.get(`users`, {
			params: {
				sport_id: options.sport,
				time: options.time
			}
		}).then((response) => {
			return response.data
		});
	},
	getUser(id: number) {
		return instance.get(`users/${id}`)
			.then((response) => {
				return response.data
			});
	},
	subscribeUser(id: number) {
		return instance.post(`users/${id}/subscription`)
			.then((response) => {
				return response.data
			});
	}
}

export const appAPI = {
	getSports() {
		return instance.get(`sports`)
			.then((response) => {
				return response.data
			});
	},
}