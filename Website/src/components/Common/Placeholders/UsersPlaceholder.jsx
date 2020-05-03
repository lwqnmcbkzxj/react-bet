import React, { FC } from 'react';

import ContentLoader from 'react-content-loader'
import useMobile from '../../../hooks/useMobile'




export const UsersPlaceholder = () => {
	const isMobile = useMobile(480)

	if (isMobile) {
		return (
			<ContentLoader
				speed={2}
				viewBox="0 0 660 52"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="35" y="12" rx="0" ry="0" width="30" height="25" />
				<rect x="121" y="7" rx="0" ry="0" width="35" height="35" />
				<rect x="165" y="12" rx="0" ry="0" width="100" height="25" />
				<rect x="346" y="12" rx="0" ry="0" width="75" height="25" />
				<rect x="503" y="12" rx="0" ry="0" width="75" height="25" />
			</ContentLoader>
		)
	}

	return (
		<ContentLoader
			speed={2}
			viewBox="0 0 660 70"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="26" y="25" rx="0" ry="0" width="30" height="25" />
			<rect x="80" y="20" rx="0" ry="0" width="35" height="35" />
			<rect x="120" y="25" rx="0" ry="0" width="100" height="25" />
			<rect x="245" y="25" rx="0" ry="0" width="75" height="25" />
			<rect x="345" y="25" rx="0" ry="0" width="75" height="25" />
			<rect x="445" y="25" rx="0" ry="0" width="75" height="25" />
			<rect x="540" y="24" rx="0" ry="0" width="75" height="25" />
		</ContentLoader>

	)
}