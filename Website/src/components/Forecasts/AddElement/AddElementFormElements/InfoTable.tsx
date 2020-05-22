import React, { FC, useState } from 'react';
import s from './InfoTable.module.scss';
import classNames from 'classnames'
import bookmakerImg from '../../../../assets/img/bookmaker-img-1.png'

import { Field } from 'redux-form';

type InfoTablePropsType = {
	info: Array<any>
	name: string
	currentDecision: any
	changeDecision: (bookmakerId: number, type: string, value: number) => void
}
const InfoTable: FC<InfoTablePropsType> = ( {name, currentDecision, changeDecision, ...props }) => {
	let tableInfo = {
		labels: ['Тотал', 'ИТБ1', 'ИМТ1', 'Еще'],
		info: [
			{
				bookmaker: {
					img: bookmakerImg,
					id: 1,
				},
				coefficients: [
					{ type: 'Тотал', value: 1.1 },
					{ type: 'ИТБ1', value: 1.2 },
					{ type: 'ИМТ1', value: 1.3 },
					{ type: 'Еще', value: 1.4 }
				]
			},
			{
				bookmaker: {
					img: bookmakerImg,
					id: 2,
				},
				coefficients: [
					{ type: 'Тотал', value: 2.1 },
					{ type: 'ИТБ1', value: 2.2 },
					{ type: 'ИМТ1', value: 2.3 },
					{ type: 'Еще', value: 2.4 }
				]
			},
			{
				bookmaker: {
					img: bookmakerImg,
					id: 3,
				},
				coefficients: [
					{ type: 'Тотал', value: 3.1 },
					{ type: 'ИТБ1', value: 3.2 },
					{ type: 'ИМТ1', value: 3.3 },
					{ type: 'Еще', value: 3.4 }
				]
			},
		]
	}

	return (
		<div className={s.infoTable}>
			<div className={s.tableHeader}>
				<div className={s.bookmakerBlock}>БК</div>
				{tableInfo.labels.map(label =>
					<div>{label}</div>
				)}
			</div>
			<div className={s.tableBody}>
				{tableInfo.info.map((infoElem, elemCounter) =>
					<div className={s.infoTableRow}>

						<div className={s.bookmakerBlock}><img src={infoElem.bookmaker.img} alt="bookmaker-img" /></div>
						{infoElem.coefficients.map((coeff, betCounter) =>
							
							<div
								key={elemCounter + "." + betCounter}
								onClick={() => { changeDecision(infoElem.bookmaker.id, coeff.type, coeff.value) }}
								className={classNames(s.coeff, {
									[s.coeff_active]: currentDecision.bookmakerId === infoElem.bookmaker.id && currentDecision.type === coeff.type
								})}
							>
								{coeff.value}
							</div>
						)}

					</div>
				)}
			</div>
		</div>
	)
}
export default InfoTable;
