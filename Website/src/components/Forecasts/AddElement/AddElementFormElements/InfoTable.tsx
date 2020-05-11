import React, { FC, useState } from 'react';
import s from './InfoTable.module.scss';
import classNames from 'classnames'
import bookmakerImg from '../../../../assets/img/bookmaker-img-1.png'

type InfoTablePropsType = {
	info: Array<any>
}
const InfoTable: FC<InfoTablePropsType> = ({ ...props }) => {
	let tableInfo = {
		labels: ['Тотал', 'ИТБ1', 'ИМТ1', 'Еще'],
		info: [
			{
				bookmaker: bookmakerImg,
				coefficients: [ 1.15, 5.9, 5.9, 5.9 ]
			},
			{
				bookmaker: bookmakerImg,
				coefficients: [ 1.15, 5.9, 5.9, 5.9 ]
			},
			{
				bookmaker: bookmakerImg,
				coefficients: [ 1.15, 5.9, 5.9, 5.9 ]
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
				{tableInfo.info.map(infoElem =>
					<div className={s.infoTableRow}>

						<div className={s.bookmakerBlock}><img src={infoElem.bookmaker} alt="bookmaker-img"/></div>
						{infoElem.coefficients.map(coeff => 
							<div className={s.coefficient}>{coeff}</div>
						)}

					</div>
				)}
			</div>
		</div>
	)
}
export default InfoTable;