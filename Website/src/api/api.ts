import Axios from 'axios';

const instance = Axios.create({
	baseURL: "http://betting-hub.sixhands.co/api/",
	headers: {

	}
});

// export const setToken = (token) => {
//     instance.defaults.headers.Authorization = "Bearer " + token;
// }



export const userAPI = {
	login(email: string, password: string) {
		return instance.post(`login`, { "email": email, "password": password })
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
	getAllForecasts(page: number, quanity: number) {
		return instance.post(`forecast/getAll`, { page, quanity })
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

