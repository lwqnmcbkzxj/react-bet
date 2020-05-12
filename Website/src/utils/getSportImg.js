import footballImg from '../assets/img/football.png'
import tennisImg from '../assets/img/table-tennis.png'
import basketballImg from '../assets/img/basketball.png'
import hockeyImg from '../assets/img/hockey.png'


const SportsImagesObj = {
	football: footballImg,
	tennis: tennisImg,
	basketball: basketballImg,
	hockey: hockeyImg,
}

export const getSportImg = (sport_id) => {
	let sportImg = ""
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