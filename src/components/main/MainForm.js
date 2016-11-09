import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm, FormGenerator} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';

class MainForm extends Component {
	constructor(props, context) {
		super(props, context);
	}

	componentWillMount() {
	}

	handleFormChange = (data)=> {
		this.props.handleFormChange && this.props.handleFormChange(data);
	};

	submit = (data)=> {
		console.log('data', data);
		this.props.onSubmit && this.props.onSubmit(data);
		this.context.ajax.call("post", "submit", data, {files: ['files']});
	};

	render() {
		let showMainForm = true; // you can hide main form to see sub-form more clearly

		let values = Object.assign({
			first_name: '',
			last_name: '',
			email: '',
			lineID: '',
			whatappID: '',
			phone: '',
			mobile: '',
			files: []
		}, this.props.values);
		let data = Object.assign({}, this.props.data);
		let images = this.props.images || [];

		let optionGrid = {xs: '100%', sm: '50%', md: '25%'},
			grid2 = {xs: '100%', md: '50%'},
			grid3 = {xs: '100%', md: '33.33%'},
			grid4 = {xs: '100%', md: '25%'},
			grid5 = {xs: '100%', md: '20%'},
			imgStyle = {width: '100%'};

		let mainForm = {
			components: [
				[
					{type: 'custom', element: <h3 style={{marginTop: 16}}>Personal Information</h3>}
				],
				[
					{type: 'text', name: 'first_name', label: 'First Name', grid: grid3},
					{type: 'text', name: 'last_name', label: 'Last Name', grid: grid3},
					{type: 'text', name: 'email', label: 'E-Mail', grid: grid3}
				],
				[
					{type: 'text', name: 'phone', label: 'Phone', grid: grid4},
					{type: 'text', name: 'mobile', label: 'Mobile', grid: grid4},
					{type: 'text', name: 'lineID', label: 'Line ID', grid: grid4},
					{type: 'text', name: 'whatappID', label: 'WhatApp ID', grid: grid4}
				],
				[
					{type: 'custom', element: <h3>Medical Histories</h3>}
				],
				...Array.from(Array(5), (v, k) => ([
					{type: 'label', label:`${k+1}.`, grid: {
						xs: '100%', smAlign: 'right', sm: '64px'
					}},
					{type: 'text', multiLine: true, label: 'What', name: `medical_histories[${k}][what]`, grid: {
						xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
					}},
					{type: 'text', multiLine: true, label: 'Where', name: `medical_histories[${k}][where]`, grid: {
						xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
					}},
					{type: 'text', multiLine: true, label: 'Doctor', name: `medical_histories[${k}][doctor]`, grid: {
						xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
					}},
					{type: 'text', multiLine: true, label: 'Duration', name: `medical_histories[${k}][duration]`, grid: {
						xs: '100%', sm: `calc(${100/4}% - ${64/4}px)`
					}}
				])),
				[
					{type: 'custom', element: <h3>Medical Information</h3>}
				],
				[
					{type: 'text', multiLine: true, label: 'Congenital Disease', name: 'congenital_disease', grid: grid3},
					{type: 'text', multiLine: true, label: 'Current Drug', name: 'current_drug', grid: grid3},
					{type: 'text', multiLine: true, label: 'Drug Symptom', name: 'drug_symptom', grid: grid3}
				],
				[
					{type: 'text', multiLine: true, label: 'Need', name: 'need', grid: grid2}
				],
				[
					{type: 'text', multiLine: true, label: 'Note', name: 'note', grid: grid2}
				],
				[
					{type: 'custom', element: <div style={{height: 72}}></div>}
				],
				[
					...images.map((image, k)=> (
					{
						type: 'uploadbox', name: `files[${k}]`, thumbnail: image.thumbnail, example: image.example
					}
					))
				]
				// ...components, // use this.props.children instead
			]
		};
		let bottomForm = {
			components: [
				[
					{type: 'space'}
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
					{type: 'space'}
				],
				[
					{type: 'label', grid: {
						xs: '0%', md: '50%'
					}},
					{type: 'checkbox', name: 'test', required: true, showClearButton: false, options: [{id: 'accepted', name: 'Accepted'}],  grid: {
						xs: '100%', md: '126px', mdOffset: '-63px' // For align center, offset = -width/2
					}}
				]
			]
		};
		return (
			<div>
				<PageHeading title={this.props.header || 'Header'} description={this.props.description || 'description'} />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel title={this.props.header || 'Header'}>
								<div className="pad-normal pr-form">
									<SemiForm data={data} values={values} buttonAlign="center" onChange={this.handleFormChange} onSubmit={this.submit}>
										{showMainForm ? <FormGenerator formTemplate={mainForm} /> : null}
										{this.props.children}
										{showMainForm ? <FormGenerator formTemplate={bottomForm} /> : null}
									</SemiForm>
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
MainForm.contextTypes = {
	ajax: PropTypes.object
};
export default MainForm;
