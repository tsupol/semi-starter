import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';

const
	optionGrid5 = {xs: '100%', sm: '33.33%', md: '20%', xl: '15%'}, // for horizontal with 5 radio buttons
	grid3 = {xs: '100%', md: '33.33%'},
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
		let {area} = this.props.params;
		let thumbnail = require(this.props.locale=="th" ? '../../assets/img/upload-thumbnail.png': '../../assets/img/upload-thumbnail-en.png');
		let example = require('../../assets/img/upload-example.png');
		//let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let images = [];
		switch(area){
			case 'arm': {
				images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/liposuction/arm/0${k+1}.png`), thumbnail}));
				break;
			}
			case 'leg': {
				images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/liposuction/leg/0${k+1}.png`), thumbnail}));
				break;
			}
			case 'body': {
				images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/liposuction/body/0${k+1}.png`), thumbnail}));
				break;
			}
			case 'facial': {
				images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/pr/face/0${k+1}.png`), thumbnail}));
				break;
			}
		}
		let values = {};
		let data = {};
		let components = [
			/*
			[
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>ตำแหน่งที่ต้องการดูดไขมัน</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'filler_before_know_details', horizontal: true, showClearButton: false, options: [
					{id: 'หน้า', name: 'หน้า', grid: optionGrid5},
					{id: 'ขา', name: 'ขา', grid: optionGrid5},
					{id: 'ท้อง', name: 'ท้อง', grid: optionGrid5},
					{id: 'แขน', name: 'แขน', grid: optionGrid5},
					{id: 'หลัง', name: 'หลัง', grid: optionGrid5}
				]
				}
			],
			[
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>ปัญหา/ข้อจำกัด/ความรุนแรง</SemiHeader>}
			],
			...Array.from(Array(9), (v, k)=> (
			{
				separator: true,
				style: { paddingBottom: 16},
				items: [
					{type: 'label', style: {paddingTop: 3, marginTop: 8, marginBottom: 8, fontWeight: 'normal'}, label:`${k+1}. Topic ${k+1}`, grid: {xs: '100%'}},
					{
						type: 'radio', name: `issues[${k}]`, horizontal: true, showClearButton: false, grid: {xs: '100%'}, options: [
						{id: 'น้อยมาก', name: 'น้อยมาก', grid: optionGrid5},
						{id: 'น้อย', name: 'น้อย', grid: optionGrid5},
						{id: 'ปานกลาง', name: 'ปานกลาง', grid: optionGrid5},
						{id: 'รุนแรง', name: 'รุนแรง', grid: optionGrid5},
						{id: 'รุนแรงมาก', name: 'รุนแรงมาก', grid: optionGrid5}
					]
					}
				]
			}
			)),
			*/
			[
				{type: 'custom', element: <SemiHeader>{this.context.translate('body_scale')}</SemiHeader>}
			],
			[
				{
					type: 'text', name: 'height', label: this.context.translate('height'), grid: grid3
				},
				{
					type: 'text', name: 'weight', label: this.context.translate('weight'), grid: grid3
				},
				{
					type: 'text', name: 'bmi', label: this.context.translate('bmi'), grid: grid3
				}
			],
			/*
			[
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>ความสวยงามของรูปหน้าขณะนี้ (ตามความพึงพอใจ)</SemiHeader>}
			],
			[
				{
					type: 'radio', name: `please`, horizontal: true, showClearButton: false, options: [
					{id: 'น้อยมาก', name: 'น้อยมาก', grid: optionGrid5},
					{id: 'น้อย', name: 'น้อย', grid: optionGrid5},
					{id: 'ปานกลาง', name: 'ปานกลาง', grid: optionGrid5},
					{id: 'รุนแรง', name: 'รุนแรง', grid: optionGrid5},
					{id: 'รุนแรงมาก', name: 'รุนแรงมาก', grid: optionGrid5}
				]
				}
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
				{type: 'custom', element: <SemiHeader>ข้อซักถามก่อนทำ</SemiHeader>}
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
			*/
			[
				{
					type: 'text', name: 'occupation', label: this.context.translate('occupation')
				}
			],
			[
				{
					type: 'text', name: 'big_event_in_this_year', label: this.context.translate('big_event_in_this_year')
				}
			],
			[
				{
					type: 'text', name: 'adviser', label: this.context.translate('adviser')
				}
			],[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header={this.context.translate('menu:liposuction')} images={images} values={values} data={data} onSubmit={this.submit}>
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
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default LiposuctionPage;
