import React from 'react';
import './style.scss';
import Particles from 'react-particles-js';
import {Link} from 'react-router-dom';

export default class Main extends React.Component {
	render() {
		return (
			<div className='main'>
				<div className="main__info">
					<div className="main__text">Развивайся!</div>
					<div className="main__text2">Оставайся всегда востребованным...<br/>
																			Изучай новое и становись лучше!
					</div>
					<Link to='/signin' className="main__btn"><span>Начать
					</span><object type="image/svg+xml" data="static/btn.svg"/>
</Link>
				</div>
				<Particles height={'100vh'} width={'100vw'} params={{
					"particles": {
						"number": {
							"value": 80,
							"density": {
								"enable": true,
								"value_area": 700
							}
						},
						"color": {
							"value": "#ff0000"
						},
						"shape": {
							"type": "circle",
							"stroke": {
								"width": 0,
								"color": "#000000"
							},
							"polygon": {
								"nb_sides": 5
							},
						},
						"opacity": {
							"value": 0.5,
							"random": false,
							"anim": {
								"enable": false,
								"speed": 1,
								"opacity_min": 0.1,
								"sync": false
							}
						},
						"size": {
							"value": 3,
							"random": true,
							"anim": {
								"enable": false,
								"speed": 10,
								"size_min": 0.1,
								"sync": false
							}
						},
						"line_linked": {
							"enable": true,
							"distance": 150,
							"color": "#a22",
							"opacity": 0.4,
							"width": 1
						},
						"move": {
							"enable": true,
							"speed": 3,
							"direction": "none",
							"random": false,
							"straight": false,
							"out_mode": "out",
							"bounce": false,
							"attract": {
								"enable": false,
								"rotateX": 600,
								"rotateY": 1200
							}
						}
					}
				}}/>
			</div>
		)
	}
}
