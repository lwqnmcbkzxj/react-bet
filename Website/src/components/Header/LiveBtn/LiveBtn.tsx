import React, { FC } from 'react';
import './LiveBtn.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretLeft } from '@fortawesome/free-solid-svg-icons'

type LiveBtnPropsType = {
	toggleCommentsBlockVisibility: () => void
}

const LiveBtn: FC<LiveBtnPropsType> = ({ toggleCommentsBlockVisibility, ...props }) => {

	return (
		<button className="commentsBtn" onClick={toggleCommentsBlockVisibility}>
			<FontAwesomeIcon icon={faCaretLeft} className="commentsIcon" />
			<p>Комментарии <span>LIVE</span></p>
		</button>

	)
}

export default LiveBtn;