import React, { FC, useEffect, useState } from 'react'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import { CSVLink } from "react-csv";
import { adminAPI } from '../../../../api/api';



const ExportButton = ({ labels, tableName, getAllData, ...props }) => {
	const exportBtn = React.createRef()

	// const [active, setActive] = useState(false)
	// const [data, setData] = useState([])
	// const downloadHandler = async () => {
	// 	let data = await getAllData()
	// 	let newData = []
		
	// 	if (data) {
	// 		setActive(true)
	// 		setData(data.data)
	// 		exportBtn.current.link.click();
	// 	}
	// }

	return (
			<ActionButton value="Экспортировать"  />
			// {active && <CSVLink data={data} filename={tableName + '.csv'} ref={exportBtn}></CSVLink>}


	)
}

export default ExportButton;