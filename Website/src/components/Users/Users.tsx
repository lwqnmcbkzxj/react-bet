import React, { FC, useState } from 'react';
import s from './Users.module.scss';
import '../../App.scss'
import classNames from 'classnames'
import { UsersFiltersType, UserType } from '../../types/users'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import Selectors from '../Common/Selectors/Selectors'
import UsersList from './UsersList'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'


type UsersPropsType = {
	users: Array<UserType>
	filters: UsersFiltersType
	toggleFilter: (filterName: string, filtersBlockName: string) => void

}
const Users: FC<UsersPropsType> = ({ users, filters, toggleFilter, ...props }) => {
	const [filtersVisible, setFiltersVisible] = useState(false)

	return (
		<div className={s.forecastersPage}>
			<Breadcrumbs pathParams={['Главная', 'Рейтинг прогнозистов']} />
			<div className="pageHeader">

				<div className="pageHeaderOptions">
					<h1 className="pageName">Рейтинг прогнозистов</h1>
					<button className={classNames("showSelectorsBtn", { "active": filtersVisible })} onClick={() => { setFiltersVisible(!filtersVisible) }}><FontAwesomeIcon icon={faCog} /></button>
				</div>


				<Selectors
					selectors={filters.timeFilter}
					selectorsBlockName={'timeFilter'}
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
			</div>

			<UsersList users={users} />
		</div>
	)
}
export default Users;