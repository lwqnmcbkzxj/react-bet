import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType } from '../../../../types/types'
import { BookmakerType } from '../../../../types/admin'
import BookmakerForm from './BookmakerForm'

import { getBookmakerFromServer, addBookmaker, editBookmaker } from '../../../../redux/admin-reducer'

interface MatchParams {
	bookmakerId: string;
}

interface Props extends RouteComponentProps<MatchParams> { }

const BookmakerContainer: FC<Props> = ({ ...props }) => {
	const bookmaker = useSelector<AppStateType, BookmakerType>(state => state.admin.bookmakers.currentBookmaker)
	const dispatch = useDispatch()

	let bookmakerId = props.match.params.bookmakerId;


	const addBookmakerDispatch = async (formData: BookmakerType) => {
		await dispatch(addBookmaker(formData))

		props.history.push('/admin/bookmakers');
	}
	const editArticleDispatch = async (formData: BookmakerType) => {
		await dispatch(editBookmaker(+bookmakerId, formData))

		props.history.push('/admin/bookmakers');
	}


	let initialValues = {}
	let onSubmitFunc
	let breadcrumbsObj
	let buttonText = ""
	if (bookmakerId) {
		initialValues = bookmaker
		onSubmitFunc = editArticleDispatch
		breadcrumbsObj = { text: 'Изменение букмекера', link: `/admin/bookmakers/${bookmakerId}/edit` }
		buttonText = "Изменить букмекера"
	} else {
		onSubmitFunc = addBookmakerDispatch

		initialValues = {
    title: '',
    content: '',
    rating: '',
    bonus: '',
    link: '',
		}
		breadcrumbsObj = { text: 'Добавление букмекера', link: '/admin/bookmakers/add' }
		buttonText = "Добавить букмекера"
	}
	
	useEffect(() => {
		if (bookmakerId) {
			dispatch(getBookmakerFromServer(+bookmakerId))
		}
	}, []);
	
	
	return (
		<BookmakerForm
			initialValues={initialValues}
			onSubmitFunc={onSubmitFunc}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Букмекеры', link: '/admin/bookmakers' },
				{ ...breadcrumbsObj }
			]}
			buttonText={buttonText}
		/>
	)
}

export default withRouter(BookmakerContainer);