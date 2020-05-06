import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'

import Article from './Article'
import { ArticlePlaceholder } from '../Common/Placeholders/ArticlesPlaceholder'
import { getArticleFromServer } from '../../redux/articles-reducer'
import { withRouter, RouteComponentProps } from 'react-router'
interface MatchParams {
    articleId: string;
}

interface ArticleProps extends RouteComponentProps<MatchParams> {}


const ArticleContainer: FC<ArticleProps> = ({ ...props }) => {
	const article = {} as ArticleType
	// const articles = useSelector<AppStateType, ArticleType>(state => state.articles.currentArticle)
	const isFetching = useSelector<AppStateType, boolean>(state => state.articles.isFetching) 
	const dispatch = useDispatch()


	let articleId = props.match.params.articleId ? props.match.params.articleId : 1;

	useEffect(() => {
		dispatch(getArticleFromServer(+articleId))		
	}, []);



	if (isFetching) {
		return <ArticlePlaceholder />
	}
	return ( 
		<Article article={article}/>
	)
}

export default withRouter(ArticleContainer);