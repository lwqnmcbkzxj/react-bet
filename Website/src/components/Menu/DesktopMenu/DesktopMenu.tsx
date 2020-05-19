import React, { FC } from 'react';
import s from './DesktopMenu.module.scss';
import { NavLink } from 'react-router-dom';
import { FilterNames } from '../../../types/filters'
import { SportType } from '../../../types/types'

import SportsBlock from './SportsBlock';
import MenuFooter from '../../Common/Footer/Footer';

type MenuPropsType = {
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void
	sports: Array<SportType>
}

const Menu: FC<MenuPropsType> = ({toggleFilter, sports, ...props }) => {
	return (
		<div className={s.menuHolder}>
			<div className={s.menu}>
				<div className={s.menuContent}>
					<div className={s.pagesLinks}>
						<NavLink exact to="/" className={s.link} activeClassName={s.activeLink}>Главная</NavLink>
						<NavLink to="/forecasts" className={s.link} activeClassName={s.activeLink}>Прогнозы</NavLink>
						<NavLink to="/forecasters" className={s.link} activeClassName={s.activeLink}>Рейтинг прогнозистов</NavLink>
						<NavLink to="/bookmakers" className={s.link} activeClassName={s.activeLink}>Рейтинг букмекеров</NavLink>
						<NavLink to="/matches" className={s.link} activeClassName={s.activeLink}>Лучшие матчи</NavLink>
						<NavLink to="/articles" className={s.link} activeClassName={s.activeLink}>Статьи</NavLink>
						<NavLink to="/news" className={s.link} activeClassName={s.activeLink}>Новости</NavLink>
					</div>
					<SportsBlock toggleFilter={toggleFilter} sports={sports}/>
				</div>

				<MenuFooter />

			</div>
		</div>
	)
}

export default Menu;