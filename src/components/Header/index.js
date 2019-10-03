import React from 'react';
import './style.scss';

export const Header = (props) => {
	return (
		<div className='header'>
			<div className="header__logo">Level UP</div>
			<div className="header__controls">
				<div className="header__message"/>
				<div className="header__profile"/>
			</div>
		</div>
	)
};
