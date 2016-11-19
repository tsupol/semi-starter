import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';

const
	marginBottomStyle = {marginBottom: 24},
	optionGrid5 = {xs: '100%', sm: '50%', md: '20%'}, // for horizontal with 5 radio buttons
	optionGridOther = {xs: '100%'},
	imgOptionGrid = {xs: '100%', sm: '50%', md: '20%'},

// todo: change image dimension according to real image here...
	imgStyle = {width: '100%'},

// For space between topic and checkboxes when `md`
	rowSpace = {type: 'space', height: '16px', noPadding: true, grid: {
		xs: '100%', md: '0%'
	}};

class EyebrowPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			eyebrow_issue_other: false,
			eyes_issue_other: false,
			wrinkle_issue_other: false
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

	submit = (data)=> {
		this.context.ajax.call("post", "submit/eyebrow", data, {files: ['files']}).then((data)=>{
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
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>ปัญหาที่พบ (ช่วงคิ้ว)</SemiHeader>}
			],
			[
				{
					type: 'checkbox', name: 'eyebrow_issue', horizontal: true, showClearButton: false, options: [
						{id: 'ช่วงคิ้วกับดวงตาแคบ', grid: imgOptionGrid, name: <div><label>ช่วงคิ้วกับดวงตาแคบ</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'คิ้วไม่เท่ากัน', grid: imgOptionGrid, name: <div><label>คิ้วไม่เท่ากัน</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'หัวคิ้วตก', grid: imgOptionGrid, name: <div><label>หัวคิ้วตก</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'หางคิ้วตก', grid: imgOptionGrid, name: <div><label>หางคิ้วตก</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'ไรผมสูง', grid: imgOptionGrid, name: <div><label>ไรผมสูง</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'other', grid: optionGridOther, name: 'อื่นๆ', style:{marginTop: 16}}
					], onCheck: (v)=> this.setState({eyebrow_issue_other: v.indexOf('other')!=-1})
				}
			],
			{
				hide: !this.state.eyebrow_issue_other,
				items: [
					{
						type: 'text', name: 'eyebrow_issue_other', multiLine: true, hint: 'Please specify'
					}
				]
			},
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>ปัญหาที่พบ (ช่วงดวงตา)</SemiHeader>}
			],
			[
				{
					type: 'checkbox', name: 'eyes_issue', horizontal: true, showClearButton: false, options: [
						{id: 'หัวตาตก', grid: imgOptionGrid, name: <div><label>หัวตาตก</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'หางตาตก', grid: imgOptionGrid, name: <div><label>หางตาตก</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'ชั้นตาหลบใน', grid: imgOptionGrid, name: <div><label>ชั้นตาหลบใน</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'ชั้นตาไม่เท่ากัน', grid: imgOptionGrid, name: <div><label>ชั้นตาไม่เท่ากัน</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'other', grid: optionGridOther, name: 'อื่นๆ', style:{marginTop: 16}}
					], onCheck: (v)=> this.setState({eyes_issue_other: v.indexOf('other')!=-1})
				}
			],
			{
				hide: !this.state.eyes_issue_other,
				items: [
					{
						type: 'text', name: 'eyes_issue_other', multiLine: true, hint: 'Please specify'
					}
				]
			},
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>ปัญหาที่พบ (ริ้วรอย)</SemiHeader>}
			],
			{
				items: [
					{
						type: 'checkbox', name: 'wrinkle_issue', horizontal: true, showClearButton: false, options: [
							{id: 'ริ้วรอยบริเวณหางตา', name: 'ริ้วรอยบริเวณหางตา', grid: optionGrid5},
							{id: 'ริ้วรอยบริเวณเปลือกตา', name: 'ริ้วรอยบริเวณเปลือกตา', grid: optionGrid5},
							{id: 'ริ้วรอยใต้ตา', name: 'ริ้วรอยใต้ตา', grid: optionGrid5},
							{id: 'ริ้วรอยหน้าผาก', name: 'ริ้วรอยหน้าผาก', grid: optionGrid5},
							{id: 'ริ้วรอยขมวดคิ้ว', name: 'ริ้วรอยขมวดคิ้ว', grid: optionGrid5},
							{id: 'other', name: 'อื่นๆ', grid: optionGridOther, style: {marginTop: 16}}
						], onCheck: (v)=> this.setState({wrinkle_issue_other: v.indexOf('other') != -1})
					}
				]
			},
			{
				hide: !this.state.wrinkle_issue_other,
				items: [
					{
						type: 'text', name: 'wrinkle_issue_other', multiLine: true, hint: 'Please specify'
					}
				]
			},[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Eyebrow" images={images} values={values} data={data} onSubmit={this.submit}>
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
EyebrowPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default EyebrowPage;
