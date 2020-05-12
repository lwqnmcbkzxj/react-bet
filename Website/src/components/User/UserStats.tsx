import React, { FC, useState, useEffect } from 'react';
import s from './User.module.scss';
import classNames from 'classnames'
import StatsChart from './StatsChart';
import Selectors from '../Common/Selectors/Selectors'

import { FiltersObjectType, timeFilterEnum, FilterNames } from '../../types/filters'
type UserStatsPropsType = {
	filters: FiltersObjectType
	stats: {
		count_win: number
		count_loss: number
		count_back: number
		roi: string
		average_cofficient: string
		pure_profit: string
	}
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void

}

const UserStats: FC<UserStatsPropsType> = ({ stats, filters, toggleFilter, ...props }) => {
	return (
		<div>
			<div className={s.chartBlock}>
				<StatsChart
					wins={stats.count_win}
					loses={stats.count_loss}
					returns={stats.count_back}
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
					<p className={classNames({ [s.positive]: true, [s.negative]: false })}>{(+stats.roi).toFixed(2)}%</p>
				</div>
				<div>
					<p>Чистая Прибыль</p>
					<p className={s.splitter}></p>
					<p className={classNames({ [s.positive]: true, [s.negative]: false })}>{(+stats.pure_profit).toFixed(2)}</p>
				</div>
				<div className={s.successPercent}>
					<p>Проходимость</p>
					<p className={s.splitter}></p>
					<p className={classNames({ [s.positive]: true, [s.negative]: false })}>65%</p>
				</div>
				<div>
					<p>Средний коэффициент</p>
					<p className={s.splitter}></p>
					<p>{(+stats.average_cofficient).toFixed(2)}</p>
				</div>
			</div>

		</div>

	)
}
export default UserStats;