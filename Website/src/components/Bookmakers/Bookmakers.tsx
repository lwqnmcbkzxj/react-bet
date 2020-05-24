import React, { FC, useState } from 'react';
import s from './Bookmakers.module.scss';
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import BookmakersList from './BookmakersList/BookmakersList'
import { BookmakerType } from '../../types/bookmakers';

type BookmakersPropsType = {
	bookmakers: Array<BookmakerType>
}
const Bookmakers: FC<BookmakersPropsType> = ({ bookmakers, ...props }) => {
	return (
		<div className={s.bookmakers}>
			<Breadcrumbs pathParams={[
				{ text: 'Главная', link: '' },
				{ text: 'Рейтинг букмекеров', link: '/bookmakers' }]} />

			
			<div className="pageHeader">
				<h1 className="pageName">Рейтинг букмекеров</h1>
			</div>

			<BookmakersList bookmakers={bookmakers}/>
		</div>
	)
}
export default Bookmakers;