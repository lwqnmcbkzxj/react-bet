import footballImg from '../assets/img/football.png'
import tennisImg from '../assets/img/table-tennis.png'
import basketballImg from '../assets/img/basketball.png'
import hockeyImg from '../assets/img/hockey.png'

import { useSelector } from 'react-redux'
import { AppStateType, SportType } from '../types/types'
const SportsImagesObj = {
	football: footballImg,
	tennis: tennisImg,
	basketball: basketballImg,
	hockey: hockeyImg,
}

export const getSportImg = (sport_id, sportsArray = []) => {
	let imagesArray = []
	imagesArray = sportsArray.map(sport => sport.img)

	let sportImg = ""
	sportImg = imagesArray[+sport_id + 1]

	if (+sport_id === 1) {
		sportImg = SportsImagesObj.football
	} else if (+sport_id === 2) {
		sportImg = SportsImagesObj.tennis
	} else if (+sport_id === 3) {
		sportImg = SportsImagesObj.basketball
	} else if (+sport_id === 4) {
		sportImg = SportsImagesObj.hockey
	} else if (+sport_id === 5) {
		sportImg = ""
	}
	return sportImg;
}