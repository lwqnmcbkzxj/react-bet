import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import s from './Admin.module.scss'
import { Switch, Route } from 'react-router'
import Mainpage from './AdminMainpage'

const AdminMainPageContainer: FC = ({ ...props }) => {
	return (
		<Mainpage />
	)
}

export default AdminMainPageContainer;