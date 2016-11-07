import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import defaultForm from '../settings/defaultForm';

class HomePage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			interested_in_liposuction: false,
			interested_in_other: false
		};
	}

	componentWillMount() {
		this.initialized();
	}

	initialized = () => {
		return true;
		// let taskReady = this.props.actions.getScheduleTasks(true);
		// let eventsStatusReady = this.props.actions.getScheduleEventsStatus(true);
		// return taskReady && eventsStatusReady;
	};

	handleFormChange = (data)=> {

	};

	submit = (data)=> {
		this.context.ajax.call("post", "submit", data, {files: ['files.face', 'files.body', 'files.normal']});
	};

	render() {
		let formTemplate = defaultForm(this);
		return (
			<div>
				<PageHeading title="Home" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel title="Home">
								<div className="con-pad">
									<SemiForm formTemplate={formTemplate} buttonAlign="center" onChange={this.handleFormChange} onSubmit={this.submit} />
								</div>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

// const mapStateToProps = ({user, notification}) => ({user, notification});
// const mapDispatchToProps = (dispatch) => ({
//   actions: {
//     getScheduleTasks: bindActionCreators(notificationActions.getScheduleTasks, dispatch),
//     getScheduleEventsStatus: bindActionCreators(notificationActions.getScheduleEventsStatus, dispatch)
//   }
// });
// export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
HomePage.contextTypes = {
	ajax: PropTypes.object
};
export default HomePage;
