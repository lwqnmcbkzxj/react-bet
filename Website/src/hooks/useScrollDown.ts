import React, { FC, useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { setPaginationPage } from '../redux/app-reducer'


const useScrollDown = (instanceName = "") => {
	const dispatch = useDispatch()
	useEffect(() => {
		document.body.scrollTop = 0
		document.documentElement.scrollTop = 0
		dispatch(setPaginationPage(1, instanceName))
	}, []);


	useEffect(() => {
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const handleScroll = () => {
		if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight) {
			dispatch(setPaginationPage(-1, instanceName))
		}
	}

}
export default useScrollDown;