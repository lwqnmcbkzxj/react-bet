import React, { FC } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { AppStateType } from '../../types/types'

import Comments from './Comments'

type CommentsContainerProps = {
	
}

const CommentsContainer: FC<CommentsContainerProps> = ({ ...props }) => {
	return (
		<Comments
			
		/>
	)
}

export default CommentsContainer;