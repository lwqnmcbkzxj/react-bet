export type ArticleType = {
	id: number
	title: string
	content: string
	category_name: string
	image: null | string
	created_by: number
	modified_by: number
	is_published: boolean
	created_at: string
	updated_at: string
	rating: number
	count_comments: number
}