import React from 'react';
import './style.scss';
import {Input} from '../FormControls/Input';
import {validationText} from '../../services/validation'
import Particles from 'react-particles-js';


export default class Auth extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			isEmployee: true,
			email: '',
			pass: '',
			isErrorShow: false,
			validEmail: '',
			validPass: '',
		}
	}

	onToggleChange = () => {
		this.setState(prevState => ({
			isEmployee: !prevState.isEmployee,
			email: '',
			pass: '',
			isErrorShow: false,
			validEmail: '',
			validPass: '',
		}))

	};

	onInputChange = ({target}) => {
		this.setState({
			[target.name]: target.value
		}, () => {
			if (this.state.isErrorShow) {
				this.validText();
			}
		});
	};

	validText = () => {
		const {email, pass} = this.state;
		this.setState({
			validPass: pass.length < 6 ? validationText.wrongPassword : '',
			validEmail: !/\S+@\S+\.\S+/.test(email) ? validationText.wrongEmail : '',
		})
	};

	onSubmit = (ev) => {
		ev.preventDefault();
		const data = {
			login: this.state.email,
			password: this.state.pass,
		};
		this.props
			.onAuth("authentication", data)
			.then(() => {
				if(this.state.isEmployee)
					this.props.history.push("/hr/employees");
				else
				  this.props.history.push("/education/7000122");
			})
			.catch(() => {
				return;
			});

	};

	render() {
		return <div className='login'>
			<form onSubmit={this.onSubmit} className="login__form">
				<div className="login__choices">
					<div>
						<input defaultChecked type="radio" name='role' id='hr-login' value='student' onChange={this.onToggleChange}/>
						<label className="login__student" htmlFor="hr-login">Я HR</label>
					</div>
					<div>
						<input type="radio" name='role' id='reg-employee' value='employee' onChange={this.onToggleChange}/>
						<label htmlFor="reg-employee" className="login__employee">Я работник</label>
					</div>
				</div>
				<Input validText={this.state.validEmail} label='Email' name='email' onChange={this.onInputChange}
							 value={this.state.email}/>
				<Input validText={this.state.validPass} label='Пароль' name='pass' type='password'
							 onChange={this.onInputChange} value={this.state.pass}/>
				<button type='submit' className='login__submit'>Войти &gt;&gt;</button>
			</form>

			<Particles className="particles" height={'100vh'} width={'100vw'} params={{
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
	}
}
