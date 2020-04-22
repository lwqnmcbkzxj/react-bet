import React, { FC, useState } from 'react';
import s from './Forecasts.module.scss';
import classNames from 'classnames'
import '../../App.scss'
import { ForecastType, ForecastsFiltersType } from '../../types/forecasts'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import Selectors from '../Common/Selectors/Selectors'
import ForeCastsList from './ForecastsList/ForecastsList'
import ActionButton from '../Common/ActionButton/ActionButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'


type ForecastsPropsType = {
	forecasts: Array<ForecastType>
	filters: ForecastsFiltersType
	toggleFilter: (filterName: string, filtersBlockName: string) => void
}
const Forecasts: FC<ForecastsPropsType> = ({ forecasts, filters, toggleFilter, ...props }) => {

	const [filtersVisible, setFiltersVisible] = useState(false)

	return (
		<div className={s.forecastsPage}>
			<Breadcrumbs pathParams={['Главная', 'Прогнозы']} />
			<div className="pageHeader">
				<div className="pageHeaderOptions">
					<h1 className="pageName">Прогнозы</h1>
					<button className={classNames("showSelectorsBtn", { "active": filtersVisible })} onClick={() => { setFiltersVisible(!filtersVisible) }}><FontAwesomeIcon icon={faCog} /></button>
				</div>

				<Selectors
					selectors={filters.subscribtionFilter}
					selectorsBlockName={'subscribtionFilter'}
					onChangeFunc={toggleFilter}
					fillBg={true}
				/>


			</div>
			<div className={classNames("filters", { "active": filtersVisible })}>
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

			<ForeCastsList forecasts={forecasts}/>
			<div className={s.actionBtnHoder}>

				{forecasts.length > 0 && <ActionButton value="Показать больше" func={() => { }} />}

			</div>
		</div>
	)
}
export default Forecasts;