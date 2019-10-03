import React from 'react';
import './style.scss';
import connect from 'react-redux/es/connect/connect';
import axios from 'axios';
import {ROOT_API} from '../../services/constants';
import {dispatchTrajectory} from '../../store/actions/trajectory';
import {dispatchProject} from '../../store/actions/project';
import {Link} from 'react-router-dom';

class EmployeeProjects extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			vacancies: [],
			projects: [],
			mode: 'init',
			activeCard: {}
		}
	}

	componentDidMount() {
		axios.get(`${ROOT_API}get_vacancies`, {
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
		}).then(data => {
				this.setState({
					vacancies: data.data
				});
				this.props.dispatchTrajectory(data.data);
				axios.get(`${ROOT_API}get_projects`, {
					headers: {
						'Content-Type': 'application/json',
						"Access-Control-Allow-Origin": "*",
					},
				}).then(data => {
						this.setState({
							projects: data.data.reduce((acc, val) => {
								val.vacancies = this.state.vacancies.filter(item => item.vacancy_id === val.vacancy_id)[0];
								val.languages = JSON.parse(val.languages);
								acc.push(val);
								return acc
							}, [])
						});
						this.props.dispatchProject(data.data)
					}
				).catch(err => console.log(err))
			}
		).catch(err => console.log(err));
	}

	toBack = () => {
		this.props.history.push("/hr/employees");
	};

	onCardClick = (project) => {
		this.setState({
			mode: 'hide',
			activeCard: project
		})
		// axios.post(`${ROOT_API}lol`, {
		// 	project_id: project.project_id,
		// 	vacancy_id: project.vacancy_id,
		// 	employee_id: this.props.employee.employee.employee.employee_id
		// }, {
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 		"Access-Control-Allow-Origin": "*",
		// 	},
		// }).then(data =>
		// 	console.log(data)
		// ).catch(err => console.log(err))
	};

	onHideClick = () => {
		this.setState(prevState => ({
			mode: prevState.mode === 'hide' ? 'open' : 'hide'
		}))
	}

	render() {
		const {employee} = this.props.employee;
		const {projects, mode, activeCard} = this.state;
		let teammates;
		if (mode !== 'init') {
			teammates = JSON.parse(activeCard.user_info).slice(0, 6);
		}
		return (
			<div className='platform__main'>
				<div className="navbar">
					<div className="projects__employee">
						<div onClick={this.toBack} className="to-back">Назад</div>
						<Link to={`/education/${employee.employee.employee_id}`}>
						<div className="projects__employee-photo"
								 style={{backgroundImage: 'url(' + employee.employee.photo + ')'}}/> </Link>
						<div className="projects__employee-name">{employee.employee.name}</div>
						<div className="projects__employee-spec">{employee.employee.spec}</div>
					</div>
				</div>
				<div className="employee-list__body">
					<div className="projects__wrapper">
						<div className="projects__cards-wrapper">
							<div className={`projects__cards ${mode === 'hide' ? 'is-hided' : 'is-open'}`}>
								{projects.map(project => (
									<div className={`projects__card ${project.project_id === activeCard.project_id ? 'active' : ''}`}
											 onClick={() => this.onCardClick(project)} key={project.project_id}>
										<div className='projects__card-title'>{project.vacancies.vacancy_name}</div>
										<div className="projects__card-command">{project.project_name}</div>
										<div className="projects__card-meta">
											<div className="projects__card-time">
												<div className="projects__card-time-icon"/>
												<div className="projects__card-time-value">{project.vacancies.retraining_duration}</div>
											</div>
											<div className="projects__card-grade">
												{project.vacancies.grade === '1' ? <span></span> : <div><span></span><span></span></div>}
											</div>
											<div className="projects__card-cost">
												<div className="projects__card-cost-icon"/>
												<div className="projects__card-cost-value">{project.vacancies.retraining_cost}</div>
											</div>
										</div>
									</div>))}
							</div>
							{mode === 'init' ? '' :
								<div onClick={this.onHideClick} className={`hide-btn ${mode === 'hide' ? '' : 'open'}`}/>}
						</div>
						{mode === 'init' ? '' : <div className={`projects__detail ${mode === 'hide' ? '' : 'hidden'}`}>
							<div className="projects__col">
								<div className="projects__title"><p>Название вакансии</p>{activeCard.vacancies.vacancy_name}</div>
								<div className="projects__description"><p>Описание вакансии</p>{activeCard.vacancies.responabilities}
								</div>
								<div className="projects__salary"><p>Зар. плата</p>{activeCard.vacancies.salary} т.р.</div>
								<div className="projects__comparison">Стоимость найма: {activeCard.vacancies.retraining_cost} т.р.</div>
							</div>
							<div className="projects__col">
								<div className="projects__team"><p>Название команды</p>{activeCard.project_name}</div>
								<p>Команда</p>
								<div className="projects__photos">
									{teammates.map((user, i) => <div className='projects__photo'
																									 style={{backgroundImage: 'url(' + user + ')'}} key={i}/>)}
								</div>
								<div className="projects__stack">
									<p>Стек</p>
									{Object.keys(activeCard.languages).map(lang => <div className='projects__stack-item'>
										<span>{lang}</span>: <span>{Math.ceil(activeCard.languages[lang])}</span>
									</div>)}
								</div>
								<div className="projects__comparison">Стоимость переобучения: {activeCard.all_courses_price} т.р.</div>
							</div>
							<div onClick={this.onSubmit} className="projects__btn">Назначить</div>
						</div>}
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

export default connect(mapStateToProps, {dispatchTrajectory, dispatchProject})(EmployeeProjects)
