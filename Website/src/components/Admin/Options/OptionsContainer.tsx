import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Admin.module.scss'

import { AppStateType } from '../../../types/types'
import { OptionsType } from '../../../types/types'
import { editOptions } from '../../../redux/admin-reducer'
import OptionsForm from './OptionsForm'
import { withRouter, RouteComponentProps } from 'react-router'


const UsersContainer: FC<RouteComponentProps> = ({ ...props }) => {
	const dispatch = useDispatch()
	// const users = useSelector<AppStateType, Array<UserType>>(state => state.admin.users.users)
	const options = useSelector<AppStateType, OptionsType>(state => state.app.options)

	const changeOptionsDispatch = async (optionsObject: OptionsType) => {
		await dispatch(editOptions(optionsObject))
	}


	return (
		<OptionsForm initialValues={options} onSubmitFunc={changeOptionsDispatch}/>
	)
}

export default withRouter(UsersContainer);