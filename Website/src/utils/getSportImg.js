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

export const getSportImg = (sport) => {
	let sportImg = ""
	if (sport === 'Футбол') {
		sportImg = SportsImagesObj.football
	} else if (sport === 'Теннис') {
		sportImg = SportsImagesObj.tennis
	} else if (sport === 'Баскетбол') {
		sportImg = SportsImagesObj.basketball
	} else if (sport === 'Хоккей') {
		sportImg = SportsImagesObj.hockey
	} else if (sport === 'Другое') {
		sportImg = SportsImagesObj.football
	}
	return sportImg;
}