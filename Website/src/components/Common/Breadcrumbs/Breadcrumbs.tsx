import React, { FC } from 'react';
import s from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom'
type ForecastsPropsType = {
	pathParams: Array<{
		link: string
		text: string
	}>
}
const Forecasts: FC<ForecastsPropsType> = ({ pathParams, ...props }) => {
	return (
		<div className={s.breadcrumbs}>
			{pathParams.map((param, counter: number) =>
				<Link to={`${param.link}`} className={s.breadcrumbsLink}>
					{counter > 0 && <span className={s.slash}>/</span>}
					{param.text}
				</Link>
			)}
		</div>
	)
}
export default Forecasts;
