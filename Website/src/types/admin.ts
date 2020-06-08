export type ArticleType = {
	id?: number
	title?: string
	content?: string
	category_name?: string
	image?: string
	created_by?: number
	created_by_login?: string
	modified_by?: number
	is_published?: boolean
	created_at?: string
	updated_at?: string
}
export type DashboardType = {
	users_count: number,
	forecasts_count: number,
	posts_count: number,
	news_count: number,
	users_count_today: number,
	forecasts_count_today: number
}

export type UserType = {
	id: number,
	role_id: number,
	login: string
	email: string
	email_verified_at: null,
	uid: number,
	balance: number,
	avatar: string,
	provider_id: null,
	provider: null,
	is_email_notification: boolean,
	is_push_notification: boolean,
	platform: string
	created_at: string
	updated_at: string
	rating_position: number,
	stats: {
		roi: number,
		average_cofficient: number,
		pure_profit: number,
		count_win: number,
		count_loss: number,
		count_wait: number,
		count_back: number,
		count_subscribers: number,
		count_subscriptions: number
	},
	last_five: Array<boolean>
}

export type BookmakerType = {
    id: number,
    title: string
    content: string
    rating: number,
    bonus: number,
    link: string,
    image: string
}

export type ForecastType = {
	
}

