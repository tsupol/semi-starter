import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';
class ImplantsPage extends Component {
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

	handleFormChange = (data)=> {
	};


	render() {
		let thumbnail = require('../../assets/img/upload-thumbnail.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let values = {};
		let data = {};
		
		let optionGrid = {xs: '100%', sm: '50%', md: '25%'},
			imgStyle = {width: '100%'},
			checkboxFieldStyle = {marginTop: 24}; // Gap between `h3` and `checkboxField`
		
		let components = [
			[
				{type: 'custom', element: <h3>รูปแบบทรงหน้าผาก</h3>}
			],
			[
				{type: 'radio', name: 'forehead_type', style: checkboxFieldStyle, horizontal: true, showClearButton: false, grid: {xs: '100%'}, options: [
					{id: 'หน้าผากแคบ', grid: optionGrid, name: <div><label>หน้าผากแคบ</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากกว้าง', grid: optionGrid, name: <div><label>หน้าผากกว้าง</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากถอย', grid: optionGrid, name: <div><label>หน้าผากถอย</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าโหนกนูน', grid: optionGrid, name: <div><label>หน้าโหนกนูน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากย่น', grid: optionGrid, name: <div><label>หน้าผากย่น</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากล้าน', grid: optionGrid, name: <div><label>หน้าผากล้าน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากงามถ่อ', grid: optionGrid, name: <div><label>หน้าผากงามถ่อ</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <h3>รูปแบบทรงสะโพกและก้น</h3>}
			],
			[
				{type: 'radio', name: 'hip_type', style: checkboxFieldStyle, horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'แบนโดยรวม', grid: optionGrid, name: <div><label>แบนโดยรวม</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แบนด้านบน', grid: optionGrid, name: <div><label>แบนด้านบน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แบนด้านข้าง', grid: optionGrid, name: <div><label>แบนด้านข้าง</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แบนด้านใน', grid: optionGrid, name: <div><label>แบนด้านใน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แบนด้านล่าง', grid: optionGrid, name: <div><label>แบนด้านล่าง</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <h3>ลักษณะรูปร่าง</h3>}
			],
			[
				{type: 'radio', name: 'body_type', style: checkboxFieldStyle, horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'นาฬิกาทราบ', grid: optionGrid, name: <div><label>นาฬิกาทราบ</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'สามเหลี่ยม', grid: optionGrid, name: <div><label>สามเหลี่ยม</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'ทรงตรง', grid: optionGrid, name: <div><label>ทรงตรง</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'ลูกแพร์', grid: optionGrid, name: <div><label>ลูกแพร์</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แอปเปิ้ล', grid: optionGrid, name: <div><label>แอปเปิ้ล</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <h3>บริเวณที่เอาไขมันออกมา</h3>}
			],
			[
				{type: 'radio', name: 'liposuction_area', style: checkboxFieldStyle, horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'ต้นแขน', grid: optionGrid, name: <div><label>ต้นแขน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าท้อง', grid: optionGrid, name: <div><label>หน้าท้อง</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'ต้นขา', grid: optionGrid, name: <div><label>ต้นขา</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'ก้น', grid: optionGrid, name: <div><label>ก้น</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'สะโพก', grid: optionGrid, name: <div><label>สะโพก</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <h3>ประวัติการทำศัลยกรรม</h3>}
			],
			...Array.from(Array(5), (v, k) => ([
				{type: 'label', label:`${k+1}.`, grid: {
					xs: '100%', mdAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, label: 'บริเวณ', name: `histories[${k}][area]`, grid: {
					xs: '100%', md: `calc(20% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: 'รายละเอียด', name: `histories[${k}][detail]`, grid: {
					xs: '100%', md: `calc(30% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: 'ผ่านมากี่ปี', name: `histories[${k}][how_long]`, grid: {
					xs: '100%', md: `calc(20% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: 'ปัญหา ณ ตอนนี้', name: `histories[${k}][problem]`, grid: {
					xs: '100%', md: `calc(30% - ${64/4}px)`
				}}
			])),
			[
				{type: 'space'}
			],
			[
				{type: 'custom', element: <strong>ความสวยงามของรูปหน้าขณะนี้<br/>(ตามความพึงพอใจ)</strong>, grid: {
					xs: '100%', md: '300px'
				}},
				{type: 'space', grid: { // for space between them when `xs`
					xs: '100%', md: 'calc(10% - 300px)'
				}},
				{type: 'radio', name: 'please', showClearButton: false, options: [
					{id: 'มากที่สุด', name: 'มากที่สุด'},
					{id: 'มาก', name: 'มาก'},
					{id: 'ปานกลาง', name: 'ปานกลาง'},
					{id: 'น้อย', name: 'น้อย'},
					{id: 'น้อยที่สุด', name: 'น้อยที่สุด'}
				], grid: {
					xs: '100%', md: 'calc(90% - 600px)'
				}}
			],
			[
				{type: 'space'}
			],
			[
				{type: 'custom', element: <strong>ความสวยงามของรูปหน้าขณะนี้<br/>(ตามความพึงพอใจ)</strong>, grid: {
					xs: '100%', md: '300px'
				}},
				{type: 'space', grid: { // for space between them when `xs`
					xs: '100%', md: 'calc(10% - 300px)'
				}},
				{type: 'radio', name: 'please', showClearButton: false, options: [
					{id: 'มากที่สุด', name: 'มากที่สุด'},
					{id: 'มาก', name: 'มาก'},
					{id: 'ปานกลาง', name: 'ปานกลาง'},
					{id: 'น้อย', name: 'น้อย'},
					{id: 'น้อยที่สุด', name: 'น้อยที่สุด'}
				], grid: {
					xs: '100%', md: 'calc(90% - 600px)'
				}}
			],
			// [
			// 	{type: 'space'}
			// ],
			// [
			// 	{type: 'custom', element: <strong>ความสวยงามของรูปหน้าขณะนี้<br/>(ตามความพึงพอใจ)</strong>, grid: {
			// 		xs: '100%', md: '300px'
			// 	}},
			// 	{type: 'space', grid: { // for space between them when `xs`
			// 		xs: '100%', md: 'calc(10% - 300px)'
			// 	}},
			// 	{type: 'radio', name: 'please', showClearButton: false, options: [
			// 		{id: 'มากที่สุด', name: 'มากที่สุด'},
			// 		{id: 'มาก', name: 'มาก'},
			// 		{id: 'ปานกลาง', name: 'ปานกลาง'},
			// 		{id: 'น้อย', name: 'น้อย'},
			// 		{id: 'น้อยที่สุด', name: 'น้อยที่สุด'}
			// 	], grid: {
			// 		xs: '100%', md: 'calc(90% - 600px)'
			// 	}}
			// ],
			[
				{type: 'custom', element: <h5>บริเวณที่ต้องการทำ Fat Transfer และความคาดหวัง</h5>},
			],
			...Array.from(Array(6), (v, k) => ([
				{type: 'label', style: {paddingTop: 12}, label:`${k+1}.`, grid: {
					xs: '10%', xsAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, name: `areas[${k}][area]`, grid: {
					xs: '90%', md: `calc(100% - ${64}px)`
				}},
			])),
			// Two column style
			// ...Array.from(Array(3), (v, k) => ([
			// 	{type: 'label', label:`${k*2+1}.`, grid: {
			// 		xs: '10%', xsAlign: 'right', md: '64px'
			// 	}},
			// 	{type: 'text', multiLine: true, label: ' ', name: `areas[${k*2}][area]`, grid: {
			// 		xs: '90%', md: `calc(50% - ${64}px)`
			// 	}},
			// 	{type: 'label', label:`${k*2+2}.`, grid: {
			// 		xs: '10%', xsAlign: 'right', md: '64px'
			// 	}},
			// 	{type: 'text', multiLine: true, label: ' ', name: `areas[${k*2+1}][area]`, grid: {
			// 		xs: '90%', md: `calc(50% - ${64}px)`
			// 	}}
			// ])),
			[
				{type: 'custom', element: <h5>เหตุผลหลักที่ต้องการทำ Fat Transfer</h5>},
			],
			...Array.from(Array(6), (v, k) => ([
				{type: 'label', style: {paddingTop: 12}, label:`${k+1}.`, grid: {
					xs: '10%', xsAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, name: `reasons[${k}][area]`, grid: {
					xs: '90%', md: `calc(100% - ${64}px)`
				}},
			])),
			// Two column style
			// ...Array.from(Array(3), (v, k) => ([
			// 	{type: 'label', label:`${k*2+1}.`, grid: {
			// 		xs: '10%', xsAlign: 'right', md: '64px'
			// 	}},
			// 	{type: 'text', multiLine: true, label: ' ', name: `reasons[${k*2}][area]`, grid: {
			// 		xs: '90%', md: `calc(50% - ${64}px)`
			// 	}},
			// 	{type: 'label', label:`${k*2+2}.`, grid: {
			// 		xs: '10%', xsAlign: 'right', md: '64px'
			// 	}},
			// 	{type: 'text', multiLine: true, label: ' ', name: `reasons[${k*2+1}][area]`, grid: {
			// 		xs: '90%', md: `calc(50% - ${64}px)`
			// 	}}
			// ])),
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <h5>ข้อซักถามก่อนทำ</h5>},
			],
			[
				{type: 'custom', element: <div style={{height: '18px'}}></div>}
			],
			...Array.from(Array(11), (v, k)=>({
				settings: {
					separator: true
				},
				style: {
					paddingTop: 16,
					paddingBottom: 16
				},
				items: [
					{type: 'label', style: {paddingTop: 3, fontWeight: 'normal'}, label:`${k+1}. Topic ${k+1}`, grid: {
						xs: '100%', md: '50%'
					}},
					{type: 'space', height: '16px', grid: { // for space between them when `xs`
						xs: '100%', md: '0%'
					}},
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
			<MainForm header="Implants" images={images} values={values} data={data} onChange={this.handleFormChange}>
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
ImplantsPage.contextTypes = {
	ajax: PropTypes.object
};
export default ImplantsPage;
