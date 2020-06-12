import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import s from './News.module.scss';
import { NewsType } from '../../types/news'
import { NewslistPlaceholder } from '../Common/Placeholders/NewsPlaceholder'
import { formatDate } from '../../utils/formatDate';
import { Link } from 'react-router-dom';
import useScrollDown from '../../hooks/useScrollDown';
import AdvertBlock from '../Adverts/AdvertBlock';

type NewsPropsType = {
	news: Array<NewsType>

	instanceName?: string
}

const NewsList: FC<NewsPropsType> = ({ news, instanceName = 'news', ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.news.isFetching)

	useScrollDown(instanceName)
	return (
		<div className={s.newsList}>
			{
				news.map((newsElement, counter) =>
					isFetching ? <NewslistPlaceholder /> :
						<>
							<a href={newsElement.link} target="_blank" className={s.newsElement}>
								<div className={s.newsHeader}>
									<div className={s.categoryName}></div>
									<div className={s.publishDate}>{formatDate(newsElement.created_at)}</div>
								</div>
								<div className={s.newsContent}>
									<div className={s.newsName}>{newsElement.title}</div>
									<div className={s.newsDescription}>
										{newsElement.content}
									</div>
								</div>
							</a>
							{(counter + 1) % 1 === 0 && <AdvertBlock />}
						</>

				)
			}
		</div>
	)
}

export default NewsList;