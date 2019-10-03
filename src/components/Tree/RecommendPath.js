import React from 'react';
import {Node} from '../Node';

export const RecommendPath = (props) => {
	return(<div>
		{props.nodes.map((node, key) => (<Node key={key} title={node.title} isLast={key===props.nodes.length - 1} progress={node.progress}/>))}
		<div className="tree__carousel-wrap">
			<div className="tree__carousel">
				{props.recommend.firstLvl.map((val, key) => (<div onClick={e => props.handleClick(e, val)} key={key} className={`tree__carousel-card ${val.isPrior ? 'prior' : ''}`} >{val.title}</div>))}
			</div>
			<div className="tree__carousel-name">1</div>
		</div>
		<div className="tree__carousel-wrap">
			<div className="tree__carousel">
				{props.recommend.secondLvl.map((val, key) => (<div key={key} className={`tree__carousel-card ${val.isPrior ? 'prior' : ''}`} >{val.title}</div>))}
			</div>
			<div className="tree__carousel-name">2</div>
		</div>
	</div>)
}