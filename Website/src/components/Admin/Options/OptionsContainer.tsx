import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Admin.module.scss'

import { AppStateType } from '../../../types/types'
import { OptionsType } from './types'

import OptionsForm from './OptionsForm'


const UsersContainer: FC = ({ ...props }) => {
	const dispatch = useDispatch()
	// const users = useSelector<AppStateType, Array<UserType>>(state => state.admin.users.users)

	const changeOptions = (optionsObject: OptionsType) => {
	}


	return (
		<OptionsForm initialValues={{}} onSubmitFunc={changeOptions}/>
	)
}

export default UsersContainer;