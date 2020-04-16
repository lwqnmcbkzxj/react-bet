import React, { FC, useState } from 'react';
import s from './Menu.module.css';
import { NavLink } from 'react-router-dom';
import footballImg from '../../assets/img/football.png'
import tennisImg from '../../assets/img/table-tennis.png'
import basketballImg from '../../assets/img/basketball.png'
import puckImg from '../../assets/img/puck.png'

type MenuPropsType = {

}

const SportsBlock: FC<MenuPropsType> = ({ ...props }) => {
	const [sportsBlockVisible, setSportsBlockVisibitity] = useState(false);

	const toggleSportsBlockVisibitity = () => {
		setSportsBlockVisibitity(!sportsBlockVisible)
	}

	let sportsArray = [
		{ name: "Футбол", filterName: "football", img: footballImg },
		{ name: "Теннис", filterName: "tennis", img: tennisImg },
		{ name: "Баскетбол", filterName: "basketbal", img: basketballImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
		{ name: "Хоккей", filterName: "puck", img: puckImg },
	]

	let sportLinks = [] as any
	sportsArray.map((link, counter) => {
		sportLinks.push(<NavLink key={counter} to="/forecasts" className={s.sportLink}><button onClick={() => { console.log(link.filterName) }}><img src={link.img} alt="sport-img" />{link.name}</button></NavLink>)
	})
	let sportLinksLimit = sportsBlockVisible ? -1 : 4;
	let sportBtn;

	if (sportsBlockVisible) {
		sportBtn = <button className={s.sportBtn} onClick={toggleSportsBlockVisibitity}>Скрыть</button>
	} else {		
		sportBtn = <button className={s.sportBtn} onClick={toggleSportsBlockVisibitity}>Показать еще ({sportsArray.length - sportLinksLimit}})</button>
	}
	return (

		<div className={s.sportBlock}>
			<h2>Виды спорта</h2>
			<div className={s.sportLinks}>
				{sportLinks.map((link: any, counter: number) =>
					(counter < sportLinksLimit || sportLinksLimit === -1) ? link : null
				)}
			</div>
			{ sportBtn }
		</div>
	)
}

export default SportsBlock;