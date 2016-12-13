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
		//let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let images = [];
		images.push({example: require('../../assets/img/eyelids/IMG_8034.jpg')});
		images.push({example: require('../../assets/img/eyelids/PIC_09019.jpg')});
		images.push({example: require('../../assets/img/eyelids/PIC_09022.jpg')});
		images.push({example: require('../../assets/img/eyelids/PIC_09026.jpg')});
		images.push({example: require('../../assets/img/eyelids/PIC_09044.jpg')});
		images.push({example: require('../../assets/img/eyelids/PIC_09045.jpg')});
		images = images.map((img)=>Object.assign({}, img, {thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('current_issue:eyebrow')}</SemiHeader>}
			],
			[
				{
					type: 'checkbox', name: 'eyebrow_issue', horizontal: true, showClearButton: false, options: [
						{id: 'low_space_eyebrow', grid: imgOptionGrid, name: <div><label>{this.context.translate('low_space_eyebrow')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'uneven_eyebrow', grid: imgOptionGrid, name: <div><label>{this.context.translate('uneven_eyebrow')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'tail_up_eyebrow', grid: imgOptionGrid, name: <div><label>{this.context.translate('tail_up_eyebrow')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'tail_down_eyebrow', grid: imgOptionGrid, name: <div><label>{this.context.translate('tail_down_eyebrow')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'high_hair_line_eyebrow', grid: imgOptionGrid, name: <div><label>{this.context.translate('high_hair_line_eyebrow')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'others', grid: optionGridOther, name: this.context.translate('others'), style:{marginTop: 16}}
					], onCheck: (v)=> this.setState({eyebrow_issue_other: v.indexOf('others')!=-1})
				}
			],
			{
				hide: !this.state.eyebrow_issue_other,
				items: [
					{
						type: 'text', name: 'eyebrow_issue_other', multiLine: true, hint: this.context.translate('please_specify')
					}
				]
			},
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('current_issue:eye')}</SemiHeader>}
			],
			[
				{
					type: 'checkbox', name: 'eyes_issue', horizontal: true, showClearButton: false, options: [
						{id: 'head_down_eye', grid: imgOptionGrid, name: <div><label>{this.context.translate('head_down_eye')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'head_up_eye', grid: imgOptionGrid, name: <div><label>{this.context.translate('head_up_eye')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'single_eyelids', grid: imgOptionGrid, name: <div><label>{this.context.translate('single_eyelids')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'uneven_eyelids', grid: imgOptionGrid, name: <div><label>{this.context.translate('uneven_eyelids')}</label><br/><img src={example} style={imgStyle} /></div>},
						{id: 'others', grid: optionGridOther, name: this.context.translate('others'), style:{marginTop: 16}}
					], onCheck: (v)=> this.setState({eyes_issue_other: v.indexOf('others')!=-1})
				}
			],
			{
				hide: !this.state.eyes_issue_other,
				items: [
					{
						type: 'text', name: 'eyes_issue_other', multiLine: true, hint: this.context.translate('please_specify')
					}
				]
			},
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('current_issue:wrinkle')}</SemiHeader>}
			],
			{
				items: [
					{
						type: 'checkbox', name: 'wrinkle_issue', horizontal: true, showClearButton: false, options: [
							{id: 'wrinkle_around_eye', name: this.context.translate('wrinkle_around_eye'), grid: optionGrid5},
							{id: 'wrinkle_around_eyelids', name: this.context.translate('wrinkle_around_eyelids'), grid: optionGrid5},
							{id: 'wrinkle_under_eye', name: this.context.translate('wrinkle_under_eye'), grid: optionGrid5},
							{id: 'forehead_wrinkle', name: this.context.translate('forehead_wrinkle'), grid: optionGrid5},
							{id: 'wrinkle_when_frown', name: this.context.translate('wrinkle_when_frown'), grid: optionGrid5},
							{id: 'others', name: this.context.translate('others'), grid: optionGridOther, style: {marginTop: 16}}
						], onCheck: (v)=> this.setState({wrinkle_issue_other: v.indexOf('others') != -1})
					}
				]
			},
			{
				hide: !this.state.wrinkle_issue_other,
				items: [
					{
						type: 'text', name: 'wrinkle_issue_other', multiLine: true, hint: this.context.translate('please_specify')
					}
				]
			},[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header={this.context.translate('menu:eyebrow')} images={images} values={values} data={data} onSubmit={this.submit}>
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
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default EyebrowPage;
