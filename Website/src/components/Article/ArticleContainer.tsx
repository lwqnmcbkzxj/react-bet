import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'

import Article from './Article'

const ArticleContainer: FC = ({ ...props }) => {
	const article = {} as ArticleType
	// const articles = useSelector<AppStateType, ArticleType>(state => state.articles.currentArticle)
 
	return ( 
		<Article article={article}/>
	)
}

export default ArticleContainer;