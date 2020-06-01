import React, { FC, useState } from 'react';
import s from './DesktopMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { SportType } from '../../../types/types'
import { sportTypeFilterEnum, FilterNames } from '../../../types/filters'

import { apiURL } from '../../../api/api'

type SportsBlockPropsType = {
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void
	sports: Array<SportType>
}

const SportsBlock: FC<SportsBlockPropsType> = ({toggleFilter, sports, ...props }) => {
	const [sportsBlockVisible, setSportsBlockVisibitity] = useState(false);

	const toggleSportsBlockVisibitity = () => {
		setSportsBlockVisibitity(!sportsBlockVisible)
	}

	let sportLinks = [] as any
	sports.map((sport, counter) => {
		+sport.id !== 0 &&
		sportLinks.push(
			<NavLink key={counter} to="/forecasts" className={s.sportLink}>
				<button onClick={() => { toggleFilter(sport.name, 'sportTypeFilter') }}>
				<img src={ apiURL + sport.image} alt="teamImg" />
					{sport.visibleText}
				</button>
			</NavLink>)
	})
	let sportLinksLimit = sportsBlockVisible ? -1 : 4;
	let showBtn;


	if (sportsBlockVisible) {
		showBtn = <button className={s.showBtn} onClick={toggleSportsBlockVisibitity}>Скрыть</button>
	} else {		
		showBtn = <button className={s.showBtn} onClick={toggleSportsBlockVisibitity}>Показать еще ({sports.length - sportLinksLimit})</button>
	}
	return (

		<div className={s.sportBlock}>
			<h2>Виды спорта</h2>
			<div className={s.sportLinks}>
				{sportLinks.map((link: any, counter: number) =>
					(counter < sportLinksLimit || sportLinksLimit === -1) ? link : null
				)}
			</div>
			{ sportLinksLimit > 4 && showBtn }
		</div>
	)
}

export default SportsBlock;