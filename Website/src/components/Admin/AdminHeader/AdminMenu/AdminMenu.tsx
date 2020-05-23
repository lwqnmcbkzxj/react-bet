import React, { FC, useEffect, useState } from 'react';
import s from './AdminMenu.module.scss';
import { NavLink } from 'react-router-dom';
import classNames from 'classnames'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

type LinkType = {
	link: string
	text: string
	dropdown?: Array<LinkType>
}

type HeaderPropsType = {

}

const AdminMenu: FC<HeaderPropsType> = ({ ...props }) => {
	let links = [
		{ link: "/", text: 'Панель состояния' },
		{ link: "/users", text: 'Пользователи' },
		{
			link: "", text: 'Спорт',
			dropdown: [
				{ link: "/forecasts", text: 'Прогнозы' },
				{ link: "/events", text: 'События' },
				{ link: "/championships", text: 'Чемпионаты' },
			]
		},
		{ link: "/bookmakers", text: 'Букмекеры' },
		{ link: "/menu", text: 'Меню' },
		{
			link: "", text: 'Еще',
			dropdown: [
				{ link: "/banners", text: 'Баннеры' },
				{ link: "/options", text: 'Опции' },
			]
		},
	]
	return (
		<div className={s.adminMenu}>
			{links.map(link => <AdminMenuElement link={link} />)}
		</div>
	)
}

export default AdminMenu;


type MenuElement = {
	link: LinkType
}

const AdminMenuElement: FC<MenuElement> = ({ link, ...props }) => {
	const dropdownRef = React.createRef<HTMLDivElement>()
	const [popupVisible, setPopupVisibility] = useState(false)

	const togglePopupVisibility = () => {
		setPopupVisibility(!popupVisible)
	}

	useEffect(() => {
		document.addEventListener('click', (e: any ) => {
			if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
				setPopupVisibility(false)
				e.stopPropagation()
			}
		})
		return () => {
			document.removeEventListener('click', () => { })
		};
	}, [popupVisible]);


	return (
		<div className={s.menuElement}>
			<NavLink
				exact to={`/admin${link.link}`}
				className={link.dropdown ? s.menuElementLink : ''}
				activeClassName={s.activeMenuElementlink}
				onClick={(e) => {
					if (link.dropdown) {
						togglePopupVisibility()
						e.preventDefault()
					}
				}}
			>
				{link.text}
				{link.dropdown && <FontAwesomeIcon className={classNames(s.dropDownArrow, { ["fa-rotate-180"]: popupVisible })} icon={faCaretDown} />}
			</NavLink>


			{popupVisible &&
				<div className={s.menuElementPopup} ref={dropdownRef}>
					{link.dropdown?.map(link =>
						<NavLink
							exact to={`/admin${link.link}`}
							className={s.menuElement}
							activeClassName={s.activeMenuElementlink}
							onClick={() => { togglePopupVisibility() }}
						>
							{link.text}
						</NavLink>
					)}

				</div>}
		</div>
	)
}