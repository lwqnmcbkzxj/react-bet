/* FORECAST TYPES */

export type ForecastType = {
	// UserName: string
	// UserAvatar: string
	// SportName: string
	// Tournament: string
	// ForecastId: number
	// Time: string
	// Text: string
	// BetValue: number
	// CratedAt: string
	// Coefficient: number
	// CommentsQuanity: number
	// Comments: Array<any>
	// FavAmmount: number
	// Rating: number

	bet: number
	championship_id: number
	coefficient_id: number
	count_comments: number
	count_dislikes: number
	count_likes: number
	created_at: string
	description: string
	event_id: number
	forecast_text: string
	id: number
	parent_id: null
	sport_id: number
	start: string
	status: number
	title: string
	updated_at: string
	user_id: number
	user_data: {
		id: number,
		role: {
			id: number,
			name: string,
			label: string
		},
		avatar: string,
		login: string,
		stats: {
			user_id: number,
			roi: string,
			pure_profit: string,
			count_win: number,
			count_loss: number,
			count_wait: number,
			count_back: number,
			count_subscribers: number,
			count_subscriptions: number
		}
	}


}

/* FORECAST TYPES */