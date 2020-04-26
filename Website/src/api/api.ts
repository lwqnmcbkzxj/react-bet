import Axios from 'axios';

const instance = Axios.create({
	baseURL: "http://betting-hub.sixhands.co/api/",
	headers: {

	}
});

export const setTokenForAPI = (token: string) => {
    instance.defaults.headers.Authorization = "Bearer " + token;
}



export const userAPI = {
	login(email: string, password: string) {

		// let obj = {
		// 	grant_type: "password",
  		// 	client_id: "2",
  		// 	client_secret: "V79SdKGIlqFgbmlRGLNIm5r8wPevKerRePbqwzDT",
  		// 	username: "cerberus3@gmail.com",
  		// 	password: "CerberusInvesting",
 		// 	 scope: "*"
		// }

		return instance.post(`http://betting-hub.sixhands.co/oauth/token`, JSON.stringify(email))
			.then((response) => {
				return response.data
			}
		);
	},

	register(username: string, email: string, password: string) {
		return instance.post(`register`, { username, email, password })
			.then((response) => {
				return response.data
			}
			);
	},
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
	}
}

