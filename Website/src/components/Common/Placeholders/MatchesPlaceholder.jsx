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

export const MatchStatsPlaceHolder = () => {
	return (
		<ContentLoader
			speed={2}
			viewBox="0 0 660 180"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="54" y="100" rx="0" ry="0" width="131" height="28" />
			<rect x="284" y="30" rx="0" ry="0" width="95" height="27" />
			<rect x="284" y="62" rx="0" ry="0" width="95" height="20" />
			<rect x="256" y="95" rx="0" ry="0" width="148" height="20" />
			<rect x="473" y="100" rx="0" ry="0" width="131" height="28" />
			<rect x="263" y="125" rx="0" ry="0" width="136" height="20" />
		</ContentLoader>
	)
}


export const BetsListItemPlaceholder = () => {
	return (
		<ContentLoader
			speed={2}
			viewBox="0 0 660 70"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="24" y="20" rx="0" ry="0" width="36" height="36" />
			<rect x="68" y="30" rx="0" ry="0" width="70" height="18" />
			<rect x="278" y="26" rx="0" ry="0" width="70" height="20" />
			<rect x="395" y="26" rx="0" ry="0" width="70" height="20" />
			<rect x="518" y="26" rx="0" ry="0" width="70" height="20" />
		</ContentLoader>
	)
}

export const MatchChartPlaceholder = () => {
	return (
		<ContentLoader
			speed={2}
			viewBox="0 0 660 320"
			backgroundColor="#f3f3f3"
			foregroundColor="#ecebeb"
		>
			<rect x="50" y="8" rx="0" ry="0" width="76" height="289" />
			<rect x="154" y="114" rx="0" ry="0" width="76" height="183" />
			<rect x="255" y="153" rx="0" ry="0" width="76" height="143" />
			<rect x="359" y="81" rx="0" ry="0" width="76" height="215" />
			<rect x="462" y="44" rx="0" ry="0" width="75" height="255" />
			<rect x="563" y="231" rx="0" ry="0" width="76" height="66" />
		</ContentLoader>
	)
}