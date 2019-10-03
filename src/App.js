import React from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {authUser, updateUser} from "./store/actions/auth";
import Auth from './components/Auth';
import Main from './components/Main';
import Tree from './components/Tree';
import HrPlatform from './components/HrPlatform';
import Education from './components/Education';

const App = (props) => {
	const {authUser, errors, removeError, currentUser, updateUser} = props;
	return (<div>
			<Route path='/' exact render={props => {
				return (<Main onAuth={authUser} signUp errors={errors} {...props}/>)
			}
			}/>
			<Route path='/signin/' render={props => {
				return (<Auth onAuth={authUser} signUp errors={errors} {...props}/>)
			}
			}/>
			<Route path='/tree/' render={props => {
				return (<Tree onAuth={authUser} signUp errors={errors} {...props}/>)
			}
			}/>
			<Route path='/hr/employees' render={props => {
				return (<HrPlatform isMain={true} onAuth={authUser} error={errors} {...props}/>)
			}} />
			<Route path='/hr/projects' render={props => {
				return (<HrPlatform isMain={false} onAuth={authUser} error={errors} {...props}/>)
			}} />
			<Route path='/education/:id' render={props => {
				return (<Education onAuth={authUser} signUp errors={errors} {...props}/>)
			}
			}/>
		</div>
	)
};

function mapStateToProps(state) {
	return {
		currentUser: state.currentUser,
		errors: state.errors
	};
}


export default withRouter(
	connect(mapStateToProps, {authUser, updateUser})(App)
);
