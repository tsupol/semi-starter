import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';

class HomePage extends Component {
	constructor(props, context) {
		super(props, context);
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

	submit = (data)=> {
		console.log(data);
	};

	render() {
		let formTemplate = {
			components: [
				[
					{
						type: 'uploadbox', name: 'face[0]'
					},
					{
						type: 'uploadbox', name: 'face[1]'
					},
					{
						type: 'uploadbox', name: 'face[2]'
					},
					{
						type: 'uploadbox', name: 'face[3]'
					},
					{
						type: 'uploadbox', name: 'face[4]'
					},
					{
						type: 'uploadbox', name: 'face[5]'
					}
				]
			]
		};
		return (
			<div>
				<PageHeading title="Home" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel title="Home">
								<div className="con-pad">
									<p>This is panel widget. Title is optional. Test pull request. 1234</p>
									<SemiForm formTemplate={formTemplate} onSubmit={this.submit} />
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
