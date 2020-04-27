import React, { FC } from 'react'
import s from './Articles.module.scss';
import { ArticleType } from '../../types/article'
import { Link } from 'react-router-dom'

import articleDefaultImg from '../../assets/img/article-img.png'
import ElementStats from '../Common/ElementStats/ElementStats'
type ArticlesPropsType = {
	articles: Array<ArticleType>
}

const ArticlesList: FC<ArticlesPropsType> = ({ articles, ...props }) => {
	return (
		<div className={s.articlesList}>
			{
				articles.map((article, counter) =>
					<div className={s.article}>
						<Link to="articles/1" className="actileLink">
							{counter % 2 === 0 && <img src={articleDefaultImg} alt="article-img" />}
							
							<div className={s.articleHeader}>
								<div className={s.categoryName}>Название категории</div>
								<div className={s.publishDate}>вчера в 16:58</div>
							</div>
							<div className={s.articleContent}>
								<div className={s.acticleName}>Рекомендации от опытного игрока</div>
								<div className={s.articleDescription}>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
								nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
								At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren no
								sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
							sadipscing elitr, sed...</div>
							</div>
						</Link>

						<ElementStats likes={0} comments={0} favourites={0} id={0} elementType={'article'}/>
					</div>
				)
			}
		</div>
	)
}

export default ArticlesList;