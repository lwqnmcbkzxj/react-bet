import React, { FC } from 'react';
import s from './Breadcrumbs.module.scss';
import { Link } from 'react-router-dom'
export type BreadcrumbsPropsType = {
	pathParams: Array<{
		link: string
		text: string
	}>
}
const Breadcrumbs: FC<BreadcrumbsPropsType> = ({ pathParams, ...props }) => {
	return (
		<div className={s.breadcrumbs}>
			{pathParams.map((param, counter: number) =>
				<Link to={`${param.link}`} className={s.breadcrumbsLink} key={counter}>
					{counter > 0 && <span className={s.slash}>/</span>}
					{param.text}
				</Link>
			)}
		</div>
	)
}
export default Breadcrumbs;
