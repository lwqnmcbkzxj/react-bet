import React, { FC } from 'react';
import s from './Users.module.scss';
import '../../App.scss'
import { UsersFiltersType, UserType } from '../../types/users'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'

import Selectors from '../Common/Selectors/Selectors'
import UsersList from './UsersList'

type UsersPropsType = {
	users: Array<UserType>
	filters: UsersFiltersType
	toggleFilter: (filterName: string, filtersBlockName: string) => void

}
const Users: FC<UsersPropsType> = ({ users, filters, toggleFilter, ...props }) => {
	return (
		<div className={s.forecastersPage}>
			<Breadcrumbs pathParams={['Главная', 'Рейтинг прогнозистов']} />
			<div className="pageHeader">
				<h1 className="pageName">Рейтинг прогнозистов</h1>
				<Selectors
					selectors={filters.timeFilter}
					selectorsBlockName={'timeFilter'}
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
			</div>

			<UsersList users={users} />
		</div>
	)
}
export default Users;