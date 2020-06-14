import React, { FC, useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { withRouter, RouteComponentProps, Redirect } from 'react-router'
import { AppStateType, BannerPositionEnum } from '../../../../types/types'
import { BannerType } from '../../../../types/types'
import BannerForm from './BannerForm'

import { getAdminBannerFromServer, addBanner, editBanner } from '../../../../redux/admin-reducer'
import { getBannerPosition } from '../../../../utils/getValueFromEnumCode'

interface MatchParams {
	bannerId: string;
}

interface BannerProps extends RouteComponentProps<MatchParams> { }

const BannerContainer: FC<BannerProps> = ({ ...props }) => {
	const banner = useSelector<AppStateType, BannerType>(state => state.admin.banners.currentBanner)
	const dispatch = useDispatch()

	let bannerId = props.match.params.bannerId;


	const addBannerDispatch = async (formData: BannerType) => {
		await dispatch(addBanner(formData))

		props.history.push('/admin/banners');
	}
	const editBannerDispatch = async (formData: BannerType) => {
		await dispatch(editBanner(+bannerId, formData))

		props.history.push('/admin/banners');
	}


	let initialValues = {}
	let onSubmitFunc
	let breadcrumbsObj
	let buttonText = ""
	if (bannerId) {
		initialValues = banner
		onSubmitFunc = editBannerDispatch
		breadcrumbsObj = { text: 'Изменение баннера', link: `/admin/banners/${bannerId}/edit` }
		buttonText = "Изменить баннер"
	} else {
		onSubmitFunc = addBannerDispatch

		initialValues = {
			title: "",
			link: "",
			image: "",
			delay: 0,
			timeout: 0,
			position: BannerPositionEnum.header,
			is_video: 0,
			status: 0,
		}
		breadcrumbsObj = { text: 'Добавление баннера', link: '/admin/banners/add' }
		buttonText = "Добавить баннер"
	}

	useEffect(() => {
		if (bannerId) {
			dispatch(getAdminBannerFromServer(+bannerId))
		}
	}, []);

	let bannerPositionsArr = [
		{ id: BannerPositionEnum.header, value: getBannerPosition(BannerPositionEnum.header) },
		{ id: BannerPositionEnum.menu, value: getBannerPosition(BannerPositionEnum.menu) },
		{ id: BannerPositionEnum.comments, value: getBannerPosition(BannerPositionEnum.comments) },
		{ id: BannerPositionEnum.main_content_horizontal, value: getBannerPosition(BannerPositionEnum.main_content_horizontal) },
		{ id: BannerPositionEnum.mobile_bottom, value: getBannerPosition(BannerPositionEnum.mobile_bottom) },
		{ id: BannerPositionEnum.mobile_full_width, value: getBannerPosition(BannerPositionEnum.mobile_full_width) },
		{ id: BannerPositionEnum.big_left, value: getBannerPosition(BannerPositionEnum.big_left) },
		{ id: BannerPositionEnum.big_right, value: getBannerPosition(BannerPositionEnum.big_right) },
		{ id: BannerPositionEnum.header_big, value: getBannerPosition(BannerPositionEnum.header_big) },
	]

	let bannerTypesArr = [
		{ id: 0, value: 'Изображение' },
		{ id: 1, value: 'Видео' },
	]



	return (
		<BannerForm
			initialValues={initialValues}
			onSubmitFunc={onSubmitFunc}
			breadcrumbs={[
				{ text: 'Главная', link: '/admin' },
				{ text: 'Статьи', link: '/admin/banners' },
				{ ...breadcrumbsObj }
			]}
			buttonText={buttonText}
			dropdownLists={{
				positions: bannerPositionsArr,
				types: bannerTypesArr
			}}
		/>
	)
}

export default withRouter(BannerContainer);