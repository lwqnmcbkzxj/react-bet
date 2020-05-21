import React, { FC } from 'react';
import ContentLoader from 'react-content-loader'
import useMobile from '../../../hooks/useMobile'



export const BookmakersListElementPlaceholder = () => {
	return (
		<ContentLoader 
		speed={2}
		viewBox="0 0 660 70"
		backgroundColor="#f3f3f3"
		foregroundColor="#ecebeb"
	  >
		<rect x="20" y="25" rx="0" ry="0" width="25" height="25" /> 
		<rect x="59" y="12" rx="0" ry="0" width="120" height="48" /> 
		<rect x="208" y="25" rx="0" ry="0" width="25" height="25" /> 
		<rect x="242" y="25" rx="0" ry="0" width="66" height="25" /> 
		<rect x="321" y="25" rx="0" ry="0" width="69" height="24" /> 
		<rect x="406" y="25" rx="0" ry="0" width="61" height="24" /> 
		<rect x="502" y="15" rx="0" ry="0" width="105" height="43" />
	  </ContentLoader>

	)
}

