import React, { useState, useEffect, createRef } from 'react';
import s from './FormComponents.module.scss';
import cn from 'classnames'
import { Field, change } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash, faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { useDispatch,  } from 'react-redux';

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
	const { input, meta, ...restProps } = props;
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

export const Number = (props) => {
	const { input, meta, readOnly = false, step = 1, ...restProps } = props;
	const hasError = meta.touched && meta.error;

	const numberInputRef = createRef()
	const numberRegExp = /^[0-9.,]+$/
	function IncrementNumber() {
		if (!readOnly) {
			let val = numberInputRef.current.value
			if (val.match(numberRegExp)) {
				props.handleChange(+val + +step)
			}
			
		}
	}
	function DecrementNumber() {
		if (!readOnly) {
			let val = numberInputRef.current.value
			if (val.match(numberRegExp)) {
				props.handleChange(+val - +step)
			}
		}
	}

	const handleChange = (e) => {
		let val = e.target.value
		if (val === "")
			val = "0"
		if (val.match(numberRegExp)) {
			props.handleChange(+val)
		}
	}
	return (
		<div className={s.inputBlock}>
			<label>{props.label}</label>
			<div>
				<input
					{...input}
					{...restProps}
					className={cn({
						[s.errorInput]: hasError,
					})}
					disabled={readOnly}
					type="number"
					ref={numberInputRef}
					min="0"
					step={step}
					onChange={ handleChange }
				/>
				<div className={s.arrows}>
					<FontAwesomeIcon className="fa-rotate-180" icon={faCaretDown} onClick={IncrementNumber}/>
					<FontAwesomeIcon icon={faCaretDown} onClick={DecrementNumber}/>
					
				</div>
			</div>
		</div>

	)
}

export function createDropdown(
	name = "",
	label = "",
	props = {}) {
	return (
		<DropDownSelect label={label} name={name}  {...props}/>
	)
}


export const DropDownSelect = ({ elements, name, ...props }) => {
	const dispatch = useDispatch()
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

	const handleSetActiveElement = (value) => {
		setActiveElement(value)
		dispatch(change( 'add-element', name, value ))
	}

	const getListElementFromValue = (value, key = 0) => {
		let isActive = (value === activeElement)
		return (
			<div
				className={cn(s.dropDownElement, { [s.activeDropdownElement]: isActive })}
				key={key}
				onClick={(e) => {
					handleSetActiveElement(value)
					toggleDropdownVisibility()
				}}
			>
				<Field type="radio" component="input" name={name} id={name + "." + value} value={value} />
				<label htmlFor={name + "." + value} >{value}</label>
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