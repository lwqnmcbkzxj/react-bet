import React, { FC, useState, useEffect } from 'react';
import s from './AuthForm.module.css'


type AuthFormPropsType = {
	isAuthFormVisible: boolean
	toggleAuthFormVisible: () => void
}
const LoginThrough: FC<AuthFormPropsType> = ({ isAuthFormVisible, toggleAuthFormVisible, ...props }) => {

	

	return (
		<div>
			
		</div>
	)
}

export default LoginThrough;