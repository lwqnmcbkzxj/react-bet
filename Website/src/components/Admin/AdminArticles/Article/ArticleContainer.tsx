import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType } from '../../../../types/types'
import { ArticleType } from '../../../../types/admin'
import ArticleForm from './ArticleForm'

import { getArticleFromServer, addArticle, editArticle } from '../../../../redux/admin-reducer'

interface MatchParams {
	articleId: string;
}

interface ArticleProps extends RouteComponentProps<MatchParams> { }

const ArticleContainer: FC<ArticleProps> = ({ ...props }) => {
	const article = useSelector<AppStateType, ArticleType>(state => state.admin.articles.currentArticle)
	const dispatch = useDispatch()

	let articleId = props.match.params.articleId;


	const addArticleDispatch = (formData: ArticleType) => {
		dispatch(addArticle(formData))

		props.history.push('/admin/articles');
	}
	const editArticleDispatch = (formData: ArticleType) => {
		dispatch(editArticle(+articleId, formData))

		props.history.push('/admin/articles');
	}


	let initialValues = {}
	let onSubmitFunc
	let breadcrumbsObj
	let buttonText = ""
	if (articleId) {
		initialValues = article
		onSubmitFunc = editArticleDispatch
		breadcrumbsObj = { text: 'Изменение статьи', link: `/admin/articles/edit/${articleId}` }
		buttonText = "Изменить статью"
	} else {
		onSubmitFunc = addArticleDispatch

		initialValues = {
			title: '',
			category_name: '',
			content: '',
			image: '',
			is_published: false
		}
		breadcrumbsObj = { text: 'Добавление статьи', link: '/admin/articles/add' }
		buttonText = "Добавить статью"
	}
	
	useEffect(() => {
		if (articleId) {
			dispatch(getArticleFromServer(+articleId))
		}
	}, []);

	
	return (
		<ArticleForm
			initialValues={initialValues}
			onSubmitFunc={onSubmitFunc}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Статьи', link: '/admin/articles' },
				{ ...breadcrumbsObj }
			]}
			buttonText={buttonText}
		/>
	)
}

export default withRouter(ArticleContainer);