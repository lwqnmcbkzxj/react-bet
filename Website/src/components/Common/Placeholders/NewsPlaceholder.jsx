import React, { FC } from 'react';
import ContentLoader from 'react-content-loader'
import useMobile from '../../../hooks/useMobile'



export const NewslistPlaceholder = () => {
	const isMobile = useMobile(480)

	if (isMobile) {
		return (
			<ContentLoader 
			speed={2}
			viewBox="0 0 400 370"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		  >
			<rect x="10" y="20" rx="0" ry="0" width="150" height="18" /> 
			<rect x="290" y="20" rx="0" ry="0" width="100" height="18" /> 
			<rect x="10" y="60" rx="0" ry="0" width="380" height="43" /> 
			<rect x="10" y="115" rx="0" ry="0" width="380" height="250" />
		  </ContentLoader>
		
		)
	}
	return (
		<ContentLoader
			speed={2}
			viewBox="0 0 660 200"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="17" y="95" rx="0" ry="0" width="630" height="90" />
			<rect x="15" y="17" rx="0" ry="0" width="148" height="20" />
			<rect x="545" y="17" rx="0" ry="0" width="100" height="20" />
			<rect x="15" y="57" rx="0" ry="0" width="630" height="30" />
		</ContentLoader>


	)
}

