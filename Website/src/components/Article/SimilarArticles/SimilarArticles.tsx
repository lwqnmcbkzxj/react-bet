import React, { FC } from 'react';
import s from './SimilarArticles.module.scss';
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../../types/types'
import { ArticleType } from '../../../types/article'
import { Link } from 'react-router-dom'
import contetntHolder from '../../../assets/img/content-no-image-small.png'
import ElementStats from '../../Common/ElementStats/ElementStats'
import { ArticlesPlaceholder } from '../../Common/Placeholders/ArticlesPlaceholder'

import { formatDate } from '../../../utils/formatDate'
import { apiURL } from '../../../api/api';


type ArticlesProps = {
	articles: Array<ArticleType>
}

const ArticlesList: FC<ArticlesProps> = ({ articles, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.articles.isFetching)

	return (
		<div className={s.similarArticles}>

			<div className={s.blockHeader}>Похожие статьи:</div>

			<div className={s.articlesList}>
				{
					articles.map((article, counter) =>
						!article.id || isFetching ? <ArticlesPlaceholder /> :
							<div className={s.article}>
								<Link to={`/articles/${article.id}`} className="actileLink">

									<img src={article.image ?apiURL + article.image : contetntHolder} alt="article-img" />
									<div className={s.articleContent}>
										<div className={s.acticleName}>{article.title}</div>
										<div className={s.articleDescription} dangerouslySetInnerHTML={{ __html: article.content }}></div>
									</div>
								</Link>

								<ElementStats
									likes={article.rating}
									likesActive={article.vote}

									comments={article.count_comments}

									favourites={0}
									showFavourites={false}

									id={article.id}
									elementType='article'
								/>
							</div>
					)
				}
			</div>
		</div>
	)
}

export default ArticlesList;