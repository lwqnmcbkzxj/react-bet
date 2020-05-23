import React, { FC, useState } from 'react';
import s from './InfoTable.module.scss';
import classNames from 'classnames'
import bookmakerImg from '../../../../assets/img/bookmaker-img-1.png'

import { Field } from 'redux-form';
import InfoTable from './InfoTable';

type InfoTableTogglerPropsType = {
	togglerName: string
	startVisibility?: boolean
	info: Array<any>
	name: string
	currentDecision: any
	changeDecision: (bookmakerId: number, type: string, value: number) => void
}
const InfoTableToggler: FC<InfoTableTogglerPropsType> = ({ togglerName, startVisibility = false, ...props }) => {

	const [tableVisibility, setTableVisibility] = useState(startVisibility)

	const toggleTableVisibility = () => {
		setTableVisibility(!tableVisibility)
	}
	return (
		<div className={s.infoTableToggle}>
			<button
				onClick={toggleTableVisibility}
				className={classNames(s.tableToggler, { [s.active]: tableVisibility })}
			>
				<p>{togglerName} (+{props.info.length}) {tableVisibility && <span>(свернуть)</span>}</p>
				
			</button>
			{tableVisibility && <InfoTable {...props} />}
		</div>
	)
}
export default InfoTableToggler;
