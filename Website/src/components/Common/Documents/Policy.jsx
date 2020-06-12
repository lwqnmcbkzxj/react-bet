import React from 'react'
import { useSelector } from "react-redux"
import './Documents.scss'

const Policy = ({ ...props }) => {
	const policy = useSelector(state => state.app.policy)
	return (
		<div className="document" dangerouslySetInnerHTML={{ __html: policy }}>
		</div>
	)
}

export default Policy