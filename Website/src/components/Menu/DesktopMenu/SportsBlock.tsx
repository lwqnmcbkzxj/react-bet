import React, { FC, useState } from 'react';
import s from './DesktopMenu.module.scss';
import { NavLink } from 'react-router-dom';
import footballImg from '../../../assets/img/football.png'
import tennisImg from '../../../assets/img/table-tennis.png'
import basketballImg from '../../../assets/img/basketball.png'
import hockeyImg from '../../../assets/img/hockey.png'

import { sportTypeFilterEnum } from '../../../types/forecasts'

type SportsBlockPropsType = {
	toggleFilter: (filterName: string, filtersBlockName: string)=> void
}

const SportsBlock: FC<SportsBlockPropsType> = ({toggleFilter, ...props }) => {
	const [sportsBlockVisible, setSportsBlockVisibitity] = useState(false);

	const toggleSportsBlockVisibitity = () => {
		setSportsBlockVisibitity(!sportsBlockVisible)
	}

	let sportsArray = [
		{ name: "Футбол", filterName: sportTypeFilterEnum.football, img: footballImg },
		{ name: "Теннис", filterName: sportTypeFilterEnum.tennis, img: tennisImg },
		{ name: "Баскетбол", filterName: sportTypeFilterEnum.basketball, img: basketballImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
		{ name: "Хоккей", filterName: sportTypeFilterEnum.hockey, img: hockeyImg },
	]

	let sportLinks = [] as any
	sportsArray.map((link, counter) => {
		sportLinks.push(
			<NavLink key={counter} to="/forecasts" className={s.sportLink}>
				<button onClick={() => { toggleFilter(link.filterName, 'sportTypeFilter') }}>
					<img src={link.img} alt="sport-img" />{link.name}
				</button>
			</NavLink>)
	})
	let sportLinksLimit = sportsBlockVisible ? -1 : 4;
	let showBtn;

	if (sportsBlockVisible) {
		showBtn = <button className={s.showBtn} onClick={toggleSportsBlockVisibitity}>Скрыть</button>
	} else {		
		showBtn = <button className={s.showBtn} onClick={toggleSportsBlockVisibitity}>Показать еще ({sportsArray.length - sportLinksLimit})</button>
	}
	return (

		<div className={s.sportBlock}>
			<h2>Виды спорта</h2>
			<div className={s.sportLinks}>
				{sportLinks.map((link: any, counter: number) =>
					(counter < sportLinksLimit || sportLinksLimit === -1) ? link : null
				)}
			</div>
			{ showBtn }
		</div>
	)
}

export default SportsBlock;