import React, { FC } from 'react';
import s from './Menu.module.css';
import { NavLink } from 'react-router-dom';
import SportsBlock from './SportsBlock';
import MenuFooter from './MenuFooter';

type MenuPropsType = {

}

const Menu: FC<MenuPropsType> = ({ ...props }) => {
	return (
		// <div className={s.menuHolder}>
			<div className={s.menu}>
				<div className={s.pagesLinks}>
					<NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>Главная</NavLink>
					<NavLink to="/forecasts" className={s.link} activeClassName={s.activeLink}>Прогнозы</NavLink>
					<NavLink to="/forecasters" className={s.link} activeClassName={s.activeLink}>Рейтинг прогнозистов</NavLink>
					<NavLink to="/bookmakers" className={s.link} activeClassName={s.activeLink}>Рейтинг букмекеров</NavLink>
					<NavLink to="/matches" className={s.link} activeClassName={s.activeLink}>Лучшие матчи</NavLink>
					<NavLink to="/articles" className={s.link} activeClassName={s.activeLink}>Статьи</NavLink>
					<NavLink to="/news" className={s.link} activeClassName={s.activeLink}>Новости</NavLink>
				</div>
				<SportsBlock />
				<MenuFooter />

			</div>
		// </div>
	)
}

export default Menu;