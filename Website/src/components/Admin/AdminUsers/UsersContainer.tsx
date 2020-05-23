import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Admin.module.scss'
import { Switch, Route } from 'react-router'
import Users from './Users'

const UsersContainer: FC = ({ ...props }) => {
	return (
		<Users />
	)
}

export default UsersContainer;