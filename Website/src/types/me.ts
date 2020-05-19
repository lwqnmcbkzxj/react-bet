export type UserType = {
	id: number,
	role_id: number,
	login: string,
	email: string,
	email_verified_at: string,
	uid: string,
	balance: string,
	avatar: string,
	provider_id: string,
	provider: string,
	is_email_notification: number,
	is_push_notification: number,
	platform: string,
	created_at: string,
	updated_at: string,
	role: {
		id: 1,
		name: string,
		label: string
	},
	rating_position: number,
	stats: {
		roi: string,
		average_cofficient: string,
		pure_profit: string,
		count_win: number,
		count_loss: number,
		count_wait: number,
		count_back: number,
		count_subscribers: number,
		count_subscriptions: number
	},
	last_five: []
}

export type SettingsType = {

}
