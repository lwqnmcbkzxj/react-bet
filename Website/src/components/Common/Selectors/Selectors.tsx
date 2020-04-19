import React, { FC, useState } from 'react';
import s from './Selectors.module.scss';
import classNames from 'classnames'

import { FilterType } from '../../../types/types'



type SelectorsType = {
	selectors: Array<FilterType>
	selectorsBlockName: string
	onChangeFunc: (filterName: string, filtersBlockName: string) => void
	isDropdown?: boolean
	fillBg?: boolean
}
const Selectors: FC<SelectorsType> = ({ selectors, selectorsBlockName, onChangeFunc, isDropdown = false, fillBg = false, ...props }) => {
	const handleChange = (filterName: string, isActive: boolean) => {
		if (!isActive)
			onChangeFunc(filterName, selectorsBlockName)
	}
	const [dropdownVisible, setDropdownVisible] = useState(false)
	const toggleDropdownVisibility = () => {
		if (isDropdown) setDropdownVisible(!dropdownVisible)
	}

	if (isDropdown) {		
		selectors = selectors.sort(function sortByIndex(a, b) { return a.index - b.index })
		selectors = selectors.sort(selector => {
			if (selector.active) return -1;
			else return 1;
		})
	}



	let renderSelectors = [] as Array<any>
	selectors.map((selector, counter) => {
		let selctorName = `${selectorsBlockName}-${counter}`;

		renderSelectors.push(
			<div className={s.selector} data-active={selector.active}>
				<input
					type="radio"
					checked={selector.active}
					name={selectorsBlockName}
					id={selctorName}
					onChange={() => { handleChange(selector.name, selector.active) }} />

				<label htmlFor={selctorName} key={counter} onClick={toggleDropdownVisibility}>
					{selector.visibleText}
				</label>

			</div>
		)
	})

	return (
		<div className={classNames(s.selectors, {
			[s.fillBg]: fillBg,
			[s.dropdown]: isDropdown,
			[s.dropDownVisible]: dropdownVisible
		})} >
			{renderSelectors}
		</div>
	)
}
export default Selectors;