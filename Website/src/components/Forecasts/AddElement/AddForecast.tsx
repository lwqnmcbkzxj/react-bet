import React, { FC, useState } from 'react';
import s from './AddElement.module.scss';
import classNames from 'classnames'
import { timeMask, dateMask } from '../../../utils/formValidation';
import { reduxForm, InjectedFormProps, SubmissionError } from 'redux-form'

import Breadcrumbs from '../../Common/Breadcrumbs/Breadcrumbs'
import { createField, Input, DropDownSelect } from '../../Common/FormComponents/FormComponents';
import ActionButton from '../../Common/ActionButton/ActionButton'
import InfoTable from './AddElementFormElements/InfoTable'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


type AddElementPropsType = {

}

type AddElementFormValuesType = {
	time: string
	date: string
}

const AddElement: FC<AddElementPropsType> = ({ ...props }) => {
	const handleAdd = () => {

	}
	const findForecast = () => {

	}
	return (
		<div className={s.addElementPage}>
			<Breadcrumbs pathParams={['Главная', 'Прогнозы', 'Добавить прогноз']} />
			<div className="pageHeader">
				<h1 className="pageName">Добавить прогноз</h1>
			</div>

			<div className={s.searchBlock}>
				<input type="text" placeholder="Поиск прогноза..." />
				<button onClick={findForecast}><FontAwesomeIcon icon={faSearch} className={s.searcBtn} /></button>
			</div>
			<ReduxAddElementForm onSubmit={handleAdd} />
		</div>
	)
}





const AddElementForm: FC<InjectedFormProps<AddElementFormValuesType>> = (props: any) => {
	let sports = ['Футбол', 'Теннис', 'Хоккей', 'Другое']
	let bookmakers = ['1XСТАВКА', 'BETCITY', 'ЛигаСтавок']
	let champinships = ['Чемпионат-1', 'Чемпионат-2', 'Чемпионат-3']
	let teams = ['Virtus Pro', 'Navi', 'G2']


	return (
		<form onSubmit={props.handleSubmit}>

			<div className={s.groupedInputs}>
				{createField('bookmaker', DropDownSelect, 'Букмекерская контора', { elements: bookmakers, listName: 'bookmakers' })}
				{createField('sport', DropDownSelect, 'Вид спорта', { elements: sports })}
			</div>


			{createField('championship', DropDownSelect, 'Чемпионат', { elements: champinships })}
			{createField('teams', DropDownSelect, 'Команды', { elements: teams })}
			<div className={s.groupedInputs}>
				{createField('date', Input, 'Дата события', { mask: dateMask })}
				{createField('time', Input, 'Время события', { mask: timeMask })}
			</div>

			<InfoTable info={[]} />

			<div className={s.forecastDecision}>
				

			</div>

			<div className={s.btnHolder}><ActionButton value="Добавить прогноз" /></div>
		</form>
	);
}
const ReduxAddElementForm = reduxForm<AddElementFormValuesType>({ form: 'add-element' })(AddElementForm)



export default AddElement;
