import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";


function useMobile(widthParam = 480) {
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		handleResize()
		window.addEventListener('resize', handleResize);
		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	const handleResize = () => {
		let isMobileDevice = !!navigator.userAgent.match(/Mobile/) || false;
		let width = window.innerWidth;

		if (width <= widthParam || (isMobileDevice && window.screen.availWidth <= widthParam))
			setIsMobile(true)
		else
			setIsMobile(false)

	}


	return isMobile;
}
export default useMobile;