import React, { FC } from 'react';
import s from './Breadcrumbs.module.css';

type ForecastsPropsType = {
	pathParams: Array<string>
}
const Forecasts: FC<ForecastsPropsType> = ({ pathParams, ...props }) => {
	return (
		<div className={s.breadcrumbs}>
			{
				pathParams.map((param: string, counter: number) => 
					<p>
						{counter > 0 && <span className={s.slash}>/</span> }
						{param}
					</p>

				)
			}
		</div>
	)
}
export default Forecasts;
