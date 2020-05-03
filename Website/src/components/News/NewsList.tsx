import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import s from './News.module.scss';
import { NewsType } from '../../types/news'
import { NewslistPlaceholder } from '../Common/Placeholders/NewsPlaceholder'

type NewsPropsType = {
	news: Array<NewsType>
}

const NewsList: FC<NewsPropsType> = ({ news, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.news.isFetching)

	return (
		<div className={s.newsList}>
			{
				news.map(newsElement => 
					isFetching ? <NewslistPlaceholder /> :
					<div className={s.newsElement}>
						<div className={s.newsHeader}>
							<div className={s.categoryName}>Название категории</div>
							<div className={s.publishDate}>вчера в 16:58</div>
						</div>
						<div className={s.newsContent}>
							<div className={s.newsName}>Широков назвал лучшего футболиста чемпионата России</div>
							<div className={s.newsDescription}>
								Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam 
								nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, 
								sed diam voluptua. At vero eos et accusam et justo duo dolores et ea 
								rebum. Stet clita kasd gubergren no sea takimata sanctus est 
								Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
							</div>
						</div>
					</div>
				)
			}
		</div>
	)
}

export default NewsList;