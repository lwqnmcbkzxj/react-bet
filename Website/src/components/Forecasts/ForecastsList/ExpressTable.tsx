import React, { FC } from 'react';
import s from './ForecastsList.module.scss';
import classNames from 'classnames'
import { ForecastType, ForecastStatusEnum } from '../../../types/forecasts'

import { NavLink, Link } from 'react-router-dom';
import { formatStartDate } from '../../../utils/formatDate'


type ExpressTablePropsType = {
	forecast: ForecastType
}

const ExpressTable: FC<ExpressTablePropsType> = ({ forecast, ...props }) => {
	

	
	
	
	
	let expressData = [
		{ id: 1, title: 'Шальке-04 - Байер', bet_type: 'П1', coefficient: 1.48, championship_id: 1, championship_name: 'Футбол/Германия, 2-я бундеслига' },
		{ id: 2, title: 'Унион (Берлин) - Падерборн', bet_type: 'П2', coefficient: 1.48, championship_id: 2, championship_name: 'Футбол/Германия, 1-я бундеслига' },
		{ id: 3, title: 'Вердер - Бавария', bet_type: 'Тотал 1.3', coefficient: 1.48, championship_id: 1, championship_name: 'Футбол/Германия, 2-я бундеслига' },
	]
	expressData = expressData.sort((prev, next) => prev.championship_id - next.championship_id)

	return (
		<div className={s.expressTable}>
			{expressData.map((data, counter = 0) =>

				<>
					{(counter === 0 || expressData[counter - 1].championship_id !== data.championship_id) &&
						<div className={s.tableHeader}>
							<div className={s.championshipName}>{data.championship_name}</div>
						</div>}
					
						<div className={s.tableRow}>
							<div className={s.position}>{counter + 1}</div>
							<div className={s.eventTitle}><Link to={`matches/${data.id}`}>{data.title}</Link></div>
							<div><span className={s.profitStat}>{data.bet_type}</span></div>
							<div><span className={s.profitStat}>{data.coefficient}</span></div>

						</div>
				</>
			)}
		</div>
	)
}
export default ExpressTable;