import Axios from 'axios';
import qs from 'query-string'

export const apiURL = "https://app.betthub.org/"

const instance = Axios.create({
	baseURL: 'https://app.betthub.org/api/',
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

		return instance.post(`https://app.betthub.org/oauth/token`, qs.stringify(obj))
			.then((response) => {
				return response.data
			})
			.catch((err) => { return err })
	},
	register(username: string, email: string, password: string) {
		return instance.post(`register`, { username, email, password })
			.then((response) => {
				return response.data
			})
			.catch((err) => { return err })
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
			}).catch(err => err);
	},
	changePhoto(avatar: File) {
		let formData = new FormData()
		formData.append('avatar', avatar)
		return instance.post(`/avatar`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
			.then((response) => {
				return response.data
			}).catch(err => err);
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
	
	getUserForecasts(page: number, limit: number, userId: number) {
		return instance.get(`/users/${userId}/forecasts`)
			.then((response) => {
				return response.data
			});
	},

	getFavouriteForecasts(page: number, limit: number) {
		return instance.get(`/forecasts/marked`)
			.then((response) => {
				return response.data
			});
	},
	getForecastsBySubscribtions(page: number, limit: number, options: any) {
		return instance.get(`/users/${options.loggedUserId}/subscription/forecasts`, {
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
		return instance.post(`forecasts/${id}/mark`)
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

export const newsAPI = {
	getNews() {
		return instance.get(`news`)
			.then((response) => {
				return response.data
			});
	},
}

export const postsAPI = {
	getPosts() {
		return instance.get(`posts`)
			.then((response) => {
				return response.data
			});
	},
	getPost(id: number) {
		return instance.get(`posts/${id}`)
			.then((response) => {
				return response.data
			});
	},
	likePost(id: number) {
		return instance.post(`posts/${id}/like`)
			.then((response) => {
				return response.data
			});
	},
	dislikePost(id: number) {
		return instance.post(`posts/${id}/dislike`)
			.then((response) => {
				return response.data
			});
	},	
	// ADMIN
	getAdminPosts(page: number, limit: number, search: string, search_by: string) {
		let searchString =''
		if (search && search_by) {
			searchString = `&search=${search}&search_by=${search_by}`
		}
		
		return instance.get(`admin/posts?page=${page}&limit=${limit}` + searchString)
			.then((response) => {
				return response.data
			});
	},
	getAdminPost(id: number) {
		return instance.get(`admin/posts/${id}`)
			.then((response) => {
				return response.data
			});
	},
	addPost(postObject: any) {

		// let formData = new FormData()
		// formData.append('image', postObject.image)
		return instance.post(`admin/posts`, { ...postObject })
			.then((response) => {
				return response.data
			});
	},
	editPost(id: number, postObject: any) {
		return instance.post(`admin/posts/${id}`, { ...postObject })
			.then((response) => {
				return response.data
			});
	},
	deletePost(id: number) {
		return instance.delete(`admin/posts/${id}`)
			.then((response) => {
				return response.data
			});
	},
	// ADMIN
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
	sendEmail(email: string, text: string) {
		return instance.post(`feedback`, {email, text})
			.then((response) => {
				return response.data
			});
	},	
	
	
	getPolicy() {
		return instance.get(`policy`)
		.then((response) => {
			return response.data
		});
	},
	changePolicy(text: string) {
		return instance.post(`policy`, { text })
			.then((response) => {
				return response.data
			});
	},
	getTerms() {
		return instance.get(`terms`)
		.then((response) => {
			return response.data
		});
	},
	changeTerms(text: string) {
		return instance.post(`terms`, { text })

	comments: {
		getComments(id: number, type: string, filterName: string) {
			return instance.get(`/${type}/${id}/comments?order_by=${filterName}`)
				.then((response) => {
					return response.data
				}).catch(err => err);
		},
		sendComment(id: number, type: string, text: string, reply_id?: number) {
			return instance.post(`${type}/${id}/comment`, { text, replies_to: reply_id } )
				.then((response) => {
					return response.data
				}).catch(err => err);
		},
		likeComment(id: number) {
			return instance.post(`comments/${id}/like` )
				.then((response) => {
					return response.data
				}).catch(err => err);
		},
		dislikeComment(id: number) {
			return instance.post(`comments/${id}/dislike` )
				.then((response) => {
					return response.data
				}).catch(err => err);
		}
	}
	
}
			.then((response) => {
				return response.data
			});
	}
}