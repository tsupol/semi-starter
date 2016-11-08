import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import commonForm from '../settings/commonForm';

class BreastPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ever_did_surgery_before_check: false,
			any_children_check: false
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
					type: 'radio', name: 'nose_surgery_history', showClearButton: false, options: [
						{id: 'no', name: 'No, Never have breast surgery.'},
						{id: 'yes', name: 'Yes, Ever did before.'}
					], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes'})
				}
			],
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'numeric', name: 'surgery_count_before', label: 'How many time'
					}
				]
			},
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'text', name: 'surgery_type', label: 'Type', multiLine: true
					}
				]
			},
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'text', name: 'size', label: 'Size'
					},
					{
						type: 'text', name: 'brand', label: 'Brand'
					}
				]
			},
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'text', name: 'place_or_doctor', label: 'Place / Doctor'
					},
					{
						type: 'text', name: 'duration', label: 'Duration'
					}
				]
			},
			[
				{type: 'custom', element: <h3>Information</h3>}
			],
			[
				{type: 'custom', element: <b>Activities</b>},
				{type: 'custom', element: <b>Occupation</b>},
				{type: 'custom', element: <b>Type Implant</b>}
			],
			[
				{type: 'custom', element: <div style={{height: '16px'}}></div>}
			],
			[
				{
					type: 'checkbox', name: 'activities', showClearButton: false, options: [
						{id: 'fitness_or_yoga', name: 'Fitness / Yoga'},
						{id: 'swimming', name: 'Swimming'},
						{id: 'running', name: 'Running'},
						{id: '...', name: '.......'}
					]
				},
				{
					type: 'radio', name: 'occupation', showClearButton: false, options: [
						{id: 'pretty_model', name: 'Pretty / Model'},
						{id: 'officer', name: 'Officer'},
						{id: 'student', name: 'Student'},
						{id: 'business_owner', name: 'Business Owner'}
					]
				},
				{
					type: 'radio', name: 'type_implant', showClearButton: false, options: [
						{id: 'round', name: 'Round'},
						{id: 'teardrop', name: 'Teardrop'}
					]
				}
			],
			[
				{type: 'custom', element: <h3>Do you have any children</h3>}
			],
			[
				{
					type: 'radio', name: 'any_children', showClearButton: false, options: [
					{id: 'no', name: 'No, I don\'t.'},
					{id: 'yes', name: 'Yes, I have.'}
				], onCheck: (v)=> this.setState({any_children_check: v=='yes'})
				}
			],
			{
				settings: {
					hide: !this.state.any_children_check
				},
				items: [
					{
						type: 'numeric', name: 'child_age', label: 'Age of last child'
					},
					{
						type: 'numeric', name: 'child_count', label: 'Number of child'
					}
				]
			},
		];
		let formTemplate = commonForm(this, images, {components});
		return (
			<div>
				<PageHeading title="Breast" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel title="Breast">
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
BreastPage.contextTypes = {
	ajax: PropTypes.object
};
export default BreastPage;

