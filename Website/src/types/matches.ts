import { ForecastType } from './forecasts'

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
	team_1: {
		name: string
	},
	team_2: {
		name: string
	},
	forecasts_count: number,
	forecasts?: Array<ForecastType>
}