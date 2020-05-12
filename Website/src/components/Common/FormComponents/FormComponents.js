import React, { useState } from 'react';
import s from './FormComponents.module.scss';
import cn from 'classnames'
import { Field } from 'redux-form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'

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
	debugger
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



export const DropDownSelect = (props) => {
	const { input, label } = props;
	return (
		<div>
			<label htmlFor={label}>{label}</label>
			<select {...input}>
				{props.elements.map(element => <option key={element} value={element}>{element}</option>)}
			</select>
		</div>
	);
}
