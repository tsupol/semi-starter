import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import Paper from 'material-ui/Paper';
import {login, isAuthenticated, getError} from '../actions/userActions';
import {Alert} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';

class LoginPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.errorMessages = {
			wordsError: "Please only use letters",
			numericError: "Please provide a number",
			urlError: "Please provide a valid URL"
		};
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.error) this.refs.alert.open([nextProps.user.error, 'Login Failed!']);
	}

	componentWillMount() {
		// fix: wrong password no alert (for hashHistory)
		this.context.router.push('/login');
	}

	onSubmit = (data) => {
		// console.log('data', data);
		this.props.actions.login(data.username, data.password).then((json)=> {
			console.log('json', json, this.props.user.error);
			if (this.props.actions.isAuthenticated()) {
				this.context.router.replace(this.props.routing.locationBeforeTransitions.query.ref || '/');
			}
		});
	};

	render() {
		let isTestServer = window.location.host.indexOf('schedule.mspinfo') < 0;
		// console.log('window.location.host', window.location.host);
		let formTemplate = {
			data: {},
			values: {username: '', password: ''},
			settings: {showClear: false},
			// values: {username: 'sale1', password: 'asdfasdf'},
			components: isTestServer ?
				[
					[{
						type: 'text',
						name: 'username',
						label: 'Username (admin, organizer1, sale1)',
						required: true,
						hint: 'your username or email',
						validations: 'isAlphanumeric'
					}],
					[{type: 'password', name: 'password', label: 'Password (password)', required: true}]
				] : [
				[{
					type: 'text',
					name: 'username',
					label: 'Username',
					required: true,
					hint: 'your username or email',
					validations: 'isAlphanumeric'
				}],
				[{type: 'password', name: 'password', label: 'Password', required: true, autocomplete: 'off'}]
			]
		};

		return (
			<Grid className="center">
				<Alert ref='alert'/>
				<Row className="center-inner">
					<Col xs mdOffset={2} md={8} lgOffset={4} lg={4}>
						<Paper>
							<AppBar
								title="Login"
								showMenuIconButton={false}/>
							<SemiForm onSubmit={this.onSubmit} style={{padding: '16px 24px'}} formTemplate={formTemplate}/>
						</Paper>
					</Col>
				</Row>
			</Grid>
		);
	}
}

LoginPage.propTypes = {
	actions: PropTypes.object.isRequired,
	routing: PropTypes.object.isRequired
};
LoginPage.contextTypes = {
	router: PropTypes.object.isRequired
};

const mapStateToProps = ({user, routing}) => ({user, routing});
const mapDispatchToProps = (dispatch) => ({
	actions: {
		getError: bindActionCreators(getError, dispatch),
		login: bindActionCreators(login, dispatch),
		isAuthenticated: bindActionCreators(isAuthenticated, dispatch)
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
