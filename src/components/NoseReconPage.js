import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import commonForm from '../settings/commonForm';

class NoseReconPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
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
		this.context.ajax.call("post", "submit", data, {files: ['files']});
	};

	render() {
		let thumbnail = require('../assets/img/upload-thumbnail.png');
		let example = require('../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let components = [
			[
				{type: 'custom', element: <h3>Information</h3>}
			],
			[
				{
					type: 'radio', name: 'nose_surgery_history', options: [
					{id: 'no', name: 'No, Never have nose surgery.'},
					{id: 'yes', name: 'Yes, Ever did before.'}
				]
				}
			],
			[
				{type: 'custom', element: <h3>Medical histories</h3>}
			],
			[
				{
					type: 'checkbox', name: 'medical_histories', options: [
					{id: 'allergy', name: 'Allergy'},
					{id: 'nasal_congestion', name: 'Nasal congestion'},
					{id: 'sinusitis', name: 'Sinusitis'},
					{id: 'accident', name: 'Accident'}
				]
				}
			],
			[
				{type: 'custom', element: <h3>Nose condition</h3>}
			],
			...Array.from(Array(6), (v, k)=>([
				{
					type: 'custom', element: <div>Condition {k+1}</div>, grid: {md: '50%'}
				},
				{
					type: 'radio', name: `nose_conditions[${k}]`, options: [
					{id: 'low', name: 'Low'},
					{id: 'medium', name: 'Medium'},
					{id: 'crisis', name: 'Crisis'},
				]
				}
			])),
			[
				{type: 'custom', element: <h3>Personal condition</h3>}
			],
			...Array.from(Array(2), (v, k)=>([
				{
					type: 'custom', element: <div>Condition {k+1}</div>, grid: {md: '50%'}
				},
				{
					type: 'radio', name: `personal_conditions[${k}]`, options: [
					{id: 'no', name: 'No'},
					{id: 'yes', name: 'Yes'}
				]
				}
			]))
		];
		let formTemplate = commonForm(this, images, {components});
		return (
			<div>
				<PageHeading title="Forehead" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel title="Forehead">
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
NoseReconPage.contextTypes = {
	ajax: PropTypes.object
};
export default NoseReconPage;