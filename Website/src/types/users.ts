export type UserType = {
	id: number,
	role: {
		id: number,
		name: string,
		label: string
	},
	login: string
	balance: string
	avatar: string,
	rating_position: number,
	stats: {
		roi: string
		average_cofficient: string
		pure_profit: string
		count_win: number,
		count_loss: number,
		count_wait: number,
		count_back: number,
		count_subscribers: number,
		count_subscriptions: number
	},
	last_five: Array<boolean>
	is_subscribed: boolean
}
