import React, { FC, useState } from 'react';
import s from './Matches.module.scss';
import '../../App.scss'
import {  } from '../../types/forecasts'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import MatchesList from './MatchesList'
import { MatchType } from '../../types/matches';

type MatchesPropsType = {
	matches: Array<MatchType>
}
const Matches: FC<MatchesPropsType> = ({matches, ...props }) => {
	return (
		<div className={s.matches}>
			<Breadcrumbs pathParams={['Главная', 'Лучшие матчи']} />
			<div className="pageHeader">
				<h1 className="pageName">Топ матчи</h1>
			</div>

			<MatchesList matches={matches}/>
		</div>
	)
}
export default Matches;