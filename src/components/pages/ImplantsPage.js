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
		let components = [
			[
				{type: 'custom', element: <div>รูปแบบทรงหน้าผาก</div>, grid: {md: '30%'}},
				{
					type: 'radio', name: 'forehead_type', showClearButton: false, grid: {md: '70%'}, options: [
					{id: 'หน้าผากแคบ', name: <div><label>หน้าผากแคบ</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'หน้าผากกว้าง', name: <div><label>หน้าผากกว้าง</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'หน้าผากถอย', name: <div><label>หน้าผากถอย</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'หน้าโหนกนูน', name: <div><label>หน้าโหนกนูน</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'หน้าผากย่น', name: <div><label>หน้าผากย่น</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'หน้าผากล้าน', name: <div><label>หน้าผากล้าน</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'หน้าผากงามถ่อ', name: <div><label>หน้าผากงามถ่อ</label><br/><img style={{width: '200px'}} src={example} /></div>}
				]
				}
			],
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>รูปแบบทรงสะโพกและก้น</div>, grid: {md: '30%'}},
				{
					type: 'radio', name: 'hip_type', showClearButton: false, grid: {md: '70%'}, options: [
					{id: 'แบนโดยรวม', name: <div><label>แบนโดยรวม</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'แบนด้านบน', name: <div><label>แบนด้านบน</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'แบนด้านข้าง', name: <div><label>แบนด้านข้าง</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'แบนด้านใน', name: <div><label>แบนด้านใน</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'แบนด้านล่าง', name: <div><label>แบนด้านล่าง</label><br/><img style={{width: '200px'}} src={example} /></div>}
				]
				}
			],
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>ลักษณะรูปร่าง</div>, grid: {md: '30%'}},
				{
					type: 'radio', name: 'body_type', showClearButton: false, grid: {md: '70%'}, options: [
					{id: 'นาฬิกาทราบ', name: <div><label>นาฬิกาทราบ</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'สามเหลี่ยม', name: <div><label>สามเหลี่ยม</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'ทรงตรง', name: <div><label>ทรงตรง</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'ลูกแพร์', name: <div><label>ลูกแพร์</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'แอปเปิ้ล', name: <div><label>แอปเปิ้ล</label><br/><img style={{width: '200px'}} src={example} /></div>}
				]
				}
			],
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>บริเวณที่เอาไขมันออกมา</div>, grid: {md: '30%'}},
				{
					type: 'radio', name: 'liposuction_area', showClearButton: false, grid: {md: '70%'}, options: [
					{id: 'ต้นแขน', name: <div><label>ต้นแขน</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'หน้าท้อง', name: <div><label>หน้าท้อง</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'ต้นขา', name: <div><label>ต้นขา</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'ก้น', name: <div><label>ก้น</label><br/><img style={{width: '200px'}} src={example} /></div>},
					{id: 'สะโพก', name: <div><label>สะโพก</label><br/><img style={{width: '200px'}} src={example} /></div>}
				]
				}
			],
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>ประวัติการทำศัลยกรรม</div>},
			],
			[
				{type: 'custom', element: <div style={{height: '18px'}}></div>}
			],
			[
				{type: 'custom', element: <label>บริเวณ</label>},
				{type: 'custom', element: <label>รายละเอียด</label>},
				{type: 'custom', element: <label>ผ่านมากี่ปี</label>},
				{type: 'custom', element: <label>ปัญหา ณ ตอนนี้</label>},
			],
			...Array.from(Array(5), (v, k)=>(
				[
					{type: 'text', name: `histories[${k}][area]`, multiLine: true},
					{type: 'text', name: `histories[${k}][detail]`, multiLine: true},
					{type: 'text', name: `histories[${k}][how_long]`, multiLine: true},
					{type: 'text', name: `histories[${k}][problem]`, multiLine: true}
				]
			)),
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>ความสวยงามของรูปหน้าขณะนี้<br/>(ตามความพึงพอใจ)</div>, grid: {md: '30%'}},
				{
					type: 'radio', name: 'please', showClearButton: false, grid: {md: '70%'}, options: [
					{id: 'มากที่สุด', name: 'มากที่สุด'},
					{id: 'มาก', name: 'มาก'},
					{id: 'ปานกลาง', name: 'ปานกลาง'},
					{id: 'น้อย', name: 'น้อย'},
					{id: 'น้อยที่สุด', name: 'น้อยที่สุด'}
				]
				}
			],
			[
				{type: 'custom', element: <div style={{height: '36px'}}></div>}
			],
			[
				{type: 'custom', element: <div>บริเวณที่ต้องการทำ Fat Transfer และความคาดหวัง</div>},
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
				{type: 'custom', element: <div>เหตุผลหลักที่ต้องการทำ Fat Transfer</div>},
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
