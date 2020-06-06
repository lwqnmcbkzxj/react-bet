import React, { FC, useEffect } from 'react'

import ActionButton from '../../../Common/ActionButton/ActionButton'
import ReactExport from "react-export-excel";


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportButton = ({ labels, data, tableName, ...props }) => {
	return (
		<ExcelFile element={<ActionButton value="Экспортировать"/>}>
			<ExcelSheet data={data} name={tableName}>
				{labels.map((label, counter) => 
					
					<ExcelColumn label={label} value={data[label]}/>
				)}
				
			</ExcelSheet>
		</ExcelFile>
	);
}

export default ExportButton;