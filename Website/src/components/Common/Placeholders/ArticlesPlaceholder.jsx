import React, { FC } from 'react';

import ContentLoader from 'react-content-loader'
import useMobile from '../../../hooks/useMobile'



export const ArticlesPlaceholder = () => {
	const isMobile = useMobile(480)

	if (isMobile) {
		return (
			<ContentLoader
				speed={2}
				width={400}
				height={300}
				viewBox="0 0 400 300"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="10" y="85" rx="0" ry="0" width="380" height="160" />
				<rect x="10" y="50" rx="0" ry="0" width="380" height="26" />
				<rect x="10" y="16" rx="0" ry="0" width="150" height="18" />
				<rect x="290" y="15" rx="0" ry="0" width="100" height="18" />
				<rect x="10" y="260" rx="0" ry="0" width="80" height="26" />
				<rect x="310" y="260" rx="0" ry="0" width="80" height="26" />
			</ContentLoader>
		)
	}
	return (
		<ContentLoader
			speed={2}
			viewBox="0 0 660 220"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="15" y="17" rx="0" ry="0" width="160" height="22" />
			<rect x="515" y="19" rx="0" ry="0" width="130" height="22" />
			<rect x="15" y="64" rx="0" ry="0" width="374" height="26" />
			<rect x="15" y="100" rx="0" ry="0" width="630" height="80" />
			<rect x="15" y="190" rx="0" ry="0" width="50" height="22" />
			<rect x="585" y="190" rx="0" ry="0" width="60" height="22" />
		</ContentLoader>
	)
}

