import React, { FC } from 'react';
import s from './ActionButton.module.scss';

type ForecastsPropsType = {
	value: string
	func?: () => void
}
const Forecasts: FC<ForecastsPropsType> = ({value, func,  ...props }) => {
	return (
		<button className={s.actionButton} onClick={func}>{value}</button>
	)
}
export default Forecasts;