import React, { FC, useState } from 'react';
import s from './Matches.module.scss';
import { } from '../../types/forecasts'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import MatchesList from './MatchesList'
import { MatchType } from '../../types/matches';
import { NavLink } from 'react-router-dom';
import ActionButton from '../Common/ActionButton/ActionButton'

type MatchesPropsType = {
	matches: Array<MatchType>
}
const Matches: FC<MatchesPropsType> = ({ matches, ...props }) => {
	return (
		<div className={s.matches}>
			<Breadcrumbs pathParams={[
				{ text: 'Главная', link: '' },
				{ text: 'Лучшие матчи', link: '/matches' }]} />
			
			<div className="pageHeader">
				<h1 className="pageName">Топ матчи</h1>
			</div>

			<MatchesList matches={matches} />
			<div style={{ marginTop: 30 }}>
				<ActionButton value="Показать дальше" func={() => { console.log('Get more matches') }} />
			</div>

		</div>
	)
}
export default Matches;