import React, { useState, useEffect, createRef } from 'react';
import s from './FormComponents.module.scss';
import cn from 'classnames'
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCaretDown } from '@fortawesome/free-solid-svg-icons'

export function createField(
	name,
	component,
	label = "",
	props = {}) {
	return (
		<div>
			<Field
				name={name}
				component={component}
				label={label}
				{...props.mask}
				{...props} />
		</div>
	)

}




export const Input = (props) => {
	const { input, meta, mask = "", canSeeInputValue, ...restProps } = props;
	const hasError = meta.touched && meta.error;

	let type = props.type;

	const [passwordVisibilty, setPasswordVisibilty] = useState(false)

	if (canSeeInputValue) {
		if (passwordVisibilty) {
			type = "text"
		} else {
			type = "password"
		}
	}

	const togglePasswordVisibilty = () => {
		setPasswordVisibilty(!passwordVisibilty)
	}

	return (
		<div className={cn(s.inputBlock, { [s.canSeeContent]: canSeeInputValue })}>
			<label>{props.label}</label>
			<div>
				<input {...input} {...restProps} className={hasError ? s.errorInput : null} type={type} />

				{canSeeInputValue &&
					<FontAwesomeIcon
						icon={passwordVisibilty ? faEyeSlash : faEye}
						className={s.inputEye}
						onClick={togglePasswordVisibilty}
					/>}
			</div>
		</div>

	)
}

export const Textarea = (props) => {
	const { input, meta, mask = "", canSeeInputValue, ...restProps } = props;
	const hasError = meta.touched && meta.error;

	return (
		<div className={s.inputBlock}>
			<label>{props.label}</label>
			<div>
				<textarea {...input} {...restProps} className={hasError ? s.errorInput : null} />
			</div>
		</div>

	)
}

export const DropDownSelect = ({ elements, listName, ...props }) => {
	const { input, label } = props;

	const dropDownRef = createRef()

	const [dropdownVisible, setDropdownVisible] = useState(false)
	const toggleDropdownVisibility = () => {
		setDropdownVisible(!dropdownVisible)
	}

	useEffect(() => {
		document.addEventListener('click', (e) => {
			if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
				setDropdownVisible(false)
				e.stopPropagation()
			}
		})
		return () => {
			document.removeEventListener('click', () => { })
		};
	}, [dropdownVisible]);

	const [activeElement, setActiveElement] = useState(elements[0])

	const getListElementFromValue = (value, key = 0) => {
		let isActive = value === activeElement
		return (
			<div
				className={cn(s.dropDownElement, { [s.activeDropdownElement]: isActive })}
				key={key}
				onClick={() => {
					setActiveElement(value)
					toggleDropdownVisibility()
				}}>
				<input type="radio" id={listName} name={listName} checked={isActive} />
				<label htmlFor={listName}> {value} </label>
				{isActive && <FontAwesomeIcon className={cn(s.dropDownArrow, { ["fa-rotate-180"]: dropdownVisible })} icon={faCaretDown} />}
			</div>
		)
	}
	let activeElementBlock = getListElementFromValue(activeElement)


	let elementsList = elements.map((element, counter = 1) =>
		element !== activeElement &&
		getListElementFromValue(element, counter)
	)


	return (
		<div className={s.inputBlock} ref={dropDownRef}>
			<label htmlFor={label}>{label}</label>

			{activeElementBlock}

			{dropdownVisible &&
				<div className={s.elementsList}>
					{elementsList}
				</div>}
		</div>
	);
}
