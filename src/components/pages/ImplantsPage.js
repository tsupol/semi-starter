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

	submit = (data)=> {
		this.context.ajax.call("post", "submit/implants", data, {files: ['files']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};


	render() {
		let thumbnail = require('../../assets/img/upload-thumbnail.png');
		let example = require('../../assets/img/upload-example.png');
		//let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let images = [];
		images.push({example: require('../../assets/img/implants/PIC_09066.jpg')});
		images.push({example: require('../../assets/img/implants/PIC_09067.jpg')});
		images.push({example: require('../../assets/img/implants/PIC_09068.jpg')});
		images.push({example: require('../../assets/img/implants/PIC_09072.jpg')});
		images.push({example: require('../../assets/img/implants/PIC_09077.jpg')});
		images.push({example: require('../../assets/img/implants/PIC_09079.jpg')});
		images = images.map((img)=>Object.assign({}, img, {thumbnail}));
		let values = {};
		let data = {};
		
		let components = [
			[
				{type: 'custom', element: <SemiHeader line="solid" style={{marginBottom: 24}}>รูปแบบทรงหน้าผาก</SemiHeader>}
			],
			[
				{type: 'radio', name: 'forehead_type', horizontal: true, showClearButton: false, grid: {xs: '100%'}, options: [
					{id: 'หน้าผากแคบ', grid: imgOptionGrid, name: <div><label>หน้าผากแคบ</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากกว้าง', grid: imgOptionGrid, name: <div><label>หน้าผากกว้าง</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากถอย', grid: imgOptionGrid, name: <div><label>หน้าผากถอย</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าโหนกนูน', grid: imgOptionGrid, name: <div><label>หน้าโหนกนูน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากย่น', grid: imgOptionGrid, name: <div><label>หน้าผากย่น</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากล้าน', grid: imgOptionGrid, name: <div><label>หน้าผากล้าน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าผากงามถ่อ', grid: imgOptionGrid, name: <div><label>หน้าผากงามถ่อ</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader line="solid" style={{marginBottom: 24}}>รูปแบบทรงสะโพกและก้น</SemiHeader>}
			],
			[
				{type: 'radio', name: 'hip_type', horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'แบนโดยรวม', grid: imgOptionGrid, name: <div><label>แบนโดยรวม</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แบนด้านบน', grid: imgOptionGrid, name: <div><label>แบนด้านบน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แบนด้านข้าง', grid: imgOptionGrid, name: <div><label>แบนด้านข้าง</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แบนด้านใน', grid: imgOptionGrid, name: <div><label>แบนด้านใน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แบนด้านล่าง', grid: imgOptionGrid, name: <div><label>แบนด้านล่าง</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader line="solid" style={{marginBottom: 24}}>ลักษณะรูปร่าง</SemiHeader>}
			],
			[
				{type: 'radio', name: 'body_type', horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'นาฬิกาทราบ', grid: imgOptionGrid, name: <div><label>นาฬิกาทราบ</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'สามเหลี่ยม', grid: imgOptionGrid, name: <div><label>สามเหลี่ยม</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'ทรงตรง', grid: imgOptionGrid, name: <div><label>ทรงตรง</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'ลูกแพร์', grid: imgOptionGrid, name: <div><label>ลูกแพร์</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'แอปเปิ้ล', grid: imgOptionGrid, name: <div><label>แอปเปิ้ล</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader line="solid" style={{marginBottom: 24}}>บริเวณที่เอาไขมันออกมา</SemiHeader>}
			],
			[
				{type: 'radio', name: 'liposuction_area', horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'ต้นแขน', grid: imgOptionGrid, name: <div><label>ต้นแขน</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'หน้าท้อง', grid: imgOptionGrid, name: <div><label>หน้าท้อง</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'ต้นขา', grid: imgOptionGrid, name: <div><label>ต้นขา</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'ก้น', grid: imgOptionGrid, name: <div><label>ก้น</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'สะโพก', grid: imgOptionGrid, name: <div><label>สะโพก</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader>ประวัติการทำศัลยกรรม</SemiHeader>}
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
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>ความสวยงามของรูปหน้าขณะนี้ (ตามความพึงพอใจ)</SemiHeader>}
			],
			[
				{type: 'radio', horizontal: true, name: 'please', showClearButton: false, options: [
					{id: 'มากที่สุด', grid: optionGrid5, name: 'มากที่สุด'},
					{id: 'มาก', grid: optionGrid5, name: 'มาก'},
					{id: 'ปานกลาง', grid: optionGrid5, name: 'ปานกลาง'},
					{id: 'น้อย', grid: optionGrid5, name: 'น้อย'},
					{id: 'น้อยที่สุด', grid: optionGrid5, name: 'น้อยที่สุด'}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader>บริเวณที่ต้องการทำ Fat Transfer และความคาดหวัง</SemiHeader>}
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
				{type: 'custom', element: <SemiHeader>เหตุผลหลักที่ต้องการทำ Fat Transfer</SemiHeader>}
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
			],[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Implants" images={images} values={values} data={data} onSubmit={this.submit}>
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
	ajax: PropTypes.object,
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default ImplantsPage;
