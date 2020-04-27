import React, { FC } from 'react'
import s from './Articles.module.scss';
import { useDispatch, useSelector} from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'

type ArticlePropsType = {
	article: ArticleType
}

const Article: FC<ArticlePropsType> = ({ article, ...props }) => {
	return (
		<div>Article</div>
	)
}

export default Article;