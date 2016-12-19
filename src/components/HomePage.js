import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
//import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {SemiGrid, Row, Col} from 'react-semi-theme/grid';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

const
	grid1 = {xs: '100%'},
	grid2 = {xs: '100%', sm: '50%'},
	grid3 = {xs: '100%', sm: '33.33%'},
	grid4 = {xs: '100%', sm: '50%', md: '25%'},
	grid6 = {xs: '100%', sm: '50%', md: '16.66%'},
	grid7 = {xs: '100%', sm: '50%', md: '14.28%'},
	uploadGrid = {xs: '100%', sm: '33.33%', md: '16.66%'},
	marginBottomStyle = {marginBottom: 24};

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
		//this.context.ajax.call("post", "submit", data, {files: ['files.face', 'files.body', 'files.normal']}).then((data)=>{
		//	this.context.dialog.alert("ขอขอบพระคุณที่ให้ความสนใจกับทางเรา ทางเราจะทำการติดต่อถึงท่านเร็วๆนี้", "ทางเราได้รับข้อมูลเรียบร้อย", "success", ()=>{
		//		window.location.reload();
		//	});
		//});
		this.context.ajax.call("post", "submit", data, {files: ['files.face', 'files.body', 'files.normal']}).then((res)=> {
			this.context.router.push('/submitted');
		});
	};

	render() {
		let {hostname} = window.location;
		let isOnlineConsult = (hostname.match(/localhost/g) || hostname.match(/mspinfo.net/g)) ? true : false;
		let thumbnail = require('../assets/img/upload-thumbnail.png');
		let example = require('../assets/img/upload-example.png');
		let images = {
			face: Array.from(Array(6), (v, k)=>require(`../assets/img/pr/face/face${k+1}.jpg`)),
			body: Array.from(Array(6), (v, k)=>require(`../assets/img/pr/body/0${k+1}.png`)),
			normal: Array.from(Array(6), (v, k)=>require(`../assets/img/pr/normal/0${k+1}.png`))
		};

		let formTemplate = {
			components: [
				[
					{type: 'custom', element: <SemiHeader size={2} style={{marginTop: 16}}>{this.context.translate('personal_information')}</SemiHeader>}
				],
				[
					{type: 'text', name: 'first_name', label: this.context.translate('first_name'), grid: grid3},
					{type: 'text', name: 'last_name', label: this.context.translate('last_name'), grid: grid3},
					{type: 'text', name: 'nick_name', label: this.context.translate('nick_name'), grid: grid3}
				],
				[
					{type: 'text', name: 'facebook', label: "Facebook", grid: grid3},
					{type: 'text', name: 'instagram', label: 'Instagram', grid: grid3},
					{type: 'text', name: 'email', label: 'E-Mail', grid: grid3}
				],
				[
					{type: 'text', name: 'youtube', label: "Youtube Channel", grid: grid4},
					{type: 'text', name: 'website', label: 'Website', grid: grid4},
					{type: 'text', name: 'lineID', label: 'Line ID', grid: grid4},
					{type: 'text', name: 'whatappID', label: 'WhatApp ID', grid: grid4}
				],
				[
					{type: 'numeric', name: 'phone', label: this.context.translate('phone'), grid: grid3},
					{type: 'numeric', name: 'mobile', label: this.context.translate('mobile'), grid: grid3},
					{type: 'text', name: 'job', label: this.context.translate('job'), grid: grid3}
				],
				[
					{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>{this.context.translate('interested_in')}</SemiHeader>}
				],
				{
					items: [
						{
							type: 'checkbox', name: 'interested_in', horizontal: true, showClearButton: false, options: [
								{id: 'ตา', name: this.context.translate('eyes'), grid: grid7},
								{id: 'จมูก', name: this.context.translate('nose'), grid: grid7},
								{id: 'หน้าอก', name: this.context.translate('breast'), grid: grid7},
								{id: 'ปาก', name: this.context.translate('lips'), grid: grid7},
								{id: 'ผม', name: this.context.translate('hair'), grid: grid7},
								{id: 'ถุงได้ตา', name: this.context.translate('bags_under_the_eyes'), grid: {xs: '100%', sm: '50%', md: '28.6%'}},
								{id: 'interested_in_liposuction_check', name: this.context.translate('interested_in_liposuction_check'), grid: grid1, belowInput: {
									type: 'text', name: 'interested_in_liposuction', hint: this.context.translate('please_specify')
								}},
								{id: 'interested_in_other_check', name: this.context.translate('others'), grid: grid1, belowInput: {
									type: 'text', name: 'interested_in_other', hint: this.context.translate('please_specify')
								}}
							], grid: {
								md: '100%'
							}
						}
					]
				},
				[
					{type: 'custom', element: <div>
						<SemiHeader size={2}>{this.context.translate('medical_information')}</SemiHeader>
						<SemiHeader line="solid" style={{marginTop: 8}}>{this.context.translate('medical_histories')}</SemiHeader>
					</div>}
				],
				...Array.from(Array(5), (v, k) => ([
					{type: 'label', label:`${k+1}.`, grid: {
						xs: '100%', smAlign: 'right', sm: '64px'
					}},
					{
						type: 'text', multiLine: true, label: this.context.translate('medical_histories:what'), name: `medical_histories[${k}][what]`, grid: {
							xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
						}
					},
					{
						type: 'text', multiLine: true, label: this.context.translate('place'), name: `medical_histories[${k}][place]`, grid: {
							xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
						}
					},
					{
						type: 'text', multiLine: true, label: this.context.translate('doctor'), name: `medical_histories[${k}][doctor]`, grid: {
							xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
						}
					},
					{
						type: 'text', multiLine: true, label: this.context.translate('duration'), name: `medical_histories[${k}][duration]`, grid: {
							xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
						}
					}
				])),
				[
					{
						type: 'text', multiLine: true, label: this.context.translate('underlying_disease'), name: 'underlying_disease', grid: grid3
					},
					{
						type: 'text', multiLine: true, label: this.context.translate('under_taking_medicine'), name: 'under_taking_medicine', grid: grid3
					},
					{
						type: 'text', multiLine: true, label: this.context.translate('drug_symptom'), name: 'drug_symptom', grid: grid3
					}
				],
				[
					{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>{this.context.translate('requirement')}</SemiHeader>}
				],
				[
					{
						type: 'text', multiLine: true, hint: this.context.translate('requirement:hint'), name: 'requirement', grid: grid2
					}
				],
				[
					{
						type: 'text', multiLine: true, label: this.context.translate('requirement:note'), name: 'note', grid: grid2
					}
				],
				[
					{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>{this.context.translate('upload_image')}</SemiHeader>}
				],
				[
					{type: 'custom', element: <div className="video-container"><iframe className="video" src="https://www.youtube.com/embed/SLBP9eCcRS0" frameBorder="0" allowFullScreen></iframe></div>}
				],
				[
					{type: 'space'}
				],
				[
					...Array.from(Array(6), (v, k) => (
					{
						type: 'uploadbox', name: `files[face][${k}]`, thumbnail, example: images.face[k], grid: uploadGrid
					}
					))
				],
				[
					...Array.from(Array(6), (v, k) => (
					{
						type: 'uploadbox', name: `files[body][${k}]`, thumbnail, example: images.body[k], grid: uploadGrid
					}
					))
				],
				{
					hide: isOnlineConsult,
					items: [
						...Array.from(Array(6), (v, k) => (
						{
							type: 'uploadbox',
							name: `files[normal][${k}]`,
							thumbnail,
							example: images.normal[k],
							grid: uploadGrid
						}
						))
					]
				},
				[
					{type: 'custom', element: <div><h3><u>{this.context.translate('terms_of_service')}</u></h3><p>{this.context.translate('terms_of_service:detail')}</p></div>}
				],
				[
					{
						type: 'custom',
						element: <ol>
							<li>{this.context.translate('terms_of_service:1')}</li>
							<li>{this.context.translate('terms_of_service:2')}</li>
							<li>{this.context.translate('terms_of_service:3')}</li>
							<li>{this.context.translate('terms_of_service:4')}</li>
						</ol>
					}
				],
				[
					{
						type: 'custom', element: <div style={{height: 36}}></div>
					}
				],
				{
					center: 'xs',
					items: [
						{type: 'checkbox', name: 'agreement', required: true, showClearButton: false, options: [{id: 'accepted', name: this.context.translate('agree_with_terms_and_conditions')}],  grid: {
							xs: '100%', sm: '303px'
						}}
					]
				}
			]
		};
		return (
			<div>
				<SemiGrid>
					<Row center="xs" style={{overflow: 'hidden'}}>
						<Col xs="96%" xl="90%" style={{maxWidth: 1400}}>
							<div className="mtpc-logo"></div>
							<Panel title="Home">
								<div className="con-pad">
									<SemiForm formTemplate={formTemplate} buttonAlign="center" submitLabel={this.context.translate('submit')} onChange={this.handleFormChange} onSubmit={this.submit} />
								</div>
							</Panel>
						</Col>
					</Row>
				</SemiGrid>
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
	ajax: PropTypes.object,
	dialog: PropTypes.object,
	router: PropTypes.object,
	translate: PropTypes.func
};
export default HomePage;
