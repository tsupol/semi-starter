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
		this.context.ajax.call("post", "submit", data, {files: ['files.face', 'files.body', 'files.normal']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};

	render() {
		let thumbnail = require('../assets/img/upload-thumbnail.png');
		let example = require('../assets/img/upload-example.png');
		let images = {
			face: Array.from(Array(6), (v, k)=>require(`../assets/img/face${k+1}.jpg`))
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
								{id: 'eye', name: 'Eye', grid: grid7},
								{id: 'nose', name: 'Nose', grid: grid7},
								{id: 'breast', name: 'Breast', grid: grid7},
								{id: 'lip', name: 'Lip', grid: grid7},
								{id: 'hair', name: 'Hair', grid: grid7},
								{id: 'bags_under_the_eyes', name: 'Bags under the eyes', grid: {xs: '100%', sm: '50%', md: '28.6%'}},
								{id: 'interested_in_liposuction_check', name: 'Liposuction', grid: grid1, belowInput: {
									type: 'text', name: 'interested_in_liposuction', hint: 'Please specify'
								}},
								{id: 'interested_in_other_check', name: 'Other', grid: grid1, belowInput: {
									type: 'text', name: 'interested_in_other_check', hint: 'Please specify'
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
						type: 'text', multiLine: true, label: this.context.translate('medical_histories:where'), name: `medical_histories[${k}][where]`, grid: {
							xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
						}
					},
					{
						type: 'text', multiLine: true, label: this.context.translate('medical_histories:doctor'), name: `medical_histories[${k}][doctor]`, grid: {
							xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
						}
					},
					{
						type: 'text', multiLine: true, label: this.context.translate('medical_histories:duration'), name: `medical_histories[${k}][duration]`, grid: {
							xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
						}
					}
				])),
				[
					{
						type: 'text', multiLine: true, label: 'Congenital Disease', name: 'congenital_disease', grid: grid3
					},
					{
						type: 'text', multiLine: true, label: 'Current Drug', name: 'current_drug', grid: grid3
					},
					{
						type: 'text', multiLine: true, label: 'Drug Symptom', name: 'drug_symptom', grid: grid3
					}
				],
				[
					{
						type: 'text', multiLine: true, label: 'Need', name: 'need', grid: grid2
					},
					{
						type: 'text', multiLine: true, label: 'Note', name: 'note', grid: grid2

					}
				],
				[
					{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>{this.context.translate('upload_image')}</SemiHeader>}
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
						type: 'uploadbox', name: `files[body][${k}]`, thumbnail, example, grid: uploadGrid
					}
					))
				],
				[
					...Array.from(Array(6), (v, k) => (
					{
						type: 'uploadbox', name: `files[normal][${k}]`, thumbnail, example, grid: uploadGrid
					}
					))
				],
				[
					{type: 'custom', element: <div><h3><u>Terms of Service</u></h3><p>กรุณาอ่านเงื่อนไขต่างๆในการใช้บริการโดย ละเอียด เพราะหากท่านกดดำเนินการลงทะเบียน จะถือว่าท่านยอมรับเงื่อนไขของการใช้บริการของคลินิก</p></div>}
				],
				[
					{
						type: 'custom',
						element: <ol>
							<li>ข้าพเจ้าขอยืนยันว่าภาพถ่ายที่ข้าพเจ้าส่งเป็นภาพถ่ายของข้าพเจ้าจริง ในกรณีที่ตรวจพบในภายหลังว่าภาพถ่ายที่ข้าพเจ้าส่งไม่ใช่ภาพของตัวข้าพเจ้า หรือเป็นภาพที่เกิดจากการดัดแปลง ตกแต่ง ต่อเติม ไม่ว่าจะโดยตั้งใจหรือไม่ตั้งใจก็ตาม ข้าพเจ้ายินดีรับผิดแต่เพียงผู้เดียว</li>
							<li>ข้าพเจ้า ยินยอมให้ทางคลินิกใช้ภาพที่ข้าพเจ้าส่งด้วยวิธีการส่งภาพทางจดหมาย อิเล็กทรอนิกส์(E-Mail) การพิมพ์(Print) หรือด้วยวิธีใดๆตามที่คลินิกจะเห็นสมควรเพื่อให้แพทย์พิจารณา</li>
							<li>การส่งภาพถ่ายข้างต้นเป็นเพียงการส่งเพื่อการปรึกษาแพทย์ในเบื้องต้นเท่า นั้น ข้าพเจ้าเข้าใจว่าจะต้องมีการเข้ามาที่คลินิกเพื่อทำการตรวจ และปรึกษาแพทย์อีกครั้งหนึ่ง</li>
							<li>ความเห็นของแพทย์เป็นเพียงการวินิจฉัยเบื้องต้นตามภาพถ่ายที่ท่านส่งมาให้ ซึ่งอาจมีการเปลี่ยนแปลงได้เมื่อท่านเข้ามาพบแพทย์</li>
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
						{type: 'checkbox', name: 'agreement', required: true, showClearButton: false, options: [{id: 'accepted', name: 'Agree with term and conditions.'}],  grid: {
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
									<SemiForm formTemplate={formTemplate} buttonAlign="center" onChange={this.handleFormChange} onSubmit={this.submit} />
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
	translate: PropTypes.func
};
export default HomePage;
