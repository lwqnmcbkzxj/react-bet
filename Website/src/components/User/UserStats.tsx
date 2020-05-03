import React, { FC, useState, useEffect } from 'react';
import s from './User.module.scss';
import classNames from 'classnames'
import StatsChart from './StatsChart';
import Selectors from '../Common/Selectors/Selectors'

import { FiltersObjectType, timeFilterEnum, FilterNames } from '../../types/filters'
type UserStatsPropsType = {
	filters: FiltersObjectType
	wins: number
	loses: number
	returns: number
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void

}

const UserStats: FC<UserStatsPropsType> = ({ filters, toggleFilter, ...props }) => {
	return (
		<div>


			<div className={s.chartBlock}>
				<StatsChart
					wins={props.wins}
					loses={props.loses}
					returns={props.returns}
				/>
				<div className={s.rightBlock}>
					<Selectors
						selectors={filters.timeFilter}
						selectorsBlockName={'timeFilter'}
						onChangeFunc={toggleFilter}
						fillBg={true}
					/>


					<div className={s.customLegend}>
						<div className={s.legendBlock}>
							<div className={s.color + ' ' + s['color-0F971D']}></div>
							<p>Ставка Выиграла</p>
						</div>
						<div className={s.legendBlock}>
							<div className={s.color + ' ' + s['color-AA0F0F']}></div>
							<p>Ставка Проиграла</p>
						</div>
						<div className={s.legendBlock}>
							<div className={s.color + ' ' + s['color-0F19AA']}></div>
							<p>Возврат</p>
						</div>
					</div>
				</div>
			</div>

			<div className={s.stats}>
				<div className={s.roi}>
					<p>ROI</p>
					<p className={s.splitter}></p>
					<p className={classNames({ [s.positive]: true, [s.negative]: false })}>128.5%</p>
				</div>
				<div>
					<p>Чистая Прибыль</p>
					<p className={s.splitter}></p>
					<p className={classNames({ [s.positive]: true, [s.negative]: false })}>28%</p>
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