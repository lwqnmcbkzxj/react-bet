import React, { FC } from 'react'
import s from './News.module.scss';
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { NewsType } from '../../types/news'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'
import NewsList from './NewsList'


type NewsPropsType = {
	news: Array<NewsType>
}

const News: FC<NewsPropsType> = ({ news, ...props }) => {
	return (
		<div className={s.news}>
			<Breadcrumbs pathParams={['Главная', 'Новости']} />
			<div className="pageHeader">
				<h1 className="pageName">Новости</h1>
			</div>

			<NewsList news={news}/>

		</div>
	)
}

export default News;