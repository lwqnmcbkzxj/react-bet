import React, { FC, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { AppStateType, languageEnum } from '../../../../types/types'
import { changeLanguage } from '../../../../redux/app-reducer'
import s from '../Footer.module.scss';
import classNames from 'classnames'

type MenuFooterPropsType = { }
const getArrayFromEnum = (enumObject: any) => {
	var array = [];
	for(var key in enumObject){
		array.push(enumObject[key]);
	}
	return array;
 }

const LanguageSelector: FC<MenuFooterPropsType> = ({ ...props }) => {
	const dispatch = useDispatch();
	const currentLanguage = useSelector<AppStateType, languageEnum>(state => state.app.language)


	// Changing language
	const handleChangeLanguage = (language: languageEnum) => {
		toggleLanguageSelectorVisibility()
		dispatch(changeLanguage(language))
	}

	let languagesArr = getArrayFromEnum(languageEnum)

	let languages = languagesArr.map(language => {
		if (language !== currentLanguage) {
			return <p className={s.language} onClick={() => { handleChangeLanguage(language) }}>{language}</p>
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