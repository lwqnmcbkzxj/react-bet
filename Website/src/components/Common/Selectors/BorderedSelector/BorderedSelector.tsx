import React, { FC, useState, useEffect } from 'react';
import s from './BorderedSelector.module.scss';
import classNames from 'classnames'

import { useDispatch } from 'react-redux';

export enum selectors {
	forecasts = 'forecasts',
	statistics = 'statistics',
	favourites = 'favourites',
}

type SelectorsPropsType = {
	changeVisibleTab: (tabName: string) => void


	listName: string
	selectors: Array<{
		name: string
		text: string
		condition?: boolean
	}>
	initialValue: string
}


const BorderedSelectors: FC<SelectorsPropsType> = ({ changeVisibleTab, listName, selectors, initialValue = "", ...props }) => {
	const dispatch = useDispatch()

	const [visibleTab, setVisibleTab] = useState(initialValue)
	const handleTabChange = (tabName: string) => {
		setVisibleTab(tabName)
		changeVisibleTab(tabName)
	}


	return (
		<div className={s.selectorsList}>
			{selectors.map(selector =>
				selector.condition !== false && <div className={s.selector}>
					<input
						type="radio"
						name={listName}
						checked={visibleTab === selector.name}
						id={selector.name}
						onChange={() => { handleTabChange(selector.name) }} />
					<label htmlFor={selector.name}>{selector.text}</label>
				</div>
			)}
		</div>
	)
}
export default BorderedSelectors;