import React, { FC, useState } from 'react';
import s from './Bookmaker.module.scss';
// import '../../assets/scss/CommonStyle.scss'
import {  } from '../../types/forecasts'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import { BookmakerType } from '../../types/bookmakers';

type BookmakerPropsType = {
	bookmaker: BookmakerType
}
const Bookmaker: FC<BookmakerPropsType> = ({ bookmaker, ...props }) => {
	return (
		<div className={s.bookmaker}>
			{/* <Breadcrumbs pathParams={['Главная', 'Рейтинг букмекеров']} />
			<div className="pageHeader">
				<h1 className="pageName">Рейтинг букмекеров</h1>
			</div> */}

		</div>
	)
}
export default Bookmaker;