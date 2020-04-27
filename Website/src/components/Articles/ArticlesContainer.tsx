import React, { FC } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'

import Articles from './Articles'

const ArticlesContainer: FC = ({ ...props }) => {
	const articles = useSelector<AppStateType, Array<ArticleType>>(state => state.articles.articles)
 
	return ( 
		<Articles articles={articles}/>
	)
}

export default ArticlesContainer;