import React, { FC } from 'react';
import ContentLoader from 'react-content-loader'
import useMobile from '../../../hooks/useMobile'



export const MatchesPlaceholder = () => {
	return (

		<ContentLoader
			speed={2}
			viewBox="0 0 660 52"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="60" y="8" rx="0" ry="0" width="75" height="38" />
			<rect x="185" y="12" rx="0" ry="0" width="30" height="30" />
			<rect x="235" y="8" rx="0" ry="0" width="220" height="22" />
			<rect x="235" y="35" rx="0" ry="0" width="220" height="14" />
			<rect x="560" y="12" rx="0" ry="0" width="70" height="30" />
		</ContentLoader>

	)
}

