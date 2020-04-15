import React, { FC } from 'react';
import { useDispatch, useSelector} from "react-redux";
import { AppStateType } from '../../types/types'

import Header from './Header'

type HeaderContainerProps = {
	toggleAuthFormVisible: () => void
	toggleCommentsVisible: () => void
}

const HeaderConainer: FC<HeaderContainerProps> = ({toggleAuthFormVisible, toggleCommentsVisible, ...props }) => {
	// const cartProductsCount = useSelector<AppStateType>(state => state.cart.cartProducts);
	// const dispatch = useDispatch();

	return (
		<Header
			toggleAuthFormVisible={toggleAuthFormVisible}
			toggleCommentsVisible={toggleCommentsVisible}
		/>
	)
}

export default HeaderConainer;