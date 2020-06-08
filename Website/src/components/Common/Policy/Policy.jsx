import React, { FC, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import './Policy.scss'

const Policy = ({ ...props }) => {
	const policy = useSelector(state => state.app.policy)
	return (
		<div className="policy" dangerouslySetInnerHTML={{ __html: policy }}>
		</div>
	)
}

export default Policy