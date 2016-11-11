import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';
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
				{type: 'custom', element: <h3>ตำแหน่งที่ต้องการดูดไขมัน</h3>}
			],
			[
				{
					type: 'radio', name: 'filler_before_know_details', showClearButton: false, options: [
					{id: 'หน้า', name: 'หน้า'},
					{id: 'ขา', name: 'ขา'},
					{id: 'ท้อง', name: 'ท้อง'},
					{id: 'แขน', name: 'แขน'},
					{id: 'หลัง', name: 'หลัง'}
				]
				}
			],
			[
				{type: 'custom', element: <h3>ปัญหา/ข้อจำกัด/ความรุนแรง</h3>}
			],
			...Array.from(Array(9), (v, k)=> (
				[
					{type: 'custom', element: <div>Topic {k+1}</div>, grid: {md: '30%'}},
					{
						type: 'radio', name: `issues[${k}]`, showClearButton: false, grid: {md: '70%'}, options: [
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
					type: 'radio', name: `please`, showClearButton: false, grid: {md: '70%'}, options: [
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
				{type: 'custom', element: <div>บริเวณส่วนใดบนใบหน้า ที่ต้องการดูดไขมันและความต้องการดูดไขมันในบริเวณนั้นเพราะ</div>},
			],
			...Array.from(Array(6), (v, k)=>(
				[
					{type: 'custom', element: <div style={{height: '36px', textAlign: 'right'}}><label style={{lineHeight: '36px'}}>{k+1}</label></div>, grid: {md: '100px'}},
					{
						type: 'text', name: `areas[${k}]`, multiLine: true, grid: {md: 'calc(100% - 100px)'}
					}
				]
			)),
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>เหตุผลหลักที่ต้องการดูดไขมัน บริเวณใบหน้า</div>},
			],
			...Array.from(Array(6), (v, k)=>(
				[
					{type: 'custom', element: <div style={{height: '36px', textAlign: 'right'}}><label style={{lineHeight: '36px'}}>{k+1}</label></div>, grid: {md: '100px'}},
					{
						type: 'text', name: `reasons[${k}]`, multiLine: true, grid: {md: 'calc(100% - 100px)'}
					}
				]
			)),
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>ข้อซักถามก่อนทำ</div>},
			],
			[
				{type: 'custom', element: <div style={{height: '18px'}}></div>}
			],
			...Array.from(Array(11), (v, k)=>(
				[
					{type: 'custom', element: <div style={{textAlign: 'right'}}>{k+1}</div>, grid: {md: '100px'}},
					{type: 'custom', element: <div>Topic {k+1}</div>, grid: {md: 'calc(30% - 100px)'}},
					{
						type: 'radio', name: `questions[${k}]`, showClearButton: false, grid: {md: 'calc(70% - 100px)'}, options: [
						{id: 'yes', name: 'Yes'},
						{id: 'no', name: 'No'}
					]
					}
				]
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
