import React from 'react';
import './style.scss';
import {NavBar} from '../Nav';
import axios from 'axios';
import connect from 'react-redux/es/connect/connect';
import {dispatchEmployee} from '../../store/actions/employee';
import {ROOT_API} from '../../services/constants';

class EmployeeList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeNav: 'employees',
			employees: []
		}
	}

	componentDidMount = () => {
		axios.get(`${ROOT_API}get_employees`, {
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
		}).then(data =>
			this.setState({
				employees: data.data.sort((a, b) => b.firing - a.firing)
			})
		).catch(err => console.log(err))
	};

	handleClick = (name) => {
		this.setState({
			activeNav: name
		})
	}

	onEmployeeClick = (employee) => {
		this.props.dispatchEmployee(employee);
		this.props.history.push("/hr/projects");
	};

	render() {
		return (
			<div className="platform__main">
				<div className="navbar">
					<NavBar handleClick={this.handleClick} isActive={this.state.activeNav === 'employees'} name='employees'
									title='Сотрудники'/>
					<NavBar handleClick={this.handleClick} isActive={this.state.activeNav === 'teams'} name='teams'
									title='Команды'/>
				</div>
				<div className="employee-list__body">
					<div className="employee-list__table">
						<div className="employee-list__item is-head">
							<span className='employee-list__item-id'>Таб. номер</span>
							<span className='employee-list__item-name'>ФИО</span>
							<span className='employee-list__item-department'>Подразделение</span>
							<span className='employee-list__item-spec'>Профессия</span>
							<span className='employee-list__item-time'>Стаж в месяцах</span>
							<span className='employee-list__item-firing'>Вероятность увольнения</span>
						</div>
						{this.state.employees.map(employee => (
							<div className={`employee-list__item ${employee.firing > 0.89 ? 'is-red' : employee.firing > 0.49 ? 'is-yellow' : ''}`} onClick={() => this.onEmployeeClick(employee)} key={employee.employee_id}>
								<span className='employee-list__item-id'>{employee.employee_id}</span>
								<span className='employee-list__item-name'>{employee.name}</span>
								<span className='employee-list__item-department'>{employee.department}</span>
								<span className='employee-list__item-spec'>{employee.spec}</span>
								<span className='employee-list__item-time'>{employee.time}</span>
								<span className='employee-list__item-firing'>{employee.firing * 100}%</span>
							</div>
						))}
					</div>
				</div>
			</div>
		)
	}
}


function mapStateToProps(state) {
	return {
		employee: state.employee,
	};
}

export default connect(mapStateToProps, {dispatchEmployee})(EmployeeList)
