import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'
import { getArticlesFromServer } from '../../redux/articles-reducer'
import Articles from './Articles'

const ArticlesContainer: FC = ({ ...props }) => {
	const articles = useSelector<AppStateType, Array<ArticleType>>(state => state.articles.articles)
 
	const dispatch = useDispatch()
	useEffect(() => {
		dispatch(getArticlesFromServer())
	}, []);

	return ( 
		<Articles articles={articles}/>
	)
}

export default ArticlesContainer;