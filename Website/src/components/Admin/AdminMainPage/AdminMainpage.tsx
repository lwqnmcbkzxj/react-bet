import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './MainPage.module.scss'
import { Switch, Route } from 'react-router'

const AdminMainPage: FC = ({ ...props }) => {
	return (
		<div className={s.adminMainPage}>
			<div className={s.mainPageGroup}>
				<MainpageStatBlock text="Пользователей" value={27}/>
				<MainpageStatBlock text="Зарегистрировано за сегодня" value={0}/>
			</div>
			<div className={s.mainPageGroup}>
				<MainpageStatBlock text="Прогнозов" value={4803}/>
				<MainpageStatBlock text="Прогнозов за сегодня" value={0}/>
			</div>
			<div className={s.mainPageGroup}>
				<MainpageStatBlock text="Статей" value={27}/>
				<MainpageStatBlock text="Статей за сегодня" value={0}/>
			</div>
			<div className={s.mainPageGroup}>
				<MainpageStatBlock text="Новостей" value={27}/>
				<MainpageStatBlock text="Новостей за сегодня" value={8}/>
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
