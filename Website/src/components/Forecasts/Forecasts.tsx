import React, { FC } from 'react';
import s from './Forecasts.module.scss';
import '../../App.css'
import { ForecastType, ForecastFiltersType } from '../../types/types'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import Selectors from '../Common/Selectors/Selectors'
import ForeCastsList from './ForecastsList/ForecastsList'
import ActionButton from '../Common/ActionButton/ActionButton'

type ForecastsPropsType = {
	forecasts: Array<ForecastType>
	filters: ForecastFiltersType
	toggleFilter: (filterName: string, filtersBlockName: string) => void
}
const Forecasts: FC<ForecastsPropsType> = ({ forecasts, filters, toggleFilter, ...props }) => {
	return (
		<div className={s.forecastsPage}>
			<Breadcrumbs pathParams={['Главная', 'Прогнозы']} />
			<div className={s.forecastsHeader}>
				<h1 className='pageName'>Прогнозы</h1>

				<Selectors
					selectors={filters.subscribtionFilter}
					selectorsBlockName={'subscribtionFilter'}
					onChangeFunc={toggleFilter}
					fillBg={true}
				/>
			</div>
			<div className={s.filters}>
				<Selectors
					selectors={filters.sportTypeFilter}
					selectorsBlockName={'sportTypeFilter'}
					onChangeFunc={toggleFilter}
				/>
				<Selectors
					selectors={filters.timeFilter}
					selectorsBlockName={'timeFilter'}
					onChangeFunc={toggleFilter}
					isDropdown={true}
					
				/>
			</div>
			
			<ForeCastsList forecasts={forecasts} filters={filters} />
			<div className={s.actionBtnHoder}>
			<ActionButton value="Показать больше" func={() => { }} />
			</div>
		</div>
	)
}
export default Forecasts;