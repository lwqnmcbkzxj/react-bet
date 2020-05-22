import React, { FC, useState } from 'react';
import s from './AddElement.module.scss';
import classNames from 'classnames'
import { timeMask, dateMask, percentMask, numberMask } from '../../../utils/formValidation';
import { reduxForm, InjectedFormProps, SubmissionError, Field } from 'redux-form'

import Breadcrumbs from '../../Common/Breadcrumbs/Breadcrumbs'
import { createField, Input, Textarea, Number, DropDownSelect, createDropdown } from '../../Common/FormComponents/FormComponents';
import ActionButton from '../../Common/ActionButton/ActionButton'
import InfoTable from './AddElementFormElements/InfoTable'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'


type AddElementPropsType = {
	userBalance: number
}

const AddElement: FC<AddElementPropsType> = ({ userBalance, ...props }) => {
	const dispatch = useDispatch()
	const handleAdd = (data: any) => {
		console.log(data)
	}
	const findForecast = () => {

	}
	const [currentDecision, setCurrentDecision] = useState({ bookmakerId: 0, type: '', value: 0 })

	const handleChangeDecision = (bookmakerId: number, type: string, value: number) => {
		if (currentDecision.type !== type || bookmakerId !== currentDecision.bookmakerId) {
			setCurrentDecision({ bookmakerId, type, value })
		}
	}

	const [betValue, setBetValue] = useState("0")
	const [betPercent, setBetPercent] = useState("0")
	const calculateBet = (value: number) => {
		let betPercentValue = ((value / userBalance) * 100).toFixed(2)
		if (+betPercentValue <= 5 && +betPercentValue >= 0) {
			setBetPercent(betPercentValue)
			setBetValue(value.toFixed(0))
		}
	}
	const calculatePercent = (percent: number) => {
		if (percent <= 5 && percent >= 0) {
			let betValue = (percent * userBalance / 100).toFixed(0)

			setBetPercent(percent.toFixed(2))
			setBetValue(betValue)
		}
	}

	return (
		<div className={s.addElementPage}>
			<Breadcrumbs pathParams={['Главная', 'Прогнозы', 'Добавить прогноз']} />
			<div className="pageHeader">
				<h1 className="pageName">Добавить прогноз</h1>
			</div>

			<div className={s.searchBlock}>
				<input type="text" placeholder="Поиск прогноза..." />
				<button onClick={findForecast}><FontAwesomeIcon icon={faSearch} className={s.searchBtn} /></button>
			</div>

			<ReduxAddElementForm
				onSubmit={handleAdd}
				currentDecision={currentDecision}
				initialValues={{
					'add-forecast-type': currentDecision.type,
					'add-forecast-coeff-value': currentDecision.value,
					'add-forecast-bet-percent': betPercent,
					'add-forecast-bet-value': betValue,
					bookmaker: '1XСТАВКА',
					sport: 'Футбол',
					championship: 'Чемпионат-1',
					team: 'Virtus Pro'

				}}
				changeDecision={handleChangeDecision}

				calculateBet={calculateBet}
				calculatePercent={calculatePercent}
			/>

		</div>
	)
}


type FormType = {
	currentDecision: any
	changeDecision: (bookmakerId: number, type: string, value: number) => void
	calculateBet: (value: number) => void
	calculatePercent: (percent: number) => void
}


const AddElementForm: FC<FormType & InjectedFormProps<{}, FormType>> = (props: any) => {
	let sports = ['Футбол', 'Теннис', 'Хоккей', 'Другое'];
	let bookmakers = ['1XСТАВКА', 'BETCITY', 'ЛигаСтавок'];
	let champinships = ['Чемпионат-1', 'Чемпионат-2', 'Чемпионат-3'];
	let teams = ['Virtus Pro', 'Navi', 'G2'];
 

	return (
		<form onSubmit={props.handleSubmit}>

			<div className={s.groupedInputs}>
				{createDropdown('bookmaker', 'Букмекерская контора', { elements: bookmakers } ) }
				{createDropdown('sport', 'Вид спорта', { elements: sports } ) }
			</div>
			{createDropdown('championship', 'Чемпионат', { elements: champinships } ) }
			{createDropdown('team', 'Команды', { elements: teams } ) }
			
			<div className={s.groupedInputs}>
				{createField('date', Input, 'Дата события', { mask: dateMask })}
				{createField('time', Input, 'Время события', { mask: timeMask })}
			</div>

			<InfoTable info={[]} name='add-forecast-type' currentDecision={props.currentDecision} changeDecision={props.changeDecision} />

			<div className={s.forecastDecision}>
				{createField("add-forecast-coeff-value", Number, 'Коэф. конторы', { readOnly: true })}
				{createField("add-forecast-type", Input, 'Исход')}
				{createField("add-forecast-bet-percent", Number, 'Ставка %', { handleChange: props.calculatePercent, step: "0.1" })}
				{createField("add-forecast-bet-value", Number, 'Ставка', { handleChange: props.calculateBet, step: "1" })}
			</div>

			{createField("descrition", Textarea, "Описание прогноза", { type: 'textarea' })}

			<Field name="sport" component="input"/>
			<div className={s.btnHolder}><ActionButton value="Добавить прогноз" /></div>
		</form>
	);
}




let ReduxAddElementForm = reduxForm<{}, FormType>({ form: 'add-element', enableReinitialize: true })(AddElementForm)


export default AddElement;
