import React, { FC, useState, useEffect, Children } from 'react'
import s from '../../AdminTablePage.module.scss'
import classNames from 'classnames'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
type PaginatorProps = {
	pagesPerPage: number
	handleChangePagesPerPage: (pagesPerPage: number) => void
}


export const ChangePerPageCount: FC<PaginatorProps> = ({ pagesPerPage, handleChangePagesPerPage, ...props }) => {
	const [values, setValues] = useState([10, 25, 50])
	const [dropdownVisible, setDropdownVisible] = useState(false)

	const toggleDropdownVisibility = () => {
		setDropdownVisible(!dropdownVisible)
	}

	let activeElement = values.filter(value => value === pagesPerPage)[0]
	let anotherValues = values.filter(value => value !== pagesPerPage)
		.map(value =>
			<div className={s.element} onClick={() => {
				handleChangePagesPerPage(value)
			}}>{value}</div>
		)

	return (
		<div className={s.countPerPageToggler} onClick={toggleDropdownVisibility}>
			<div className={classNames(s.activeElement, s.element)}>
				{activeElement}
				<FontAwesomeIcon className={classNames(s.dropDownArrow, { ["fa-rotate-180"]: dropdownVisible })} icon={faCaretDown} />
			</div>

			

			{dropdownVisible && <div className={s.countPerPageDropdown}>
				{anotherValues}
			</div>}

		</div>
	);
}
