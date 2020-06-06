import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector} from "react-redux"
import { AppStateType, CommentsEnum } from '../../types/types'
import { ArticleType } from '../../types/article'

import Article from './Article'
import { ArticlePlaceholder } from '../Common/Placeholders/ArticlesPlaceholder'
import { getArticleFromServer, getArticleComments } from '../../redux/articles-reducer'
import { withRouter, RouteComponentProps } from 'react-router'
interface MatchParams {
    articleId: string;
}

interface ArticleProps extends RouteComponentProps<MatchParams> {}


const ArticleContainer: FC<ArticleProps> = ({ ...props }) => {
	const article = useSelector<AppStateType, ArticleType>(state => state.articles.currentArticle)
	const isFetching = useSelector<AppStateType, boolean>(state => state.articles.isFetching) 
	const dispatch = useDispatch()


	let articleId = props.match.params.articleId ? props.match.params.articleId : 1;

	const [commentFilter, setCommentFilter] = useState(CommentsEnum.rating)
	const getComments = () => {
		dispatch(getArticleComments(+articleId, commentFilter))
	}

	useEffect(() => {
		(async function asyncFunction() {
			await dispatch(getArticleFromServer(+articleId))	
			getComments()
		})()
	}, []);


	debugger
	if (isFetching) {
		return <ArticlePlaceholder />
	}
	return ( 
		<Article
			article={article}
			commentsFunctions={{
				refreshComments: () => { getComments() },
				commentFilter,
				setCommentFilter
			}}
		/>
	)
}

export default withRouter(ArticleContainer);