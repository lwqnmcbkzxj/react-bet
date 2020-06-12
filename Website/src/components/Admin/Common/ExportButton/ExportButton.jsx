import React, { FC, useEffect, useState } from 'react'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { CSVLink } from "react-csv";
import { adminAPI } from '../../../../api/api';
import Axios from 'axios';

import { exportAdminData } from '../../../../redux/admin-reducer'
import { useDispatch } from 'react-redux';

const ExportButton = ({ labels, tableName, getAllData, ...props }) => {
	const dispatch = useDispatch()	
	const exportDataDispatch = () => {
		dispatch(exportAdminData('users'))
	}
	return (
		<ActionButton value="Экспортировать" func={() => { exportDataDispatch() }}/>
	)
}

export default ExportButton;