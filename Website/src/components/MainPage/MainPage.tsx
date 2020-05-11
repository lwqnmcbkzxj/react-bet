import React, { FC, useEffect, useState, useCallback } from 'react';
import s from './MainPage.module.scss';
import classNames from 'classnames'
import { NavLink } from 'react-router-dom';

import ForecastsList from '../Forecasts/ForecastsList/ForecastsList'
import MatchesList from '../Matches/MatchesList'
import BookmakersList from '../Bookmakers/BookmakersList/BookmakersList'

import UsersList from '../Users/MainPageUsersList/MainPageUsersList'


import ActionButton from '../Common/ActionButton/ActionButton'

import { ForecastType } from '../../types/forecasts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import useMobile from '../../hooks/useMobile'


import { getArrayFromEnum } from '../../utils/enumToArray'
import { MatchType } from '../../types/matches';
import { BookmakerType } from '../../types/bookmakers';
import { UserType } from '../../types/users';


enum blocksNamesEnum {
	bookmakers = 'bookmakers'
}


type MainPagePropsType = {
	users: Array<UserType>
	forecasts: Array<ForecastType>
	matches: Array<MatchType>
	bookmakers: Array<BookmakerType>
	mainPageBlocksVisibility: any
	setMainPageBlocksVisibility: (blockNames: Array<string>) => void
	changeMainPageBlockVisibility: (blockName: string) => void
}

const MainPage: FC<MainPagePropsType> = ({ users, forecasts, matches, bookmakers, mainPageBlocksVisibility, setMainPageBlocksVisibility, changeMainPageBlockVisibility, ...props }) => {
	// Force update for toggling blocks
	const [, updateState] = useState();
	const forceUpdate = useCallback(() => updateState({}), []);

	const toggleBlockVisibility = (blockName: string) => {
		changeMainPageBlockVisibility(blockName)
		forceUpdate()
	}

	useEffect(() => {
		setMainPageBlocksVisibility(getArrayFromEnum(blocksNamesEnum))
	}, []);


	return (
		<div className={s.mainBlock}>
			<div className={s.forecasters}>
				<h1 className={s.blockHeader}>Лучшие прогнозисты</h1>
				<UsersList users={users}/>
				<NavLink to="/forecasters" className={s.navLinkBtn}><ActionButton value="Посмотреть всех" /></NavLink>

			</div>

			<div className={s.bookMakers}>
				<div className={classNames(
					s.contentBlock,
					{ [s.contentHidden]: mainPageBlocksVisibility[blocksNamesEnum.bookmakers] }
				)}>
					<div className={s.contentBlockHeader}>
						<h1>Рейтинг букмекеров</h1>
						<button className={s.toggleButton} onClick={() => { toggleBlockVisibility(blocksNamesEnum.bookmakers) }}><FontAwesomeIcon icon={faCaretDown} /></button>
					</div>

					<div className={s.contentBlockList}>
						<BookmakersList bookmakers={bookmakers} limit={3} isMainpage={true}/>
					</div>


				</div>
				<NavLink to="/bookmakers" className={s.navLinkBtn}><ActionButton value="Посмотреть всех" /></NavLink>
			</div>

			<div className={s.matches}>
				<div className={s.contentBlock}>
					<div className={s.contentBlockHeader}>
						<h1>Топ матчи</h1>
					</div>
					<MatchesList matches={matches} limit={5} isMainpage={true}/>
				</div>
				<NavLink to="/matches" className={s.navLinkBtn}><ActionButton value="Показать дальше" /></NavLink>
			</div>

			<div className={s.forecasts}>
				<h1 className={s.blockHeader}>Последние прогнозы</h1>
				<ForecastsList forecasts={forecasts} limit={5} />
				<NavLink to="/forecasts" className={s.navLinkBtn}><ActionButton value="Все прогнозы" /></NavLink>
			</div>
		</div>
	)
}

export default MainPage;