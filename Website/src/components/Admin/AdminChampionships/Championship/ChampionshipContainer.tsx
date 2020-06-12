import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType, SportType } from '../../../../types/types'
import { ChampionshipType } from '../../../../types/admin'
import ChampionshipForm from './ChampionshipForm'

import { getAdminChampionshipFromServer, addChampionship, editChampionship } from '../../../../redux/admin-reducer'
import { formatDateSimply } from '../../../../utils/formatDate'
import { getSportsFromServer } from '../../../../redux/app-reducer'

interface Params {
	championshipId: string;
}





interface ChampionshipProps extends RouteComponentProps<Params> { }

const ChampionshipContainer: FC<ChampionshipProps> = ({ ...props }) => {
	const championship = useSelector<AppStateType, ChampionshipType>(state => state.admin.championships.currentChampionship)
	const sports = useSelector<AppStateType, Array<SportType>>(state => state.app.sports)
	const dispatch = useDispatch()

	let championshipId = props.match.params.championshipId;
	useEffect(() => {
		if (championshipId) {
			dispatch(getAdminChampionshipFromServer(+championshipId))
		}
		dispatch(getSportsFromServer())
	}, []);


	const addChampionshipDispatch = async (formData: ChampionshipType) => {
		await dispatch(addChampionship(formData))

		props.history.push('/admin/championships');
	}
	const editChampionshipDispatch = async (formData: ChampionshipType) => {
		await dispatch(editChampionship(+championshipId, formData))

		props.history.push('/admin/championships');
	}


	let initialValues = {} as any
	let onSubmitFunc
	let breadcrumbsObj
	let buttonText = ""
	if (championshipId) {
		initialValues = { ...championship }
		onSubmitFunc = editChampionshipDispatch
		breadcrumbsObj = { text: 'Изменение чемпионата', link: `/admin/championships/${championshipId}/edit` }
		buttonText = "Изменить чемпионат"
	} else {
		onSubmitFunc = addChampionshipDispatch

		initialValues = {
			id: '',
			sport_id: '',
			name: ''
		}
		breadcrumbsObj = { text: 'Добавление чемпионата', link: '/admin/championships/add' }
		buttonText = "Добавить чемпионат"
	}


	let sportsArr = sports
		.filter(sport => sport.id !== 0)
		.map(sport => {
			return {
				id: sport.id,
				value: sport.visibleText
			}
		})

	return (
		<ChampionshipForm
			initialValues={initialValues}
			onSubmitFunc={onSubmitFunc}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'События', link: '/admin/championships' },
				{ ...breadcrumbsObj }
			]}
			buttonText={buttonText}
			dropdownLists={{
				sports: sportsArr
			}}
		/>
	)
}

export default withRouter(ChampionshipContainer);