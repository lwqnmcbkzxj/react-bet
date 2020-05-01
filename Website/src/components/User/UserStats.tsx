import React, { FC, useState, useEffect } from 'react';
import s from './User.module.scss';
import '../../App.scss'
import classNames from 'classnames'
import StatsChart from './StatsChart';

import { FiltersObjectType, timeFilterEnum, FilterNames } from '../../types/filters'
type UserStatsPropsType = {
	filters: FiltersObjectType
	wins: number
	loses: number
	returns: number
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void

const UserStats = ({ ...props }) => {
	return (
		<div>
			<StatsChart
				wins={props.wins}
				loses={props.loses}
				returns={props.returns}
			/>

			<div className={s.stats}>
				<div className={s.roi}>
					<p>ROI</p>
					<p className={s.splitter}></p>
					<p className={classNames({ [s.positive]: true, [s.negative]: false })}>128.5%</p>
				</div>
				<div>
					<p>Средняя Прибыль</p>
					<p className={s.splitter}></p>
					<p>{(16778).toLocaleString()}</p>
				</div>
				<div className={s.successPercent}>
					<p>Проходимость</p>
					<p className={s.splitter}></p>
					<p className={classNames({ [s.positive]: true, [s.negative]: false })}>65%</p>
				</div>
				<div>
					<p>Средний коэффициент</p>
					<p className={s.splitter}></p>
					<p>1.78</p>
				</div>
			</div>

		</div>

	)
}
export default UserStats;