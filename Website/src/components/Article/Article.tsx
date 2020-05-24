import React, { FC } from 'react'
import s from './Article.module.scss';
import { useDispatch, useSelector } from "react-redux"
import { AppStateType } from '../../types/types'
import { ArticleType } from '../../types/article'
import Breadcrumbs from '../Common/Breadcrumbs/Breadcrumbs'
import ElementStats from '../Common/ElementStats/ElementStats';
import GoBackBlock from '../Common/GoBackBlock/GoBackBlock'
import articleImg from '../../assets/img/article-img.png'
import CommentsBlock from '../Common/CommentsBlock/CommentsBlock';
type ArticlePropsType = {
	article: ArticleType
}

const Article: FC<ArticlePropsType> = ({ article, ...props }) => {
	return (
		<div className={s.articlePage}>
			<GoBackBlock
				link={'articles'}
				linkText={'Статьи'}
			/>
			
			
			
			<Breadcrumbs pathParams={[
				{ text: 'Главная', link: "" },
				{ text: 'Статьи', link: "/articles" },
				{ text: 'Рекомендации от опытного игрока', link: "/articles/1" }]} />
			
			<div className={s.article}>
				<div className={s.articleHeader}>
					<div className={s.rightBlock}>
						<div className={s.categoryName}>Название категории</div>
						<div className={s.nickname}>Никнейм</div>
					</div>
					<div className={s.date}>вчера в 16:58</div>
				</div>
				<div className={s.articleTitle}>Рекомендации от опытного игрока</div>
				{article.image && <img src={article.image} alt="article-img" />}
				<div className={s.articleText}>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr,
					sed diam nonumy eirmod tempor invidunt ut labore et dolore magna
					aliquyam erat, sed diam voluptua. At vero eos et accusam et justo
					duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
					sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
					consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt
					ut labore et dolore magna aliquyam erat, sed diam voluptua.
						At vero eos et accusam.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
					eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
					At vero eos et accusam et justo duo dolores et ea rebum.
							Stet clita kasd gubergren, no sea.</p>
					<p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod
					tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua.
					At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren,
						no sea takimata sanctus est Lorem ipsum dolor sit amet.</p>
				</div>

				{/* <ElementStats
					comments={article.commentsCount}
					favourites={article.favourites}
					likes={article.likes}
					id={article.id}
					elementType='article' /> */}
				<ElementStats
					comments={3}
					favourites={54}
					likes={23}
					id={1}
					elementType='article' />
			</div>
			<CommentsBlock
				// comments={article.comments}
			/>
		</div>
	)
}

export default Article;