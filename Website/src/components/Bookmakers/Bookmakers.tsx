import React, { FC, useState } from 'react';
import s from './Bookmakers.module.scss';
import '../../App.scss'
import {  } from '../../types/forecasts'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import BookmakersList from './BookmakersList/BookmakersList'

type BookmakersPropsType = {
	
}
const Bookmakers: FC<BookmakersPropsType> = ({ ...props }) => {
	return (
		<div className={s.bookmakers}>
			<Breadcrumbs pathParams={['Главная', 'Рейтинг букмекеров']} />
			<div className="pageHeader">
				<h1 className="pageName">Рейтинг букмекеров</h1>
			</div>

			<BookmakersList />
		</div>
	)
}
export default Bookmakers;