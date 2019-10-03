import React from 'react';
import './style.scss';

export class ProgressRing extends React.Component {
	constructor(props) {
		super(props);

		const { radius, stroke } = this.props;

		this.normalizedRadius = radius - stroke * 2;
		this.circumference = this.normalizedRadius * 2 * Math.PI;
	}

	render() {
		const { radius, stroke, progress } = this.props;

		const strokeDashoffset = this.circumference - progress / 100 * this.circumference;

		return (
			<svg
				className='circle'
				height={radius * 2}
				width={radius * 2}
			>
				<circle
					stroke="#1ECD97"
					fill="transparent"
					strokeWidth={ stroke }
					strokeDasharray={ this.circumference + ' ' + this.circumference }
					style={ { strokeDashoffset, opacity: progress / 100 - 0.3  } }
					stroke-width={ stroke }
					r={ this.normalizedRadius }
					cx={ radius }
					cy={ radius }
				/>
				<circle className='circle__inner' fill='#57DAB2' cx={ radius }
								cy={ radius } r={this.normalizedRadius - stroke - 3}/>
			</svg>
		);
	}
}