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
	},
	event_data: {
		championship_data: {
			championship_id: number
			championship: string
			sport_id: number
			sport_name: string
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
	bet_data: {
		bet: string,
		coefficient: string,
		type: string,
		pure_profit: number
	},
	forecast_stats: {
		count_subscribers: number,
		count_comments: number,
		rating: number
		comments?: Array<any>
		// comments: Array<CommentType>
	}
}
/* FORECAST TYPES */