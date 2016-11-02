import React, {PropTypes, Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as userActions from '../actions/userActions';
import {SemiThemeProvider, SemiLayout} from 'react-semi-theme';
import {ajax, getAll} from '../api/ApiCall';
import semiThemeSettings from './../settings/semiThemeSettings';

class App extends Component {

	/**
	 * SemiTheme requires you to manually specify `ajax` context
	 */
	getChildContext() {
		return {
			ajax: {
				call: (method, url, data) => {
					return ajax(method, url, data);
				},
				getAll: (urls) => {
					return getAll(urls);
				}
			}
		}
	}
	
	render() {
		// todo: you can replace `SemiLayout` with your own layout or just use `this.props.children`
		let component = <SemiLayout appBarTitle="Starters"
									children={this.props.children}
									location={this.props.location}
									settings={{
											toolbarTitle: 'Semi Starter',
											navTitle: 'Navigations'
										}}
									actions={this.props.actions}/>;

		// component = this.props.children;

		// You can toggle between having user to log in or not
		if (semiThemeSettings.hasAuthentication) {
			if (this.props.user.access_token) {
			}
			else if (this.props.user.authenticating || this.props.user.error || !this.props.user.access_token) {
				component = this.props.children;
			}
			else {
				component = <Loading />;
			}
		}
		return (
			<SemiThemeProvider settings={semiThemeSettings}>
				<div>
					{component}
				</div>
			</SemiThemeProvider>
		);
	}
}

App.propTypes = {
	children: PropTypes.element
};

App.childContextTypes = {
	ajax: PropTypes.object // required by SemiTheme
};

const mapStateToProps = ({user}) => ({user});
const mapDispatchToProps = (dispatch) => ({
	actions: {
		user: {
			login: bindActionCreators(userActions.login, dispatch),
			logout: bindActionCreators(userActions.logout, dispatch),
			isAuthenticated: bindActionCreators(userActions.isAuthenticated, dispatch)
		}
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
