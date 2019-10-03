import React from 'react';
import './style.scss';
import Particles from 'react-particles-js';
import {RecommendPath} from './RecommendPath';

const nodes = [
	{progress: 100, title: 'Алгебра 9-11 класс'},
	{progress: 100, title: 'Основы анг. языка'},
	{progress: 85, title: 'Матанализ (базовый)'}
];

const recommend = {
	firstLvl: [
		{title: 'Теория вероятностей (баз)', isPrior: true, sources: []},
		{title: 'Линейная алгебра', isPrior: true, sources: []},
		{title: 'Матанализ (про)', isPrior: true, sources: []},
		{title: 'Основы программирования', isPrior: false, sources: []},
		{title: 'Общая физика (механика)', isPrior: false,},
		{title: 'Аналитическая химия', isPrior: false},
		{title: 'ТРИЗ', isPrior: false}
	],
	secondLvl: [
		{title: 'Мат. статистика', isPrior: true, sources: []},
		{title: 'Machine Learning (beginner)', isPrior: true, sources: []},
		{title: 'Python (основы)', isPrior: true, sources: []},
		{title: 'Алгоритмы и структуры данных', isPrior: false, sources: []},
	]

}

export default class Tree extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			view: '1',
			isPopupOpen: false
		}
	}

	handleKeyUp = (e) => {
		if (e.key === '1') {
			this.setState({
				view: '2'
			})
		}
	};

	onImgClick = () => {
		this.setState({
			view: '3'
		})
	}

	componentDidMount() {
		document.addEventListener("keydown", this.handleKeyUp);
	}

	onCardClick = (e, data) => {
		this.setState({
			isPopupOpen: true
		})
	};

	render() {
		const view = this.state.view === '1'
			? <img src="/static/base.svg" className='tree__img'/>
			: this.state.view === '2'
				? <img onClick={this.onImgClick} src="/static/choose.svg" className='tree__img'/>
				: <RecommendPath handleClick={this.onCardClick} recommend={recommend} nodes={nodes}/>;
		return (<div className='tree'>
			<div className="container">
				{view}
			</div>
			<div className={`popup ${this.state.isPopupOpen ? 'open' : ''}`}>
				<div className="popup__title">Рекоммендуемые курсы</div>
				<div className="popup__list">
					<div className="popup__item offline">
						<div className="popup__item-logo" style={{backgroundImage: 'url(/static/Coursera-logo.png)'}}></div>
						<div className="popup__item-name">Теория вероятностей для начинающих</div>
					</div>
					<div className="popup__item offline">
						<div className="popup__item-logo" style={{backgroundImage: 'url(/static/openedu.png)'}}></div>
						<div className="popup__item-name">Теория вероятностей</div>
					</div>
					<div className="popup__item offline">
						<div className="popup__item-logo" style={{backgroundImage: 'url(/static/Stepik_logotype.png)'}}></div>
						<div className="popup__item-name">Теория вероятностей</div>
					</div>
					<div className="popup__item offline">
						<div className="popup__item-logo" style={{backgroundImage: 'url(/static/mephi.png)'}}></div>
						<div className="popup__item-name">Дискретный анализ и теория вероятностей</div>
					</div>
					<div className="popup__item offline">
						<div className="popup__item-logo" style={{backgroundImage: 'url(/static/mpti.png)'}}></div>
						<div className="popup__item-name">Теория вероятности</div>
					</div>
				</div>
			</div>
		</div>)
	}
}