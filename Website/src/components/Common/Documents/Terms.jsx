import React from 'react'
import { useSelector } from "react-redux"
import './Documents.scss'

const Terms = ({ ...props }) => {
	const terms = useSelector(state => state.app.terms)
	return (
		<div className="document" dangerouslySetInnerHTML={{ __html: terms }}>
		</div>
	)
}

export default Terms