import React, { FC, useEffect, useState, useCallback } from 'react';
import s from './MainPage.module.scss';
import classNames from 'classnames'
import { NavLink } from 'react-router-dom';
import ForecastsList from '../Forecasts/ForecastsList/ForecastsList'
import MatchesList from '../Matches/MatchesList'
import ActionButton from '../Common/ActionButton/ActionButton'
import MobileFooter  from '../Common/Footer/Footer'

import { ForecastType } from '../../types/forecasts'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import useMobile from '../../hooks/useMobile'


import { getArrayFromEnum } from '../../utils/enumToArray'


enum blocksNamesEnum {
	bookmakers = 'bookmakers'
}


type MainPagePropsType = {
	forecasts: Array<ForecastType>
	mainPageBlocksVisibility: any
	setMainPageBlocksVisibility: (blockNames: Array<string>) => void
	changeMainPageBlockVisibility: (blockName: string) => void
}

const MainPage: FC<MainPagePropsType> = ({ forecasts, mainPageBlocksVisibility, setMainPageBlocksVisibility, changeMainPageBlockVisibility, ...props }) => {
	let isMobile = useMobile(768)

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
				<p>Здесь будет список прогнозистов</p>
				<NavLink to="/forecasters" className={s.navLinkBtn}><ActionButton value="Посмотреть всех" /></NavLink>

			</div>

			<div className={s.forecasts}>
				<h1 className={s.blockHeader}>Последние прогнозы</h1>
				<ForecastsList forecasts={forecasts} limit={5} />
				<NavLink to="/forecasts" className={s.navLinkBtn}><ActionButton value="Все прогнозы" /></NavLink>
			</div>

			<div className={s.bookMakers}>
				<div className={classNames(
					s.contentBlock,
					{[s.contentHidden]: mainPageBlocksVisibility[blocksNamesEnum.bookmakers]}
				)}>
					<div className={s.contentBlockHeader}>
						<h1>Рейтинг букмекеров</h1>
						<button className={s.toggleButton} onClick={() => { toggleBlockVisibility(blocksNamesEnum.bookmakers)}}><FontAwesomeIcon icon={faCaretDown} /></button>
					</div>

					
					<div className={s.contentBlockList}>
						<p>Список букмекеров</p>
					</div>
					

				</div>
				<NavLink to="/bookmakers" className={s.navLinkBtn}><ActionButton value="Посмотреть всех" /></NavLink>
			</div>

			<div className={s.matches}>
				<div className={s.contentBlock}>
					<div className={s.contentBlockHeader}>
						<h1>Рейтинг букмекеров</h1>
						<h1>Топ матчи</h1>
					</div>
					<p>Список матчей</p>
					<MatchesList limit={5} isMainpage={true}/>
				</div>
				<NavLink to="/matches" className={s.navLinkBtn}><ActionButton value="Показать дальше" /></NavLink>
			</div>
		
		
			{ isMobile && <MobileFooter />}
		</div>
	)
}

export default MainPage;