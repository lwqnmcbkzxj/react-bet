import React from 'react'
import preloader from '../../../assets/img/Preloader.svg'

const Preloader = ({ ...props }) => {
	return (
		<div style={{ width: '80px', margin: '20px auto' }}>
			<img src={preloader} alt="preloader" style={{ width: '100%' }} />
		</div>
	)
}

export default Preloader;