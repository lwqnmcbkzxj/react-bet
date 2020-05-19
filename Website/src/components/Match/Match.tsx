import React, { FC, useState, useEffect } from 'react';
import s from './Match.module.scss';
import classNames from 'classnames'
import { } from '../../types/forecasts'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'
import BetsList from './BetsList'
import { MatchType } from '../../types/matches';
import { AppStateType, SportType } from '../../types/types'
import CommentsBlock from '../Common/CommentsBlock/CommentsBlock';
import MatchChart from './MatchChart'
import { getSportImg } from '../../utils/getSportImg';
import GoBackBlock from '../Common/GoBackBlock/GoBackBlock';
import { faShareAlt } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from "react-redux"
import { MatchStatsPlaceHolder, MatchChartPlaceholder } from '../../components/Common/Placeholders/MatchesPlaceholder'
import moment from 'moment'

import { getDateDay, getDateTime } from '../Matches/MatchesList'

type MatchPropsType = {
	match: MatchType
}
const Match: FC<MatchPropsType> = ({ match, ...props }) => {
	const isFetching = useSelector<AppStateType, boolean>(state => state.matches.isFetching)
	let sports = useSelector<AppStateType, Array<SportType>>(state => state.app.sports)
	let sportImg = getSportImg(1, sports)			
	useEffect(() => {
		sportImg = getSportImg(1, sports)		
	}, [sports]);


	const [startTime, setStartTime] = useState("")

	let event_start = "2020-06-20 06:00:00"
	useEffect(() => {
		// if (match.event_id) {
		let matchStart = Date.parse(event_start)
		let timer1 = setTimeout(() => {
			let timestamp = ((matchStart - Date.now()) / 1000)

			if (timestamp > 0) {
				let days = Math.floor(timestamp / 60 / 60 / 24) + 'д ';
				let hours = Math.floor((timestamp / 60 / 60) % 24) + 'ч ';
				let minutes = Math.floor((timestamp / 60) % 60) + 'м ';
				let seconds = Math.floor(timestamp % 60) + 'с ';

				let resultStr = days + hours + minutes + seconds

				setStartTime(resultStr)
			} else {
				setStartTime("0ч 0м 0с")
			}
		}, 1000)
		return () => {
			clearTimeout(timer1)
		};
		// }
	}, [Date.now()]);
	return (
		<div className={s.match}>
			<GoBackBlock
				link={'matches'}
				linkText={'Топ матчи'}
				icon={faShareAlt}
				func={() => {navigator.clipboard.writeText(window.location.href)}}
			/>
			<Breadcrumbs pathParams={['Главная', 'Лучшие матчи', 'Mousesports - Virtus.pro']} />

			{isFetching ? <MatchStatsPlaceHolder /> :
				<div className={s.matchStats}>
					<div className={s.team}>
						<img src={false ? 'abcc' : sportImg} alt="" />
						<div className={s.teamName}>Mousesports</div>
						{/* <div className={s.teamName}>{match.team_1.name}</div> */}
					</div>
					<div className={s.statsInfo}>
						<div className={s.hours}>19:00</div>
						<div className={s.date}>26/07/2020</div>
						<div className={s.tournament}>LPL Pro League Season 4</div>
						<div className={s.timeBeforeStart}>{startTime}</div>

						{/* <div className={s.hours}>{getDateTime(match.event_start)}</div>
						<div className={s.date}>{getDateDay(match.event_start)}</div>
						<div className={s.tournament}>{match.championship_data.championship}</div>
						<div className={s.timeBeforeStart}>1ч : 35м : 34с</div> */}
					</div>
					<div className={s.team}>
						<img src={false ? 'abcc' : sportImg} alt="" />
						<div className={s.teamName}>Mousesports</div>
						{/* <div className={s.teamName}>{match.team_2.name}</div> */}
					</div>
				</div>}


			<div className={s.betsBlock}>
				<div className={s.betsTitle}>Топ ставки</div>
				<div className={s.betsChart}>
					{isFetching ? <MatchChartPlaceholder /> : <MatchChart />}
				</div>
				<div className={s.betsTable}>
					<BetsList bets={[{}, {}, {}, {}, {}]} />
				</div>
			</div>

			<CommentsBlock comments={[{}]} />
		</div>
	)
}
export default Match;