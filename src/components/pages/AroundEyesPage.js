import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';
class AroundEyesPage extends Component {
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
				{type: 'custom', element: <h3>Information</h3>}
			],
			[
				{
					type: 'radio', name: 'ever_did_surgery_before_check', showClearButton: false, options: [
					{id: 'no', name: 'No, Never have eyelids surgery.'},
					{id: 'yes', name: 'Yes, Ever did before.'}
				], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes', surgery_count_before: 0})
				}
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
				{type: 'custom', element: <h3>Eye surgery</h3>}
			],
			[
				{
					type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
				},
				{
					type: 'radio', name: 'eye_surgery', showClearButton: false, options: [
					{id: 'กรีดตัดหนังตาบน', name: 'กรีดตัดหนังตาบน'},
					{id: 'กรีดตัดหนังตาล่าง', name: 'กรีดตัดหนังตาล่าง'},
					{id: 'กล้ามเนื้อตาอ่อนแรง', name: 'กล้ามเนื้อตาอ่อนแรง'},
					{id: 'ถุงใต้ตาแผลด้านใน', name: 'ถุงใต้ตาแผลด้านใน'},
					{id: 'ตาสองชั้น(แผลเล็ก)', name: 'ตาสองชั้น(แผลเล็ก)'}
				]
				}
			]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Nose" images={images} values={values} data={data} onChange={this.handleFormChange}>
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
AroundEyesPage.contextTypes = {
	ajax: PropTypes.object
};
export default AroundEyesPage;
