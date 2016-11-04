import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';

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
		this.context.ajax.call("post", "submit", data, {files: ['files.face', 'files.body', 'files.normal', 'files.non-exists', 'files2']});
	};

	render() {
		let thumbnail = require('../assets/img/upload-thumbnail.png');
		let example = require('../assets/img/upload-example.png');
		let images = {
			face: [
				require('../assets/img/face1.jpg'),
				require('../assets/img/face2.jpg'),
				require('../assets/img/face3.jpg'),
				require('../assets/img/face4.jpg'),
				require('../assets/img/face5.jpg'),
				require('../assets/img/face6.jpg')
			]
		};
		let formTemplate = {
			values: {
				first_name: '',
				last_name: '',
				nick_name: '',
				facebook: '',
				instagram: '',
				email: '',
				youtube: '',
				website: '',
				lineID: '',
				whatappID: '',
				phone: '',
				mobile: '',
				job: '',
				interested_in: [],
				interested_in_liposuction_check: [],
				interested_in_other_check: [],
				interested_in_liposuction: '',
				interested_in_other: '',
				medical_histories: [],
				congenital_disease: '',
				current_drug: '',
				drug_symptom: '',
				files: []
			},
			components: [
				[
					{type: 'custom', element: <h3>Personal Information</h3>}
				],
				[
					{
						type: 'text', name: 'first_name', label: 'First Name'
					},
					{
						type: 'text', name: 'last_name', label: 'Last Name'
					},
					{
						type: 'text', name: 'nick_name', label: 'Nick Name'
					}
				],
				[
					{
						type: 'text', name: 'facebook', label: 'Facebook'
					},
					{
						type: 'text', name: 'instagram', label: 'Instagram'
					},
					{
						type: 'text', name: 'email', label: 'E-Mail'
					}
				],
				[
					{
						type: 'text', name: 'youtube', label: 'Youtube Channel'
					},
					{
						type: 'text', name: 'website', label: 'Website'
					},
					{
						type: 'text', name: 'lineID', label: 'Line ID'
					},
					{
						type: 'text', name: 'whatappID', label: 'WhatApp ID'
					}
				],
				[
					{
						type: 'text', name: 'phone', label: 'Phone'
					},
					{
						type: 'text', name: 'mobile', label: 'Mobile'
					}
				],
				[
					{
						type: 'text', name: 'job', label: 'Job'
					},
					{
						type: 'custom', element: <div style={{height: 72}}></div>
					}
				],
				[
					{
						type: 'custom', element: <div style={{height: 72}}></div>
					}
				],
				[
					{
						type: 'custom', element: <label>Interested in</label>, grid: {
							md: '30%'
						}
					},
					{
						type: 'checkbox', name: 'interested_in', multiple: true, showClearButton: false, options: [
							{id: 'eye', name: 'Eye'},
							{id: 'nose', name: 'Nose'},
							{id: 'breast', name: 'Breast'},
							{id: 'lip', name: 'Lip'},
							{id: 'hair', name: 'Hair'},
							{id: 'bags_under_the_eyes', name: 'Bags under the eyes'},
						], grid: {
							md: '70%'
						}
					}
				],
				[
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {
						md: '30%'
					}
					},
					{
						type: 'checkbox', name: 'interested_in_liposuction_check', multiple: true, showClearButton: false, options: [
							{id: 'liposuction', name: 'Iiposuction'},
						], grid: {
							md: '70%'
						}, onCheck: (v)=>{this.setState({interested_in_liposuction: v.length>0})}
					}
				],
				{
					settings: {
						hide: !this.state.interested_in_liposuction
					},
					items: [
						{
							type: 'custom', element: <div>&nbsp;</div>, grid: {
								md: '30%'
							}
						},
						{
							type: 'text', name: 'interested_in_liposuction', multiLine: true, grid: {
								md: '70%'
							}
						}
					]
				},
				[
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {
							md: '30%'
						}
					},
					{
						type: 'checkbox', name: 'interested_in_other_check', multiple: true, showClearButton: false, options: [
							{id: 'other', name: 'Other'}
						], grid: {
							md: '70%'
						}, onCheck: (v)=>{this.setState({interested_in_other: v.length>0})}
					}
				],
				{
					settings: {
						hide: !this.state.interested_in_other
					},
					items: [
						{
							type: 'custom', element: <div>&nbsp;</div>, grid: {
								md: '30%'
							}
						},
						{
							type: 'text', name: 'interested_in_other', multiLine: true, grid: {
								md: '70%'
							}
						}
					]
				},
				[
					{
						type: 'custom', element: <div style={{height: 72}}></div>
					}
				],
				[
					{type: 'custom', element: <div><h3>Medical Information</h3><h4>Medical histories</h4></div>}
				],
				...Array.from(Array(5), (v, k) => ([
					{
						type: 'custom', element: <div  style={{height: '72px', textAlign: 'right'}}><label style={{position: 'relative', top: '50%'}}>{k+1}</label></div>
					},
					{
						type: 'text', multiLine: true, label: 'What', name: `medical_histories[${k}][what]`
					},
					{
						type: 'text', multiLine: true, label: 'Where', name: `medical_histories[${k}][where]`
					},
					{
						type: 'text', multiLine: true, label: 'Doctor', name: `medical_histories[${k}][doctor]`
					},
					{
						type: 'text', multiLine: true, label: 'Duration', name: `medical_histories[${k}][duration]`
					}
				])),
				[
					{
						type: 'text', multiLine: true, label: 'Congenital Disease', name: 'congenital_disease'
					},
					{
						type: 'text', multiLine: true, label: 'Current Drug', name: 'current_drug'
					},
					{
						type: 'text', multiLine: true, label: 'Drug Symptom', name: 'drug_symptom'
					}
				],
				[
					{
						type: 'text', multiLine: true, label: 'Need', name: 'need', grid: {
							md: '50%'
						}
					}
				],
				[
					{
						type: 'text', multiLine: true, label: 'Note', name: 'note'
					},
					{
						type: 'custom', element: <div style={{height: 72}}></div>
					}
				],
				[
					{
						type: 'custom', element: <div style={{height: 72}}></div>
					}
				],
				[
					...Array.from(Array(6), (v, k) => (
						{
							type: 'uploadbox', name: `files[face][${k}]`, thumbnail, example: images.face[k]
						}
					))
				],
				[
					...Array.from(Array(6), (v, k) => (
						{
							type: 'uploadbox', name: `files[body][${k}]`, thumbnail, example
						}
					))
				],
				[
					...Array.from(Array(6), (v, k) => (
						{
							type: 'uploadbox', name: `files[normal][${k}]`, thumbnail, example
						}
					))
				],
				[
					{
						type: 'uploadbox', name: `files2`, thumbnail, example
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
									<SemiForm formTemplate={formTemplate} onChange={this.handleFormChange} onSubmit={this.submit} />
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
