import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';
class LipsPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ever_did_surgery_before_check: false,
			surgery_count_before: 0,
			filler_before_know_details: ''
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
		this.context.ajax.call("post", "submit/lips", data, {files: ['files']});
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
					type: 'radio', name: 'ever_did_surgery_before_check', showClearButton: false, options: [
					{id: 'no', name: 'No, Never have eyelids surgery.'},
					{id: 'yes', name: 'Yes, Ever did before.'}
				], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes', surgery_count_before: 0, filler_before_know_details: ''})
				}
			],
			[
				{type: 'custom', element: <div  style={{height: '36px'}}></div>}
			],
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'custom', element: <label>How many time</label>, grid: {md: '30%'}
					},
					{
						type: 'numeric', name: 'surgery_count_before', grid: {md: '70%'}, onChange: (v)=> this.setState({surgery_count_before: v!='' ? parseInt(v) : 0})
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
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{type: 'custom', element: <div style={{height: '36px'}}></div>}
				]
			},
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'custom', element: <div  style={{height: '72px'}}><label>Know the detail</label></div>, grid: {md: '30%'}
					},
					{
						type: 'radio', name: 'filler_before_know_details', showClearButton: false, options: [
						{id: 'yes', name: 'Yes'},
						{id: 'no', name: 'No'}
					], onCheck: (v)=> this.setState({filler_before_know_details: v})
					}
				]
			},
			{
				settings: {
					hide: this.state.filler_before_know_details != 'yes'
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'filler_brand', multiLine: true, label: 'Filler (brand)', grid: {md: 'calc((100% / 2) - (30% / 2))'}
					},
					{
						type: 'text', name: 'filler_count', multiLine: true, label: 'How many times', grid: {md: 'calc((100% / 2) - (30% / 2))'}
					}
				]
			},
			{
				settings: {
					hide: this.state.filler_before_know_details != 'yes'
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'filler_last_time', multiLine: true, label: 'Last time', grid: {md: 'calc((100% / 3) - (30% / 3))'}
					},
					{
						type: 'text', name: 'filler_volume', multiLine: true, label: 'Filler volume', grid: {md: 'calc((100% / 3) - (30% / 3))'}
					},
					{
						type: 'text', name: 'filler_place_or_doctor', multiLine: true, label: 'Place / Doctor', grid: {md: 'calc((100% / 3) - (30% / 3))'}
					}
				]
			},
			{
				settings: {
					hide: this.state.filler_before_know_details != 'no'
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'filler_count', multiLine: true, label: 'How many times', grid: {md: '70%'}
					}
				]
			},
			{
				settings: {
					hide: this.state.filler_before_know_details != 'no'
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'filler_last_time', multiLine: true, label: 'Last time', grid: {md: 'calc((100% / 2) - (30% / 2))'}
					},
					{
						type: 'text', name: 'filler_place_or_doctor', multiLine: true, label: 'Place / Doctor', grid: {md: 'calc((100% / 2) - (30% / 2))'}
					}
				]
			},
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{type: 'custom', element: <div style={{height: '36px'}}></div>}
				]
			},
			[
				{type: 'custom', element: <h3>ข้อควรทราบก่อนการผ่าตัด</h3>}
			],
			...Array.from(Array(8), (v, k)=> (
				[
					{
						type: 'checkbox', name: `acknowledges[${k}]`, showClearButton: false, options: [
						{id: 'accepted', name: `Topic ${k+1}`}
					]
					}
				]
			))
		];
		let formTemplate = {components};
		return (
			<MainForm header="Lips" images={images} values={values} data={data} onSubmit={this.submit}>
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
LipsPage.contextTypes = {
	ajax: PropTypes.object
};
export default LipsPage;
