import React, { FC, useState } from 'react';
import s from './Selectors.module.scss';
import classNames from 'classnames'

import { FilterType as ForecastsFiltersType } from '../../../types/forecasts'
import { FilterType as ForecastersFiltersType } from '../../../types/users'



type SelectorsType = {
	selectors: Array<ForecastsFiltersType | ForecastersFiltersType>
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

	let activeSelector = selectors[0]
	if (isDropdown) {
		activeSelector = selectors.filter(selector => selector.active === true)[0]
		selectors = selectors.filter(selector => selector.active !== true)
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


	if (isDropdown) {
		return (
			<div className={classNames(s.selectors, {
				[s.dropdown]: isDropdown,
				[s.dropDownVisible]: dropdownVisible
			})} >
				<div onClick={toggleDropdownVisibility} className={s.activeSelector}>{activeSelector.visibleText}</div>
				<div className={s.selectorsList}>
					{renderSelectors}
				</div>
			</div>
		)
	} else {
		return (
			<div className={classNames(s.selectors, {
				[s.fillBg]: fillBg,
			})} >
				{renderSelectors}
			</div>
		)
	}


}
export default Selectors;