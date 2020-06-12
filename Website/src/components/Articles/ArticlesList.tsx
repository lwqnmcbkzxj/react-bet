import React, { FC } from 'react';
import s from './Articles.module.scss';
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'
import { Link } from 'react-router-dom'
import articleDefaultImg from '../../assets/img/article-img.png'
import ElementStats from '../Common/ElementStats/ElementStats'
import { ArticlesPlaceholder } from '../Common/Placeholders/ArticlesPlaceholder'

import { formatDate } from '../../utils/formatDate'
import useScrollDown from '../../hooks/useScrollDown';
import { apiURL } from '../../api/api';
import AdvertBlock from '../Adverts/AdvertBlock';


type ArticlesPropsType = {
	articles: Array<ArticleType>
	instanceName?: string
}

const ArticlesList: FC<ArticlesPropsType> = ({ articles, instanceName = "articles", ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.articles.isFetching)
	useScrollDown(instanceName)

	return (
		<div className={s.articlesList}>
			{
				articles.map((article, counter) =>
					!article.id || isFetching ? <ArticlesPlaceholder /> :

						<>
						<div className={s.article}>
							<Link to={`/articles/${article.id}`} className="actileLink">
								{article.image && <img src={apiURL + article.image} alt="article-img" />}

								<div className={s.articleHeader}>
									<div className={s.categoryName}>{article.category_name}</div>
									<div className={s.publishDate}>{formatDate(article.created_at)}</div>
								</div>
								<div className={s.articleContent}>
									<div className={s.acticleName}>{article.title}</div>
									<div className={s.articleDescription} dangerouslySetInnerHTML={{ __html: article.content }}></div>
								</div>
							</Link>

							<ElementStats
								likes={article.rating}
								likesActive={article.vote}

								comments={article.count_comments}
								showComments={false}

								favourites={0}
								showFavourites={false}

								id={article.id}
								elementType='article'
							/>
							</div>
							{(counter + 1) % 1 === 0 && <AdvertBlock />}
						</>
				)
			}
		</div>
	)
}

export default ArticlesList;