import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'
import { getArticlesFromServer } from '../../redux/articles-reducer'
import Articles from './Articles'
import { setPaginationPage } from '../../redux/app-reducer'

const ArticlesContainer: FC = ({ ...props }) => {
	const articles = useSelector<AppStateType, Array<ArticleType>>(state => state.articles.articles)
 
	const page = useSelector<AppStateType, number>(state => state.app.paginationObject.articles.page)
	const limit = useSelector<AppStateType, number>(state => state.app.paginationObject.articles.limit)

	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getArticlesFromServer(page, limit))
	}, [page, limit]);
	useEffect(() => {
		dispatch(getArticlesFromServer(page, limit))
	}, []);

	return ( 
		<Articles articles={articles} />
	)
}

export default ArticlesContainer;