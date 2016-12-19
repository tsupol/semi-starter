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
		let thumbnail = require(this.props.locale=="th" ? '../../assets/img/upload-thumbnail.png': '../../assets/img/upload-thumbnail-en.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/implants/0${k+1}.png`), thumbnail}));
		let images2 = {body: Array.from(Array(5), (v, k)=>(require(`../../assets/img/implants/body/0${k+1}.png`)))};
		let images3 = [16,15,12,18,19].map((v, k)=>(require(`../../assets/img/icon/icon-${v}.png`)));
		let values = {};
		let data = {};
		
		let components = [
			[
				{type: 'custom', element: <SemiHeader line="solid" style={{marginBottom: 24}}>{this.context.translate('forehead_shape')}</SemiHeader>}
			],
			[
				{type: 'radio', name: 'forehead_shape', horizontal: true, showClearButton: false, grid: {xs: '100%'}, options: [
					{id: 'straight_forehead', grid: imgOptionGrid, name: <div><label>{this.context.translate('straight_forehead')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'wide_forehead', grid: imgOptionGrid, name: <div><label>{this.context.translate('wide_forehead')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'arched_forehead', grid: imgOptionGrid, name: <div><label>{this.context.translate('arched_forehead')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'sharp_forehead', grid: imgOptionGrid, name: <div><label>{this.context.translate('sharp_forehead')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'double_arched_forehead', grid: imgOptionGrid, name: <div><label>{this.context.translate('double_arched_forehead')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'mountain_shaped_forehead', grid: imgOptionGrid, name: <div><label>{this.context.translate('mountain_shaped_forehead')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'narrow_forehead', grid: imgOptionGrid, name: <div><label>{this.context.translate('narrow_forehead')}</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader line="solid" style={{marginBottom: 24}}>{this.context.translate('hip_and_bottom_shape')}</SemiHeader>}
			],
			[
				{type: 'radio', name: 'hip_and_bottom_shape', horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'overall_flat_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('overall_flat_shape')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'upper_flat_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('upper_flat_shape')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'side_flat_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('side_flat_shape')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'inner_flat_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('inner_flat_shape')}</label><br/><img style={imgStyle} src={example} /></div>},
					{id: 'lower_flat_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('lower_flat_shape')}</label><br/><img style={imgStyle} src={example} /></div>}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader line="solid" style={{marginBottom: 24}}>{this.context.translate('body_shape')}</SemiHeader>}
			],
			[
				{type: 'radio', name: 'body_shape', horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'sandglass_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('sandglass_shape')}</label><br/><img style={imgStyle} src={images2.body[0]} /></div>},
					{id: 'triangle_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('triangle_shape')}</label><br/><img style={imgStyle} src={images2.body[1]} /></div>},
					{id: 'straight_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('straight_shape')}</label><br/><img style={imgStyle} src={images2.body[2]} /></div>},
					{id: 'pear_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('pear_shape')}</label><br/><img style={imgStyle} src={images2.body[3]} /></div>},
					{id: 'apple_shape', grid: imgOptionGrid, name: <div><label>{this.context.translate('apple_shape')}</label><br/><img style={imgStyle} src={images2.body[4]} /></div>}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader line="solid" style={{marginBottom: 24}}>บริเวณที่เอาไขมันออกมา</SemiHeader>}
			],
			[
				{type: 'radio', name: 'liposuction_area', horizontal: true, showClearButton: false, grid: {md: '100%'}, options: [
					{id: 'ต้นแขน', grid: imgOptionGrid, name: <div><label>ต้นแขน</label><br/><img style={imgStyle} src={images3[0]} /></div>},
					{id: 'หน้าท้อง', grid: imgOptionGrid, name: <div><label>หน้าท้อง</label><br/><img style={imgStyle} src={images3[1]} /></div>},
					{id: 'ต้นขา', grid: imgOptionGrid, name: <div><label>ต้นขา</label><br/><img style={imgStyle} src={images3[2]} /></div>},
					{id: 'ก้น', grid: imgOptionGrid, name: <div><label>ก้น</label><br/><img style={imgStyle} src={images3[3]} /></div>},
					{id: 'สะโพก', grid: imgOptionGrid, name: <div><label>สะโพก</label><br/><img style={imgStyle} src={images3[4]} /></div>}
				]}
			],
			/*
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
			<MainForm header={this.context.translate('menu:implants')} images={images} values={values} data={data} onSubmit={this.submit}>
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
