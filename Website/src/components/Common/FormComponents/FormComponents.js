import React, { useState } from 'react';
import s from './FormComponents.module.css';
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
				{...props} />
		</div>
	)

}




export const Input = (props) => {
	const { input, meta, ...restProps } = props;
	const hasError = meta.touched && meta.error;

	let type = input.type === 'password';

	const [passwordVisibilty, setPasswordVisibilty] = useState(false)

	if (props.canSeeInputValue) {
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
		<div className={cn(s.inputBlock, { [s.canSeeContent] :  props.canSeeInputValue})}>
			<label>{props.label}</label>
			<div>
				<input {...input} {...restProps} className={hasError ? s.errorInput : null} type={type} />

				{props.canSeeInputValue ?
					<FontAwesomeIcon
						icon={passwordVisibilty ? faEyeSlash : faEye}
						className={s.inputEye}
						onClick={togglePasswordVisibilty}						
					/>
					: null}
			</div>
		</div>

	)
}



