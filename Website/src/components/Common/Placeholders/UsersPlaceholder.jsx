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

export const MainPageUsersPlaceholder = () => {
	return (
		<ContentLoader
			speed={2}
			width={75}
			height={120}
			viewBox="0 0 75 120"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="2" y="2" rx="0" ry="0" width="70" height="70" />
			<rect x="2" y="80" rx="0" ry="0" width="70" height="15" />
			<rect x="2" y="103" rx="0" ry="0" width="70" height="15" />
			<rect x="63" y="140" rx="0" ry="0" width="70" height="15" />
		</ContentLoader>

	)
}

export const UserProfilePlaceholder = () => {
	return (
		<ContentLoader 
    speed={2}
    viewBox="0 0 660 500"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="21" y="14" rx="0" ry="0" width="57" height="62" /> 
    <rect x="90" y="14" rx="0" ry="0" width="175" height="21" /> 
    <rect x="90" y="44" rx="0" ry="0" width="250" height="21" /> 
    <rect x="70" y="95" rx="0" ry="0" width="95" height="16" /> 
    <rect x="172" y="114" rx="0" ry="0" width="0" height="1" /> 
    <rect x="94" y="115" rx="0" ry="0" width="50" height="24" /> 
    <rect x="489" y="95" rx="0" ry="0" width="95" height="16" /> 
    <rect x="513" y="115" rx="0" ry="0" width="50" height="24" /> 
    <rect x="281" y="95" rx="0" ry="0" width="95" height="16" /> 
    <rect x="305" y="115" rx="0" ry="0" width="50" height="24" /> 
    <rect x="21" y="165" rx="0" ry="0" width="87" height="22" /> 
    <rect x="119" y="165" rx="0" ry="0" width="87" height="22" /> 
    <rect x="533" y="11" rx="0" ry="0" width="98" height="28" /> 
    <rect x="330" y="295" rx="0" ry="0" width="150" height="22" /> 
    <rect x="0" y="377" rx="0" ry="0" width="660" height="21" /> 
    <circle cx="223" cy="276" r="60" /> 
    <rect x="330" y="260" rx="0" ry="0" width="150" height="22" /> 
    <rect x="330" y="230" rx="0" ry="0" width="150" height="22" /> 
    <rect x="0" y="410" rx="0" ry="0" width="660" height="21" /> 
    <rect x="0" y="443" rx="0" ry="0" width="660" height="21" /> 
    <rect x="1" y="478" rx="0" ry="0" width="660" height="21" />
  </ContentLoader>

	)
}



  