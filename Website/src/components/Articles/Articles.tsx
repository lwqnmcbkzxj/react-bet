import React, { FC } from 'react'
import s from './Articles.module.scss';
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'

import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'
import ArticlesList from './ArticlesList'

type ArticlesPropsType = {
	articles: Array<ArticleType>
}

const Articles: FC<ArticlesPropsType> = ({ articles, ...props }) => {
	return (
		<div className={s.articles}>
			<Breadcrumbs pathParams={[{ text: 'Главная', link: '' }, { text: 'Статьи', link: '/articles' }]} />
			<div className="pageHeader">
				<h1 className="pageName">Статьи</h1>
			</div>

			<ArticlesList articles={articles}/>

		</div>
	)
}

export default Articles;