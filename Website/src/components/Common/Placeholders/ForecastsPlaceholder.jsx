import React, { FC } from 'react';

import ContentLoader from 'react-content-loader'
import useMobile from '../../../hooks/useMobile'


export const ForecastsListElementPlaceholder = () => {
	const isMobile = useMobile(480)
	const isMobile768 = useMobile(768)

	if (isMobile) {
		return (

			<ContentLoader
				speed={2}
				viewBox="0 0 440 380"
				backgroundColor="#f3f3f3"
				foregroundColor="#ecebeb"
			>
				<rect x="10" y="174" rx="0" ry="0" width="420" height="120" />
				<rect x="10" y="299" rx="0" ry="0" width="300" height="30" />
				<rect x="10" y="340" rx="0" ry="0" width="50" height="26" />
				<rect x="360" y="340" rx="0" ry="0" width="60" height="26" />
				<rect x="10" y="40" rx="0" ry="0" width="300" height="30" />
				<rect x="10" y="5" rx="0" ry="0" width="280" height="26" />
				<rect x="10" y="80" rx="0" ry="0" width="160" height="26" />
				<rect x="260" y="80" rx="0" ry="0" width="160" height="26" />
				<rect x="10" y="111" rx="0" ry="0" width="160" height="26" />
				<rect x="10" y="146" rx="0" ry="0" width="160" height="20" />
			</ContentLoader>

		)
	}

	return (
		<ContentLoader
			speed={2}
			viewBox= {isMobile768 ? "0 0 660 340" : "0 0 660 320"}
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="510" y="20" rx="0" ry="0" width="130" height="22" />
			<rect x="20" y="20" rx="0" ry="0" width="215" height="22" />
			<rect x="20" y="60" rx="0" ry="0" width="390" height="30" />
			<rect x="20" y="100" rx="0" ry="0" width="195" height="22" />
			<rect x="220" y="100" rx="0" ry="0" width="195" height="22" />
			<rect x="420" y="100" rx="0" ry="0" width="195" height="22" />
			<rect x="20" y="130" rx="0" ry="0" width="165" height="22" />
			<rect x="20" y="160" rx="0" ry="0" width="620" height="70" />
			

			{isMobile768 ?
				<>
					<rect x="20" y="250" rx="0" ry="0" width="300" height="30" />
					<rect x="20" y="290" rx="0" ry="0" width="70" height="30" />
					<rect x="590" y="290" rx="0" ry="0" width="50" height="30" />
				</> :
				<>
					<rect x="20" y="250" rx="0" ry="0" width="300" height="30" />
					<rect x="590" y="250" rx="0" ry="0" width="50" height="30" />
				</>}
		</ContentLoader>
	)
}


export const ForecastsPlaceholder = () => {
	return (
		<div  >

		</div>
	)
}