import React, { FC, useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import s from './Banner.module.scss'
import { reduxForm, InjectedFormProps, SubmissionError, Field, change } from 'redux-form'
import { Input, Textarea, createField, File, FormatTextarea, createDropdown } from '../../../Common/FormComponents/FormComponents'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { BannerType, ShortDataElementType } from '../../../../types/types'
import Breadcrumbs from '../../../Common/Breadcrumbs/Breadcrumbs'

import { required } from '../../../../utils/formValidation'

import Loader from '../../../Common/Preloader/Preloader'
import contentHolder from '../../../../assets/img/content-img-holder.png'
import { apiURL } from '../../../../api/api'
import { loadImage } from '../../../../utils/loadImage'
import { AppStateType } from '../../../../types/types'
import { sortDropdownValues } from '../../../../utils/sortDropdownValues'

type FormType = {
	initialValues: any,
	onSubmitFunc: (formData: BannerType) => void
	breadcrumbs: Array<{
		link: string
		text: string
	}>
	buttonText: string
	dropdownLists: {
		positions: Array<ShortDataElementType>
		types: Array<ShortDataElementType>
	}
}
type FormValuesType = {
	buttonText: string
	dropdownLists: {
		positions: Array<ShortDataElementType>
		types: Array<ShortDataElementType>
	}
}
const formName = "admin-banner-form"
const BannerForm: FC<FormValuesType & InjectedFormProps<{}, FormValuesType>> = (props: any) => {
	const isFetchingArray = useSelector<AppStateType, Array<string>>(state => state.admin.isFetchingArray)
	const dispatch = useDispatch()
	const setPreviewImage = (file: File) => {
		if (file) {
			let blockId = file.type.includes('video') ? 'admin-banner-video-holder' : 'admin-banner-img-holder'
			loadImage(file, props.formName, 'image', blockId, dispatch)
		}
	}



	let [isPositionsSorted, setIsPositionsSorted] = useState(false)
	let [isTypesSorted, setIsTypesSorted] = useState(false)
	let [positionsArr, setPositionsArr] = useState([])
	let [typesArr, setTypesArr] = useState([])

	useEffect(() => {
		if (props.initialValues) {
			props.dropdownLists.positions.length > 0 && sortDropdownValues(props.initialValues.position, props.dropdownLists.positions, setPositionsArr, setIsPositionsSorted)
			props.dropdownLists.types.length > 0 && sortDropdownValues(props.initialValues.is_video, props.dropdownLists.types, setTypesArr, setIsTypesSorted)
		}
	}, [props.initialValues, props.dropdownLists.positions, props.dropdownLists.types]);


	return (
		<form onSubmit={props.handleSubmit}>

			{createField("title", Input, "Название", { valiadtors: [required] })}
			{createField("link", Input, "Ссылка", { valiadtors: [required] })}
			{isPositionsSorted && createDropdown('position', 'Расположение', props.form, { elements: [...positionsArr], valiadtors: [required] })}
			{createField('status', Input, 'Активен', { type: 'checkbox' })}
			{isTypesSorted && createDropdown('is_video', 'Тип', props.form, { elements: [...typesArr], valiadtors: [required] })}


			<div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
				{createField("image", File, "Файл", { formName: props.form, onChangeFunc: setPreviewImage })}
			</div>

			<div className={s.previewImg}>
				<img src={props.initialValues.image ? apiURL + props.initialValues.image : contentHolder} alt="banner-img" id="admin-banner-img-holder" />

				{props.initialValues.image && props.initialValues.is_video ? <video width="500" controls >
					<source src={apiURL + props.initialValues.image} id="admin-banner-video-holder" />
				</video> : null}
			</div>

			{createField('delay', Input, 'Задержка перед вызовом (в секундах)')}
			{createField('timeout', Input, 'Перерыв между баннерами (в часах)')}


			<div className={s.btnHolder}>
				{isFetchingArray.includes('banner-action') ?
					<Loader /> :
					<ActionButton value={props.buttonText} />
				}
			</div>
		</form>
	);
}
const ReduxBannerForm = reduxForm<{}, FormValuesType>({ form: formName, enableReinitialize: true })(BannerForm)


const BannerFormBlock: FC<FormType> = ({ initialValues, onSubmitFunc, breadcrumbs = [], buttonText = "", ...props }) => {
	const dispatch = useDispatch()



	const handleSave = (formData: any) => {
		let dataObject = {} as BannerType | any

		if (formData.id) dataObject.id = formData.id
		dataObject = {
			title: formData.title,
			link: formData.link,
			image: formData.image,
			delay: formData.delay,
			timeout: formData.timeout,
			position: formData.position,
			is_video: formData.is_video,
			status: +formData.status,
		}

		onSubmitFunc({ ...dataObject })
	}

	return (
		<div>
			<Breadcrumbs pathParams={breadcrumbs} />
			<ReduxBannerForm
				onSubmit={handleSave}
				initialValues={{
					...initialValues,
					status: !!initialValues.status
				}}
				buttonText={buttonText}
				dropdownLists={props.dropdownLists}
			/>
		</div>

	);
}



export default BannerFormBlock;