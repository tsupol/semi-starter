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