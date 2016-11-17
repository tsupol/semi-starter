import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';

const
	marginBottomStyle = {marginBottom: 24},
	imgOptionGrid = {xs: '100%', sm: '50%', md: '20%'},
	imgStyle = {width: '100%'},
	optionGrid3 = {xs: '100%', sm: '50%', md: '33.3333333333%'},
	optionGrid4 = {xs: '100%', sm: '50%', md: '25%'},
	optionGrid5 = {xs: '100%', sm: '50%', md: '20%'},
	optionGrid6 = {xs: '100%', sm: '50%', md: '16.6666666667%'},
	optionGridOther = {xs: '100%'},
	rowSpace = {type: 'space', height: '16px', noPadding: true, grid: {
		xs: '100%', md: '0%'
	}},
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
		this.context.ajax.call("post", "submit/eyelids", data, {files: ['files']}).then((data)=>{
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
				{type: 'custom', element: <h3>Information</h3>}
			],
			[
				{
					type: 'radio', name: 'ever_did_surgery_before_check', horizontal: true, showClearButton: false, options: [
						{id: 'no', name: 'No, Never have eyelids surgery.', grid: optionGrid4},
						{id: 'yes', name: 'Yes, Ever did before.', grid: optionGrid4}
					], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes', surgery_count_before: 0})
				}
			],
			{
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{
						type: 'numeric', name: 'surgery_count_before', label: 'How many time', onChange: (v)=> this.setState({surgery_count_before: v!='' ? parseInt(v) : 0})
					}
				]
			},
			...Array.from(Array(this.state.surgery_count_before), (v, k)=>(
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items:
					[
						{
							type: 'custom', element: <div  style={{height: '72px', textAlign: 'right'}}><label style={{lineHeight: '72px'}}>{k+1}</label></div>, grid: {md: '30px'}
						},
						{
							type: 'text', name: `surgeries_before[${k}][how]`, multiLine: true, label: 'How', grid: {md: 'calc((100% / 3) - (30px / 3))'}
						},
						{
							type: 'text', name: `surgeries_before[${k}][where]`, multiLine: true, label: 'Where', grid: {md: 'calc((100% / 3) - (30px / 3))'}
						},
						{
							type: 'text', name: `surgeries_before[${k}][duration]`, multiLine: true, label: 'Duration', grid: {md: 'calc((100% / 3) - (30px / 3))'}
						}
					]
			}
			)),
			[
				{type: 'custom', element: <h3>Eye tattoo</h3>}
			],
			[
				{
					type: 'radio', name: 'eye_tattoo', showClearButton: false, horizontal: true, options: [
						{id: 'no', name: 'No tattoo', grid: optionGrid5},
						{id: 'bottom', name: 'Bottom eyelids', grid: optionGrid5},
						{id: 'top', name: 'Top eyelids', grid: optionGrid5},
						{id: '3d', name: '3d eyelids', grid: optionGrid5},
						{id: 'eyelash', name: 'Extend eyelash', grid: optionGrid5},
						{id: 'other', name: 'Other', grid: optionGridOther, style: {marginTop: 16}}
					], onCheck: (v)=> this.setState({eye_tattoo_other: v=='other'})
				}
			],
			{
				hide: !this.state.eye_tattoo_other,
				style: {
					paddingTop: 16,
					paddingBottom: 16
				},
				items: [
					{
						type: 'text', name: 'eye_tattoo_other', multiLine: true, hint: 'Please specify'
					}
				]
			},
			[
				{type: 'custom', element: <h3>Vision issue</h3>}
			],
			[
				{
					type: 'checkbox', name: 'vision_issue_short_check', horizontal: true, showClearButton: false, options: [
						{id: 'short', name: 'Short', grid: optionGrid3},
						{id: 'long', name: 'Long', grid: optionGrid3},
						{id: 'astigmatism', name: 'Astigmatism', grid: optionGrid3}
					], onCheck: (v)=> this.setState({
						vision_issue_short_check: v.indexOf('short')!=-1,
						vision_issue_long_check: v.indexOf('long')!=-1,
						vision_issue_astigmatism_check: v.indexOf('astigmatism')!=-1
					})
				}
			],
			[
				{
					type: 'text', name: 'vision_issue_short', multiLine: true, hint: 'Please specify', grid: optionGrid3, hide: !this.state.vision_issue_short_check,
				},
				{
					type: 'text', name: 'vision_issue_long', multiLine: true, hint: 'Please specify', grid: optionGrid3, hide: !this.state.vision_issue_long_check,
				},
				{
					type: 'text', name: 'vision_issue_astigmatism', multiLine: true, hint: 'Please specify', grid: optionGrid3, hide: !this.state.vision_issue_astigmatism_check,
				}
			],
			[
				{type: 'custom', element: <h3>Style expectation</h3>}
			],

				{
					style: {
						paddingTop: 16,
						paddingBottom: 16
					},
					items: [
						{
							type: 'radio', name: 'style_expectation', horizontal: true, showClearButton: false, options: [
								{id: 'high', name: 'High', grid: optionGrid5},
								{id: 'normal', name: 'normal', grid: optionGrid5},
								{id: 'mini', name: 'Mini', grid: optionGrid5},
								{id: 'follow_suggestions', name: 'Follow suggestions', grid: optionGrid5},
								{id: 'other', name: 'Other', grid: optionGridOther, style: {marginTop: 16}}
							], onCheck: (v)=> this.setState({style_expectation_other: v=='other'})
						}
					]
				}
			,
			{
				hide: !this.state.style_expectation_other,
				style: {
					paddingTop: 16,
					paddingBottom: 16
				},
				items: [
					{
						type: 'text', name: 'style_expectation_other', multiLine: true, hint: 'Please specify'
					}
				]
			}
		];
		let formTemplate = {components};
		return (
			<MainForm header="Eyelids" images={images} values={values} data={data} onSubmit={this.submit}>
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
EyelidsPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default EyelidsPage;
