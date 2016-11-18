import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';

const
	optionGrid5 = {xs: '100%', sm: '50%', md: '20%'}, // for horizontal with 5 radio buttons
	imgOptionGrid = {xs: '100%', sm: '50%', md: '20%'},

// todo: change image dimension according to real image here...
	imgStyle = {width: '100%'},

// For space between topic and checkboxes when `md`
	rowSpace = {type: 'space', height: '16px', noPadding: true, grid: {
		xs: '100%', md: '0%'
	}};

class LiposuctionPage extends Component {
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
		this.context.ajax.call("post", "submit/liposuction", data, {files: ['files']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};


	render() {
		let thumbnail = require('../../assets/img/upload-thumbnail.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <SemiHeader>ตำแหน่งที่ต้องการดูดไขมัน</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'filler_before_know_details', horizontal: true, showClearButton: false, options: [
					{id: 'หน้า', name: 'หน้า'},
					{id: 'ขา', name: 'ขา'},
					{id: 'ท้อง', name: 'ท้อง'},
					{id: 'แขน', name: 'แขน'},
					{id: 'หลัง', name: 'หลัง'}
				]
				}
			],
			[
				{type: 'custom', element: <SemiHeader>ปัญหา/ข้อจำกัด/ความรุนแรง</SemiHeader>}
			],
			...Array.from(Array(9), (v, k)=> (
				[
					{type: 'custom', element: <div>Topic {k+1}</div>, grid: {md: '30%'}},
					{
						type: 'radio', name: `issues[${k}]`, horizontal: true, showClearButton: false, grid: {md: '70%'}, options: [
						{id: 'น้อยมาก', name: 'น้อยมาก'},
						{id: 'น้อย', name: 'น้อย'},
						{id: 'ปานกลาง', name: 'ปานกลาง'},
						{id: 'รุนแรง', name: 'รุนแรง'},
						{id: 'รุนแรงมาก', name: 'รุนแรงมาก'}
					]
					}
				]
			)),
			[
				{
					type: 'text', name: 'height', label: 'ส่วนสูง'
				},
				{
					type: 'text', name: 'weight', label: 'น้ำหนัก'
				},
				{
					type: 'text', name: 'bmi', label: 'BMI'
				}
			],
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>ความสวยงามของรูปหน้าขณะนี้<br/>(ตามความพึงพอใจ)</div>, grid: {md: '30%'}},
				{
					type: 'radio', name: `please`, horizontal: true, showClearButton: false, grid: {md: '70%'}, options: [
					{id: 'น้อยมาก', name: 'น้อยมาก'},
					{id: 'น้อย', name: 'น้อย'},
					{id: 'ปานกลาง', name: 'ปานกลาง'},
					{id: 'รุนแรง', name: 'รุนแรง'},
					{id: 'รุนแรงมาก', name: 'รุนแรงมาก'}
				]
				}
			],
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <SemiHeader>บริเวณส่วนใดบนใบหน้า ที่ต้องการดูดไขมันและความต้องการดูดไขมันในบริเวณนั้นเพราะ</SemiHeader>}
			],
			...Array.from(Array(6), (v, k) => ([
				{type: 'label', style: {paddingTop: 12}, label:`${k+1}.`, grid: {
					xs: '10%', xsAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, name: `areas[${k}]`, grid: {
					xs: '90%', md: `calc(100% - ${64}px)`
				}},
			])),
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <SemiHeader>เหตุผลหลักที่ต้องการดูดไขมัน บริเวณใบหน้า</SemiHeader>}
			],
			...Array.from(Array(6), (v, k) => ([
				{type: 'label', style: {paddingTop: 12}, label:`${k+1}.`, grid: {
					xs: '10%', xsAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, name: `reasons[${k}]`, grid: {
					xs: '90%', md: `calc(100% - ${64}px)`
				}},
			])),
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <SemiHeader>ข้อซักถามก่อนทำ</SemiHeader>}
			],
			[
				{type: 'custom', element: <div style={{height: '18px'}}></div>}
			],
			...Array.from(Array(11), (v, k)=>({
				separator: true,
				style: {
					paddingTop: 16,
					paddingBottom: 16
				},
				items: [
					{type: 'label', style: {paddingTop: 3, fontWeight: 'normal'}, label:`${k+1}. Topic ${k+1}`, grid: {
						xs: '100%', md: '50%'
					}},
					{...rowSpace},
					{type: 'radio', name: `questions[${k}]`, horizontal: true, showClearButton: false, grid: {
						xs: '100%', md: '200px'
					}, options: [
						{id: 'yes', name: 'Yes'},
						{id: 'no', name: 'No'}
					]}
				]}
			)),
			[
				{
					type: 'text', name: 'job', label: 'ท่านประกอบอาชีพอะไร'
				}
			],
			[
				{
					type: 'text', name: 'big_event', label: 'ท่านมีงานสำคัญในปีนี้หรือไม่'
				}
			],
			[
				{
					type: 'text', name: 'adviser', label: 'บุคคลที่ท่านปรึกษาและแสดงความคิดเห้น ทั้งก่อนและหลังผ่าตัด'
				}
			]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Liposuction" images={images} values={values} data={data} onSubmit={this.submit}>
				<FormGenerator formTemplate={formTemplate} />
			</MainForm>
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
LiposuctionPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default LiposuctionPage;
