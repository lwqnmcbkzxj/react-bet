import React, { FC, useState } from 'react';
import s from './AddElement.module.scss';
import classNames from 'classnames'

import Breadcrumbs from '../../Common/Breadcrumbs/Breadcrumbs'

type ForecastsPropsType = {
	
}
const Forecasts: FC<ForecastsPropsType> = ({ ...props }) => {
	return (
		<div className={s.addElementPage}>
			<Breadcrumbs pathParams={['Главная', 'Прогнозы', 'Добавить экспресс']} />
			<div className="pageHeader">
				<h1 className="pageName">Добавить экспресс</h1>
			</div>

		</div>
	)
}
export default Forecasts;