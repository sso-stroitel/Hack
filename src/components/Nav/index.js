import React from 'react';
import './style.scss';

export const NavBar = ({title, handleClick, name, isActive}) => {
	return (
		<div onClick={() => handleClick(name)} className={`navbar__item ${isActive ? 'is-active' : ''}`}>
			{ title }
		</div>
	)
};
