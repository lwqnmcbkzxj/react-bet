import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType } from '../../../../types/types'
import { languageEnum, LanguageType } from '../../../../types/filters'
import { changeLanguage } from '../../../../redux/app-reducer'
import s from '../Footer.module.scss';
import classNames from 'classnames'

import { getArrayFromEnum } from '../../../../utils/enumToArray'
import { getActiveFilter } from '../../../../utils/getActiveFilter';
type MenuFooterPropsType = { }


const LanguageSelector: FC<MenuFooterPropsType> = ({ ...props }) => {
	const dispatch = useDispatch();
	const languagesState = useSelector<AppStateType, Array<LanguageType>>(state => state.app.languages)
	debugger
	let currentLanguage = languagesState.filter(filter => filter.active === true)[0].visibleText

	// Changing language
	const handleChangeLanguage = (language: languageEnum) => {
		toggleLanguageSelectorVisibility()
		dispatch(changeLanguage(language))
	}


	let languages = languagesState.map(language => {
		if (language.visibleText !== currentLanguage) {
			return <p className={s.language} onClick={() => { handleChangeLanguage(language.name) }}>{language.visibleText}</p>
		}
	})

	// Selector togging
	const [languageSelectorVisible, setLanguageVisibility] = useState(false)

	const toggleLanguageSelectorVisibility = () => {
		setLanguageVisibility(!languageSelectorVisible)
	}

	return (
		<div className={s.languageSelector}>
			<p onClick={toggleLanguageSelectorVisibility}>Язык: {currentLanguage}</p>
			<div className={classNames(s.languagesList, { [s.active]: languageSelectorVisible })}>
				{languages}
			</div>
		</div>
	)
}

export default LanguageSelector;