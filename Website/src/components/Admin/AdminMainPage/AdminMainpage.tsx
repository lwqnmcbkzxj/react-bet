import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './MainPage.module.scss'
import { Switch, Route } from 'react-router'
import { DashboardType } from '../../../types/admin'

type PropsType = {
	dashboard: DashboardType
}

const AdminMainPage: FC<PropsType> = ({ dashboard, ...props }) => {
	return (
		<div className={s.adminMainPage}>
			<div className={s.mainPageGroup}>
				<MainpageStatBlock text="Пользователей" value={dashboard.users_count}/>
				<MainpageStatBlock text="Зарегистрировано за сегодня" value={dashboard.users_count_today}/>
			</div>
			<div className={s.mainPageGroup}>
				<MainpageStatBlock text="Прогнозов" value={dashboard.forecasts_count}/>
				<MainpageStatBlock text="Прогнозов за сегодня" value={dashboard.forecasts_count_today}/>
			</div>
			<div className={s.mainPageGroup}>
				<MainpageStatBlock text="Статей" value={dashboard.posts_count}/>
				<MainpageStatBlock text="Статей за сегодня" value={dashboard.posts_count_today}/>
			</div>
			<div className={s.mainPageGroup}>
				<MainpageStatBlock text="Новостей" value={dashboard.news_count}/>
				<MainpageStatBlock text="Новостей за сегодня" value={dashboard.news_count_today}/>
			</div>
		</div>
	)
}

export default AdminMainPage;


type StatBlockType = {
	text: string
	value: number
}
const MainpageStatBlock: FC<StatBlockType> = ({ text, value, ...props }) => {
	return (
		<div className={s.mainPageBlock}>
			{text}: {value}
		</div>
	)
}
