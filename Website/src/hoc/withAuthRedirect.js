import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"

import { Redirect } from 'react-router';
import { connect } from 'react-redux';


export const withAuthRedirect = (Component) => {
	const logged = useSelector(state => state.user.logged)

	const RedirectComponent = () => {
		if (!logged) return <Redirect to={"/login"} />
		return <Component {...this.props} />
	}

	return RedirectComponent;
}