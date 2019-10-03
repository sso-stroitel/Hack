import React from 'react';
import './style.scss';
import {Header} from '../Header';
import EmployeeList from '../EmployeeList';
import EmployeeProjects from '../EmployeeProjects'

export default class HrPlatform extends React.Component {
	constructor(props) {
		super(props)
	}

	render() {
		const {isMain} = this.props;
		return (
			<div className='wrapper'>
				<div className="platform">
					<Header/>
						{
							isMain ? <EmployeeList {...this.props}/> : <EmployeeProjects {...this.props}/>
						}
				</div>
			</div>
		)
	}
}
