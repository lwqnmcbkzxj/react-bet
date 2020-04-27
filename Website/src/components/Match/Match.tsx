import React, { FC, useState } from 'react';
import s from './Match.module.scss';
import '../../App.scss'
import {  } from '../../types/forecasts'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import { MatchType } from '../../types/matches';

type MatchPropsType = {
	match: MatchType
}
const Match: FC<MatchPropsType> = ({match, ...props }) => {
	return (
		<div className={s.match}>
			{/* <Breadcrumbs pathParams={['Главная', 'Лучшие матчи']} />
			<div className="pageHeader">
				<h1 className="pageName">Топ матчи</h1>
			</div> */}

		</div>
	)
}
export default Match;