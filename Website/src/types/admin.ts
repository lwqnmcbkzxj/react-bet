import { ForecastStatusEnum } from "./forecasts"
import { CommentType } from "./types"

export type ArticleType = {
	id?: number
	title?: string
	content?: string
	category_name?: string
	image?: string
	created_by?: number
	created_by_login?: string
	modified_by?: number
	is_published?: boolean | number
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
	news_count_today: number
	posts_count_today: number
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
	forecasts_count: number
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
	id: number
	user_data: {
		id: number
		role: {
			id: number,
			name: string
			label: string
		},
		avatar: string | null
		login: string
		stats: {
			roi: string
			pure_profit: string
			count_win: number
			count_loss: number
			count_wait: number
			count_back: number
			count_subscribers: number
			count_subscriptions: number,
			average_cofficient: number
		},
		last_five: Array<boolean>
		is_subscribed: boolean
	},
	event_data: {
		championship_data: {
			championship_id: number
			championship: string
			sport_id: number
			sport_name: string
			sport_image: string
		},
		event_id: number,
		event: string
		event_start: string
		team_1: {
			name: string
		}
		team_2: {
			name: string
		}
	},
	forecast_text: string,
	forecast_created_at: string,
	bet_data: {
		bet: string,
		coefficient: string,
		type: string,
		pure_profit: number
		status: ForecastStatusEnum
	},
	forecast_stats: {
		count_subscribers: number,
		count_comments: number,
		rating: number
	}
}
// MatchType
export type EventType = {
	id: number,
	sport_id: number
	championship_id: number
	title: string
	start: string
	status: number
	created_at: string
	updated_at: string
	forecasts_count: number
	sport: {
		id: number
		name: string
		created_at: string
		updated_at: string
		image: string
	}
}

export type ChampionshipType = {
	id: number
	name: string
	sport_id: number
	created_at: string
	updated_at: string
	sport: {
		id: number
		name: string
		created_at: string
		updated_at: string
		image: string
	}
}