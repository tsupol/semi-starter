import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';

const
	marginBottomStyle = {marginBottom: 24},
	imgOptionGrid = {xs: '100%', sm: '50%', md: '20%'},
	imgStyle = {width: '100%'},
	optionGrid2 = {xs: '100%', sm: '50%'},
	optionGrid3 = {xs: '100%', sm: '50%', md: '33.3333333333%'},
	optionGrid4 = {xs: '100%', sm: '50%', md: '25%'},
	optionGrid5 = {xs: '100%', sm: '50%', md: '20%'},
	optionGrid6 = {xs: '100%', sm: '50%', md: '16.6666666667%'},
	optionGridOther = {xs: '100%'},
	hiddenTextStyle = {paddingTop: 16, paddingBottom: 0},
	rowSpace = {
		type: 'space', height: '16px', noPadding: true, grid: {
			xs: '100%', md: '0%'
		}
	},
	cbRowParam = {
		separator: true,
		style: {
			paddingTop: 16,
			paddingBottom: 16
		}
	};

class EyelidsPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ever_did_surgery_before_check: false,
			surgery_count_before: 0,
			eye_tattoo_other: false,
			vision_issue_short_check: false,
			vision_issue_long_check: false,
			vision_issue_astigmatism_check: false,
			style_expectation_other: false
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
		this.context.ajax.call("post", "submit/eyelids", data, {files: ['files']}).then((data)=> {
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
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('basic_information')}</SemiHeader>}
			],
			[
				{
					type: 'radio',
					name: 'ever_did_surgery_before_check',
					horizontal: true,
					showClearButton: false,
					options: [
						{id: 'no', name: this.context.translate('surgery_history:no', {surgery: this.context.translate('menu:around-eyes')}), grid: optionGrid2},
						{id: 'yes', name: this.context.translate('surgery_history:yes', {surgery: this.context.translate('menu:around-eyes')}), grid: optionGrid2}
					],
					onCheck: (v)=> this.setState({ever_did_surgery_before_check: v == 'yes', surgery_count_before: 0})
				}
			],
			{
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{
						type: 'numeric',
						name: 'surgery_count_before',
						label: this.context.translate('how_many_time'),
						onChange: (v)=> this.setState({surgery_count_before: v != '' ? parseInt(v) : 0})
					}
				]
			},
			...Array.from(Array(this.state.surgery_count_before), (v, k)=>(
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'label',
						label: k + 1,
						grid: {md: '30px'}
					},
					{
						type: 'text',
						name: `surgeries_before[${k}][how]`,
						multiLine: true,
						label: this.context.translate('surgeries_before:how'),
						grid: {md: 'calc((100% / 3) - (30px / 3))'}
					},
					{
						type: 'text',
						name: `surgeries_before[${k}][place]`,
						multiLine: true,
						label: this.context.translate('place'),
						grid: {md: 'calc((100% / 3) - (30px / 3))'}
					},
					{
						type: 'text',
						name: `surgeries_before[${k}][duration]`,
						multiLine: true,
						label: this.context.translate('duration'),
						grid: {md: 'calc((100% / 3) - (30px / 3))'}
					}
				]
			}
			)),
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('eye_tattoo')}</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'eye_tattoo', showClearButton: false, horizontal: true, options: [
					{id: 'no', name: this.context.translate('eye_tattoo:no'), grid: optionGrid3},
					{id: 'bottom', name: this.context.translate('eye_tattoo:bottom'), grid: optionGrid3},
					{id: 'top', name: this.context.translate('eye_tattoo:top'), grid: optionGrid3},
					{id: '3d', name: this.context.translate('eye_tattoo:3d'), grid: optionGrid3},
					{id: 'eyelash', name: this.context.translate('eye_tattoo:eyelash'), grid: optionGrid3},
					{id: 'other', name: this.context.translate('others'), grid: optionGrid3}
					// {id: 'other', name: 'Other', grid: optionGrid3, style: {marginTop: 16}}
				], onCheck: (v)=> this.setState({eye_tattoo_other: v == 'other'})
				}
			],
			{
				hide: !this.state.eye_tattoo_other,
				style: hiddenTextStyle,
				items: [
					{
						type: 'text', name: 'eye_tattoo_other', multiLine: true, hint: this.context.translate('please_specify')
					}
				]
			},
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('vision_issue')}</SemiHeader>}
			],
			[
				{
					type: 'checkbox',
					name: 'vision_issue_short_check',
					horizontal: true,
					showClearButton: false,
					options: [
						{
							id: 'short', name: this.context.translate('vision_issue:short'), grid: optionGrid3, belowInput: {
							type: 'text', name: 'vision_issue_short', multiLine: true, hint: this.context.translate('please_specify')
						}
						},
						{
							id: 'long', name: this.context.translate('vision_issue:long'), grid: optionGrid3, belowInput: {
							type: 'text', name: 'vision_issue_long', multiLine: true, hint: this.context.translate('please_specify')
						}
						},
						{
							id: 'astigmatism', name: this.context.translate('vision_issue:astigmatism'), grid: optionGrid3, belowInput: {
							type: 'text', name: 'vision_issue_astigmatism', multiLine: true, hint: this.context.translate('please_specify')
						}
						}
					],
					onCheck: (v)=> this.setState({
						// vision_issue_short_check: v.indexOf('short')!=-1,
						// vision_issue_long_check: v.indexOf('long')!=-1,
						// vision_issue_astigmatism_check: v.indexOf('astigmatism')!=-1
					})
				}
			],
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('eyelids_style_expectation')}</SemiHeader>}
			],
			{
				items: [
					{
						type: 'radio', name: 'style_expectation', horizontal: true, showClearButton: false, options: [
						{id: 'high', name: this.context.translate('eyelids_style_expectation:high'), grid: optionGrid5},
						{id: 'normal', name: this.context.translate('eyelids_style_expectation:normal'), grid: optionGrid5},
						{id: 'mini', name: this.context.translate('eyelids_style_expectation:mini'), grid: optionGrid5},
							{
								id: 'follow_suggestions',
								name: this.context.translate('eyelids_style_expectation:follow_suggestions'),
								grid: {xs: '100%', sm: '50%', md: '40%'}
							},
							{
								id: 'other', name: this.context.translate('others'), grid: optionGridOther, belowInput: {
								type: 'text', name: 'style_expectation_other', multiLine: true, hint: this.context.translate('please_specify')
							}
						}
					], onCheck: (v)=> this.setState({style_expectation_other: v == 'other'})
					}
				]
			}
			,
			[
				{type: 'space'}
			]
		];
		let formTemplate = {components};
		return (
			<MainForm header={this.context.translate('menu:eyelids')} images={images} values={values} data={data} onSubmit={this.submit}>
				<FormGenerator formTemplate={formTemplate}/>
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
EyelidsPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default EyelidsPage;
