import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Redirect } from 'react-router';
import { connect } from 'react-redux';


export const withAuthRedirect = (Component) => {

	const RedirectComponent = (props) => {
		const logged = useSelector(state => state.me.logged)

		if (!logged) return <div>Вам нужно войти</div>
		return <Component {...props} />
	}

	return RedirectComponent;
}