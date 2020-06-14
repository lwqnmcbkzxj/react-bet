import React, { FC, useState } from 'react';
import s from './Forecasts.module.scss';
import classNames from 'classnames'
// import '../../assets/scss/CommonStyle.scss'

import { ForecastType } from '../../types/forecasts'
import { FiltersObjectType, FilterNames } from '../../types/filters'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import Selectors from '../Common/Selectors/Selectors'
import ForeCastsList from './ForecastsList/ForecastsList'
import ActionButton from '../Common/ActionButton/ActionButton'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'
import { setPaginationPage } from '../../redux/app-reducer';
import { useDispatch } from 'react-redux';


type ForecastsPropsType = {
	forecasts: Array<ForecastType>
	filters: FiltersObjectType
	toggleFilter: (filterName: FilterNames, filtersBlockName: string) => void
	moreButtonVisible: boolean
}
const Forecasts: FC<ForecastsPropsType> = ({ forecasts, filters, toggleFilter, moreButtonVisible, ...props }) => {
	const dispatch = useDispatch()

	const [filtersVisible, setFiltersVisible] = useState(false)

	return (
		<div className={s.forecastsPage}>
			<Breadcrumbs pathParams={[
				{ text: 'Главная', link: '' },
				{ text: 'Прогнозы', link: '/forecasts' }]} />
			<div className="pageHeader">
				<div className="pageHeaderOptions">
					<h1 className="pageName">Прогнозы</h1>
					<button className={classNames("showSelectorsBtn", { "active": filtersVisible })} onClick={() => { setFiltersVisible(!filtersVisible) }}><FontAwesomeIcon icon={faCog} /></button>
				</div>

				<Selectors
					selectors={filters.subscriptionFilter}
					selectorsBlockName={'subscriptionFilter'}
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


			<ForeCastsList forecasts={forecasts} />

			{moreButtonVisible && <div className={s.actionBtnHoder}>
				<ActionButton value="Показать больше" func={() => { dispatch(setPaginationPage(-1, 'forecasts')) }} />
			</div>}
		</div>
	)
}
export default Forecasts;