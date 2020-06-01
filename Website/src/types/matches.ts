import { ForecastType } from './forecasts'
import { CommentType } from './types'

export type MatchType = {
	event_id: number,
	championship_data: {
		championship_id: number,
		championship: string,
		sport_id: number,
		sport_name: string
		sport_image: string
	},
	event: string
	event_start: string
	coefficients: Array<MatchCoefficientType>
	team_1: {
		name: string
	},
	team_2: {
		name: string
	},
	forecasts_count: number,
	forecasts?: Array<ForecastType>
	comments?: Array<CommentType>
}


export type MatchCoefficientType = {
	id: number
	event_id: number
	type: string
	coefficient: string
	status: number
	created_at: string
	updated_at: string
	forecasts_count: number
}