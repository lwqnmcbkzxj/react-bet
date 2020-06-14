import Axios from 'axios';
import qs from 'query-string'
import { UserType, BookmakerType, ForecastType, ChampionshipType, EventType } from '../types/admin';
import { OptionsType, BannerType } from '../types/types';
import { languageEnum } from '../types/filters';


let apiURIObject = {
	rus: "https://app.betthub.org",
	eng: "https://api.betthub.org"
}

export let apiURL = ""

const instance = Axios.create({
	baseURL: ``,
	headers: {

	}
});

export const setTokenForAPI = (token: string) => {
	instance.defaults.headers.Authorization = "Bearer " + token;
}
export const setApiLanguage = (lang: languageEnum) => {
	apiURL = apiURIObject[lang]
	instance.defaults.baseURL = `${apiURIObject[lang]}/api`

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
			})
			.catch((err) => err);
	}
}

export const forecastsAPI = {
	getForecasts(page: number, limit: number, options: any) {
		let searchText = ''
		if (options.search)
			searchText = `&search=${options.search}`
		return instance.get(`/forecasts?page=${page}&limit=${limit}${searchText}`, {
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
		return instance.get(`/users/${userId}/forecasts?page=${page}&limit=${limit}`)
			.then((response) => {
				return response.data
			});
	},

	getFavouriteForecasts(page: number, limit: number) {
		return instance.get(`/forecasts/marked?page=${page}&limit=${limit}`)
			.then((response) => {
				return response.data
			});
	},
	getForecastsBySubscribtions(page: number, limit: number, options: any) {
		return instance.get(`/users/${options.loggedUserId}/subscription/forecasts?page=${page}&limit=${limit}`, {
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
	getMatches(page: number, limit: number) {
		return instance.get(`events?page=${page}&limit=${limit}`)
			.then((response) => {
				return response.data
			});
	},
	getMatch(id: number) {
		return instance.get(`events/${id}`)
			.then((response) => {
				return response.data
			});
	}
}
export const bookmakersAPI = {
	getBookmakers(page: number, limit: number) {
		return instance.get(`/bookmakers?page=${page}&limit=${limit}`)
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
	getNews(page: number, limit: number) {
		return instance.get(`news?page=${page}&limit=${limit}`)
			.then((response) => {
				return response.data
			});
	},
}

export const postsAPI = {
	getPosts(page: number, limit: number) {
		return instance.get(`posts?page=${page}&limit=${limit}`)
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
}

export const usersAPI = {
	getUsers(page: number, limit: number, options: any) {
		let month = 0

		if (+options.time) {
			month = Math.ceil(options.time / 744)
		}
		return instance.get(`users?page=${page}&limit=${limit}`, {
			params: {
				sport_id: options.sport,
				month: month
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

export const commentsAPI = {
	getLiveComments(timestamp: number) {
		return instance.get(`/comments?timestamp=${timestamp}`)
			.then((response) => {
				return response.data
			}).catch(err => err);
	},
	getComments(id: number, type: string, filterName: string) {
		return instance.get(`/${type}/${id}/comments?order_by=${filterName}`)
			.then((response) => {
				return response.data
			}).catch(err => err);
	},
	sendComment(id: number, type: string, text: string, reply_id?: number) {
		return instance.post(`${type}/${id}/comment`, { text, replies_to: reply_id })
			.then((response) => {
				return response.data
			}).catch(err => err);
	},
	likeComment(id: number) {
		return instance.post(`comments/${id}/like`)
			.then((response) => {
				return response.data
			}).catch(err => err);
	},
	dislikeComment(id: number) {
		return instance.post(`comments/${id}/dislike`)
			.then((response) => {
				return response.data
			}).catch(err => err);
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
		return instance.post(`feedback`, { email, text })
			.then((response) => {
				return response.data
			});
	},
	exportData(link: string) {
		return instance.get(`${link}`)
			.then((response) => {
				return response.data
			});
	},

	getPolicy() {
		return instance.get(`${apiURL}/policy`)
			.then((response) => {
				return response.data
			});
	},

	getTerms() {
		return instance.get(`${apiURL}/terms`)
			.then((response) => {
				return response.data
			});
	},

	getOptions() {
		return instance.get(`options`)
			.then((response) => {
				return response.data
			});
	},
	getBanners() {
		return instance.get(`banners`)
		.then((response) => {
			return response.data
		});
	},

	// short data for dropdowns (users,championships, )
	getShortData(instanceName: String) {
		return instance.get(`/${instanceName}/short`)
			.then((response) => {
				return response.data
			}).catch(err => err);
	},
}

export const adminAPI = {
	posts: {
		getAdminPosts(page: number, limit: number, search: string, search_by: string) {
			let searchString = ''
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
			let formData = new FormData()
			for (let key in postObject) {
				formData.append(key, postObject[key])
			}

			return instance.post(`admin/posts`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
				.then((response) => {
					return response.data
				});
		},
		editPost(id: number, postObject: any) {
			let formData = new FormData()
			for (let key in postObject) {
				formData.append(key, postObject[key])
			}
			return instance.post(`admin/posts/${id}`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
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
	},
	users: {
		getAdminUsers(page: number, limit: number, search: string, search_by: string) {
			let searchString = ''
			if (search && search_by) {
				searchString = `&search=${search}&search_by=${search_by}`
			}

			return instance.get(`admin/users?page=${page}&limit=${limit}` + searchString)
				.then((response) => {
					return response.data
				});
		},
		getAdminUser(id: number) {
			return instance.get(`admin/users/${id}`)
				.then((response) => {
					return response.data
				});
		},


		addUser(userObject: UserType | any) {
			let formData = new FormData()
			for (let key in userObject) {
				formData.append(key, userObject[key])
			}
			return instance.post(`admin/users`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
				.then((response) => {
					return response.data
				});
		},
		editUser(id: number, userObject: UserType | any) {
			let formData = new FormData()
			for (let key in userObject) {
				formData.append(key, userObject[key])
			}
			return instance.post(`admin/users/${id}`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
				.then((response) => {
					return response.data
				});
		},
		deleteUser(id: number) {
			return instance.delete(`admin/users/${id}`)
				.then((response) => {
					return response.data
				});
		},
	},
	forecsats: {
		getAdminForecasts(page: number, limit: number, search: string, search_by: string) {
			let searchString = ''
			if (search) {
				searchString = `&search=${search}`
			}

			return instance.get(`admin/forecasts?page=${page}&limit=${limit}` + searchString)
				.then((response) => {
					return response.data
				});
		},
		getUserForecasts(page: number, limit: number, search: string, search_by: string, userId: number) {
			let searchString = ''
			if (search) {
				searchString = `&search=${search}`
			}

			return instance.get(`admin/users/${userId}/forecasts?page=${page}&limit=${limit}` + searchString)
				.then((response) => {
					return response.data
				});
		},
		getAdminForecast(id: number) {
			return instance.get(`admin/forecasts/${id}`)
				.then((response) => {
					return response.data
				});
		},


		addForecast(dataObject: ForecastType) {
			return instance.post(`admin/forecasts`, { ...dataObject })
				.then((response) => {
					return response.data
				});
		},
		editForecast(id: number, dataObject: ForecastType) {
			return instance.post(`admin/forecasts/${id}`, { ...dataObject })
				.then((response) => {
					return response.data
				});
		},
		deleteForecast(id: number) {
			return instance.delete(`admin/forecasts/${id}`)
				.then((response) => {
					return response.data
				});
		},
	},
	boomakers: {
		getAdminBookmakers(page: number, limit: number, search: string, search_by: string) {
			let searchString = ''
			if (search && search_by) {
				searchString = `&search=${search}&search_by=${search_by}`
			}

			return instance.get(`admin/bookmakers?page=${page}&limit=${limit}` + searchString)
				.then((response) => {
					return response.data
				});
		},
		getAdminBookmaker(id: number) {
			return instance.get(`admin/bookmakers/${id}`)
				.then((response) => {
					return response.data
				});
		},

		addBookmaker(dataObject: BookmakerType | any) {
			let formData = new FormData()
			for (let key in dataObject) {
				formData.append(key, dataObject[key])
			}
			return instance.post(`admin/bookmakers`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
				.then((response) => {
					return response.data
				});
		},
		editBookmaker(id: number, dataObject: BookmakerType | any) {
			let formData = new FormData()
			for (let key in dataObject) {
				formData.append(key, dataObject[key])
			}
			return instance.post(`admin/bookmakers/${id}`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
				.then((response) => {
					return response.data
				});
		},
		deleteBookmaker(id: number) {
			return instance.delete(`admin/bookmakers/${id}`)
				.then((response) => {
					return response.data
				});
		},
	},
	events: {
		getAdminEvents(page: number, limit: number, search: string, search_by: string) {
			let searchString = ''
			if (search && search_by) {
				searchString = `&search=${search}&search_by=${search_by}`
			}

			return instance.get(`admin/events?page=${page}&limit=${limit}` + searchString)
				.then((response) => {
					return response.data
				});
		},
		getAdminEvent(id: number) {
			return instance.get(`admin/events/${id}`)
				.then((response) => {
					return response.data
				});
		},

		addEvent(dataObject: EventType) {
			
			return instance.post(`admin/events`, {...dataObject})
				.then((response) => {
					return response.data
				});
		},
		editEvent(id: number, dataObject: EventType) {
			
			return instance.post(`admin/events/${id}`, {...dataObject})
				.then((response) => {
					return response.data
				});
		},
		deleteEvent(id: number) {
			return instance.delete(`admin/events/${id}`)
				.then((response) => {
					return response.data
				});
		},
	},
	championships: {
		getAdminChampionships(page: number, limit: number, search: string, search_by: string) {
			let searchString = ''
			if (search && search_by) {
				searchString = `&search=${search}&search_by=${search_by}`
			}

			return instance.get(`admin/championships?page=${page}&limit=${limit}` + searchString)
				.then((response) => {
					return response.data
				});
		},
		getAdminChampionship(id: number) {
			return instance.get(`admin/championships/${id}`)
				.then((response) => {
					return response.data
				});
		},

		addChampionship(dataObject: ChampionshipType) {
			
			return instance.post(`admin/championships`, {...dataObject})
				.then((response) => {
					return response.data
				});
		},
		editChampionship(id: number, dataObject: ChampionshipType) {
			
			return instance.post(`admin/championships/${id}`, {...dataObject})
				.then((response) => {
					return response.data
				});
		},
		deleteChampionship(id: number) {
			return instance.delete(`admin/championships/${id}`)
				.then((response) => {
					return response.data
				});
		},
	},
	banners: {
		getAdminBanners(page: number, limit: number, search: string, search_by: string, order_by: string, direction: string) {
			return instance.get(`admin/banners`, {
				params: { page, limit, search, order_by, direction }
			})
				.then((response) => {
					return response.data
				});
		},
		getAdminBanner(id: number) {
			return instance.get(`admin/banners/${id}`)
				.then((response) => {
					return response.data
				});
		},

		addBanner(dataObject: BannerType | any) {
			let formData = new FormData()
			for (let key in dataObject) {
				formData.append(key, dataObject[key])
			}
			return instance.post(`admin/banners`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
				.then((response) => {
					return response.data
				});
		},
		editBanner(id: number, dataObject: BannerType | any) {
			let formData = new FormData()
			for (let key in dataObject) {
				formData.append(key, dataObject[key])
			}
			return instance.post(`admin/banners/${id}`, formData, { headers: { 'Content-type': 'multipart/form-data' } })
				.then((response) => {
					return response.data
				});
		},
		deleteBanner(id: number) {
			return instance.delete(`admin/banners/${id}`)
				.then((response) => {
					return response.data
				});
		},
	},
	

	app: {
		changePolicy(text: string) {
			return instance.post(`admin/policy`, { text })
				.then((response) => {
					return response.data
				});
		},
		changeTerms(text: string) {
			return instance.post(`admin/terms`, { text })
				.then((response) => {
					return response.data
				});
		},
		editOptions(options: OptionsType) {
			return instance.post(`admin/options`, { ...options })
				.then((response) => {
					return response.data
				});
		},
		getBanners() {
			return instance.get(`admin/banners`)
				.then((response) => {
					return response.data
				});
		}
	},


	getAdminDashboard() {
		return instance.get(`admin/dashboard`)
			.then((response) => {
				return response.data
			});
	}
}