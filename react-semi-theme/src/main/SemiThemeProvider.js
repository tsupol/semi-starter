import React, {PropTypes, Component} from 'react';
import injectTapEventPlugin from 'react-tap-event-plugin';
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import semiPrototypes from '../libs/semiPrototypes'; // !!! Do not delete, see the file and you will understand
// import {ajax, getAll} from '../api/ApiCall';

injectTapEventPlugin();

class SemiThemeProvider extends Component {

	constructor(props, context) {
		super(props, context);
		// todo: not hard-code serverUrl and access-token
		// this.serverUrl = `http://localhost/${devProjectName}/public/api/`;
		// this.access_token = 'todo';
	}

	// getChildContext() {
	//
	//     // todo: add default ajax method
	//     return {
	//         ajax: {
	//             call: (method, url, data) => {
	//                 return ajax(method, this.serverUrl + url, data, this.access_token);
	//             },
	//             getAll: (urls) => {
	//                 for(let i in urls) {
	//                     urls[i] = this.serverUrl + urls[i];
	//                 }
	//                 return getAll(urls, this.access_token);
	//             }
	//         }
	//     }
	// }
	//
	// componentWillReceiveProps(nextProps) {
	// }

	getChildContext() {
		return {
			ajax: {
				call: (method, url, data) => {
					return ajax(method, url, data, this.props.user.access_token);
				},
				getAll: (urls) => {
					return getAll(urls, this.props.user.access_token);
				}
			}
		}
	}

	render() {
		// console.log('render: app', this.props.user);
		return (
			<MuiThemeProvider muiTheme={getMuiTheme()}>
				<div>
					{this.props.children}
				</div>
			</MuiThemeProvider>
		);
	}
}

SemiThemeProvider.propTypes = {
	children: PropTypes.element,
	location: PropTypes.object,
	actions: PropTypes.object,
	user: PropTypes.object
};
SemiThemeProvider.childContextTypes = {
	ajax: PropTypes.object
};

export default SemiThemeProvider;