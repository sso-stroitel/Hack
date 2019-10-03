import React from 'react';
import './style.scss';
import {EducationCard} from './Card';
import {Link} from 'react-router-dom';
import axios from 'axios';
import {ROOT_API} from '../../services/constants';
import {Header} from '../Header';
import connect from 'react-redux/es/connect/connect';

class Education extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			name: 'Анатолий Васильевич Карапузов',
			courses: [],
			finished_courses: [],
			notfinished_courses: []
		}

		this.user_id = this.props.match.params.id;
	}

	componentDidMount = () => {
		axios.get(`${ROOT_API}get_employees`, {
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
		}).then(data => { //console.log(data);
				this.setState({
					employer: data.data.find((el) => el.employee_id == this.user_id)
				})
			}
		).catch(err => console.log(err));

		axios.get(`${ROOT_API}assign_courses_for_employee/${this.user_id}`, {
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
		}).then(data => { //console.log(data);
				this.setState({
					courses: data.data,
					finished_courses: []
				});
				axios.get(`${ROOT_API}finished_courses/${this.user_id}`, {
					headers: {
						'Content-Type': 'application/json',
						"Access-Control-Allow-Origin": "*",
					},
				}).then(data => { //console.log(data);
					let arr = data.data;
					let finished = [];
					let notfinished = [];
					if (this.state.courses) {
						for (let i = 0; i < arr.length; i++) {
							let c = this.state.courses.find((a) => a.id == arr[i].course_id);
							if (c !== undefined) {
								c.finished = true;
								finished.push(c);
							}
						}
						for (let i = 0; i < this.state.courses.length; i++) {
							if (!this.state.courses[i].finished) {
								notfinished.push(this.state.courses[i]);
							}
						}
					}

					this.setState({
						finished_courses: finished,
						notfinished_courses: notfinished
					});
					console.log(this.state.courses);
				}).catch(err => console.log(err));
			}
		).catch(err => console.log(err));
		axios.get(`${ROOT_API}get_jira_task/${this.user_id}`, {
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
		}).then(data => { //console.log(data);
				this.setState({
					jira_task: data.data
				})
			}
		).catch(err => console.log(err));
		axios.get(`${ROOT_API}get_vacancy/${this.user_id}`, {
			headers: {
				'Content-Type': 'application/json',
				"Access-Control-Allow-Origin": "*",
			},
		}).then(data => {
				console.log(data);
				this.setState({
					vacancy: data.data[0]
				})
			}
		).catch(err => console.log(err));
	};

	componentWillReceiveProps(nextProps) {
		window.location.reload();
	}


	render() {
		const {employee} = this.props.employee;
		this.user_id = this.props.match.params.id;
		var procents = this.state.courses.length ? this.state.finished_courses.length / this.state.courses.length : 0;
		var proc_str = (procents * 100).toFixed(2) + "%";
		console.log(this);
		return (<div className='wrapper'>
			<div className="platform">
				<Header/>
				<div className="platform__main">
					<div className="navbar">
						<div className="projects__employee">
							<div onClick={this.toBack} className="to-back">Назад</div>
							<Link to={`/education/${employee.employee.employee_id}`}>
								<div className="projects__employee-photo"
										 style={{backgroundImage: 'url(' + employee.employee.photo + ')'}}/>
							</Link>
							<div className="projects__employee-name">{this.state.employer ? this.state.employer.name : ""}</div>
							<div className="projects__employee-spec">{employee.employee.spec}</div>
						</div>
					</div>
					<div className="employee-list__body">
						<h3>Активное направление</h3>
						<EducationCard props={{
							"header": this.state.vacancy ? this.state.vacancy.vacancy_name : "Тестировщик",
							"status": proc_str,
							"progress": proc_str,
							"content1": this.state.courses.length + " курса",
							"content2": "",
							"content3": ""
						}}/>
						<h3>Проекты и задачи</h3>
						<div className="projects">
							{this.state.jira_task ? (
								<EducationCard props={{
									"header": this.state.jira_task.task_name,
									"status": "",
									"progress": false,
									"content1": "Задание от тимлида",
									"content2": "JIRA",
									"content3": <a target='_blank' href={this.state.jira_task.link}>Перейти</a>
								}}/>
							) : ""}
						</div>
						<h3>Предстоит пройти</h3>
						<div className="targets">
							{this.state.notfinished_courses.map(course => (
								<EducationCard key={course.id} props={{
									"header": course.description,
									"status": "",
									"progress": false,
									"content1": course.type,
									"content2": "",
									"content3": <a target='_blank' href={course.link}>Перейти</a>
								}}/>
							))}
						</div>
						<h3>Пройдено</h3>
						<div className="completed">
							{this.state.finished_courses.map(course => (
								<EducationCard key={course.id} props={{
									"header": course.description,
									"status": "Пройдено!",
									"progress": false,
									"content1": course.type,
									"content2": "",
									"content3": ""
								}}/>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>)
	}
}

function mapStateToProps(state) {
	return {
		employee: state.employee,
	};
}

export default connect(mapStateToProps)(Education)
