import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import commonForm from '../settings/commonForm';

class CheekBulgePage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ever_did_surgery_before_check: false,
			before_know_details: ''
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
						{id: 'no', name: 'No, Never have surgery.'},
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
						type: 'custom', element: <div  style={{height: '72px'}}><label>Know the detail</label></div>, grid: {md: '30%'}
					},
					{
						type: 'radio', name: 'before_know_details', showClearButton: false, options: [
						{id: 'yes', name: 'Yes'},
						{id: 'no', name: 'No'}
					], onCheck: (v)=> this.setState({before_know_details: v})
					}
				]
			},
			{
				settings: {
					hide: this.state.before_know_details != 'yes'
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'brand', multiLine: true, label: 'Brand', grid: {md: 'calc((100% / 2) - (30% / 2))'}
					},
					{
						type: 'text', name: 'count', multiLine: true, label: 'How many times', grid: {md: 'calc((100% / 2) - (30% / 2))'}
					}
				]
			},
			{
				settings: {
					hide: this.state.before_know_details != 'yes'
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'last_time', multiLine: true, label: 'Last time', grid: {md: 'calc((100% / 3) - (30% / 3))'}
					},
					{
						type: 'text', name: 'volume', multiLine: true, label: 'Volume', grid: {md: 'calc((100% / 3) - (30% / 3))'}
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: 'Place / Doctor', grid: {md: 'calc((100% / 3) - (30% / 3))'}
					}
				]
			},
			{
				settings: {
					hide: this.state.before_know_details != 'no'
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'count', multiLine: true, label: 'How many times', grid: {md: '70%'}
					}
				]
			},
			{
				settings: {
					hide: this.state.before_know_details != 'no'
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'last_time', multiLine: true, label: 'Last time', grid: {md: 'calc((100% / 2) - (30% / 2))'}
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: 'Place / Doctor', grid: {md: 'calc((100% / 2) - (30% / 2))'}
					}
				]
			}
		];
		let formTemplate = commonForm(this, images, {components});
		return (
			<div>
				<PageHeading title="Cheek Bulge" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel title="Cheek Bulge">
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
CheekBulgePage.contextTypes = {
	ajax: PropTypes.object
};
export default CheekBulgePage;

