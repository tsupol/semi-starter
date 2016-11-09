import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';
class HairPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			current_medication_others_check: false,
			allergy_check: false,
			alcohol_check: false,
			smoking_check: false,
			family_history_of_alapecia_check: false,
			physical_exam_gender: ''
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
				{type: 'custom', element: <h3>Header 1</h3>}
			],
			[
				{type: 'text', label: 'Chief Complaint', name: 'chief_complaint'},
				{type: 'text', label: 'Past illness/surgery', name: 'past_illness'}
			],
			[
				{type: 'text', label: 'Present illness', name: 'present_illness'},
				{type: 'text', label: 'Underlying disease', name: 'underlying_disease'}
			],
			[
				{
					type: 'custom', element: <div style={{height: 36}}></div>
				}
			],
			[
				{type: 'custom', element: <label>Current medication</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'current_medication', showClearButton: false, options: [
					{id: 'pinacle', name: 'Pinacle'},
					{id: 'minocoal', name: 'Minocoal'},
					{id: 'others', name: 'Others'}
				], onCheck: (v)=>this.setState({current_medication_others_check: v.indexOf('others')!=-1})}
			],
			{
				settings: {
					hide: !this.state.current_medication_others_check
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'current_medication_others'}
				]
			},
			[
				{type: 'custom', element: <label>Allergy</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'allergy_check', showClearButton: false, options: [
					{id: 'no', name: 'No'},
					{id: 'yes', name: 'Yes'}
				], onCheck: (v)=>this.setState({allergy_check: v.indexOf('yes')!=-1})}
			],
			{
				settings: {
					hide: !this.state.allergy_check
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'allergy'}
				]
			},
			[
				{type: 'custom', element: <label>Alcohol</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'alcohol_check', showClearButton: false, options: [
					{id: 'no', name: 'No'},
					{id: 'yes', name: 'Yes'}
				], onCheck: (v)=>this.setState({alcohol_check: v.indexOf('yes')!=-1})}
			],
			{
				settings: {
					hide: !this.state.alcohol_check
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'alcohol'}
				]
			},
			[
				{type: 'custom', element: <label>Smoking</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'smoking_check', showClearButton: false, options: [
					{id: 'no', name: 'No'},
					{id: 'yes', name: 'Yes'}
				], onCheck: (v)=>this.setState({smoking_check: v.indexOf('yes')!=-1})}
			],
			{
				settings: {
					hide: !this.state.smoking_check
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'smoking'}
				]
			},
			[
				{type: 'custom', element: <label>Family History of alapecia</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'family_history_of_alapecia_check', showClearButton: false, options: [
					{id: 'no', name: 'No'},
					{id: 'yes', name: 'Yes'}
				], onCheck: (v)=>this.setState({family_history_of_alapecia_check: v.indexOf('yes')!=-1})}
			],
			{
				settings: {
					hide: !this.state.family_history_of_alapecia_check
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'family_history_of_alapecia'}
				]
			},
			[
				{type: 'custom', element: <h3>Physical Exam</h3>}
			],
			[
				{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
				{type: 'radio', name: 'physical_exam_gender', showClearButton: false, options: [
					{id: 'men', name: 'Men'},
					{id: 'women', name: 'Women'}
				], onCheck: (v)=>this.setState({physical_exam_gender: v})}
			],
			{
				settings: {
					hide: this.state.physical_exam_gender != 'men'
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'radio', name: 'physical_exam', showClearButton: false, options: Array.from(Array(12), (v, k)=>({id: k+1, name: <img style={{width: '200px'}} src={example}/>}))}
				]
			},
			{
				settings: {
					hide: this.state.physical_exam_gender != 'women'
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'radio', name: 'physical_exam', showClearButton: false, options: Array.from(Array(3), (v, k)=>({id: k+1, name: <img style={{width: '200px'}} src={example}/>}))}
				]
			},
			[
				{type: 'custom', element: <label>Scolp</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'scolp', showClearButton: false, options: [
					{id: 'xxx1', name: 'xxx1'},
					{id: 'xxx2', name: 'xxx2'},
					{id: 'xxx3', name: 'xxx3'},
					{id: 'xxx4', name: 'xxx4'}
				]}
			],
			[
				{type: 'custom', element: <label>Quality of donor hair</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'scolp', showClearButton: false, options: [
					{id: 'yyy1', name: 'yyy1'},
					{id: 'yyy2', name: 'yyy2'},
					{id: 'yyy3', name: 'yyy3'}
				]}
			],
			[
				{type: 'custom', element: <label>Elatiscity</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'scolp', showClearButton: false, options: [
					{id: 'zzz1', name: 'zzz1'},
					{id: 'zzz2', name: 'zzz2'},
					{id: 'zzz3', name: 'zzz3'}
				]}
			],
			[
				{type: 'custom', element: <label>Texture of the hair</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'scolp', showClearButton: false, options: [
					{id: 'straighth', name: 'Straighth'},
					{id: 'waves', name: 'Waves'},
					{id: 'curl', name: 'Curl'}
				]}
			],
			[
				{type: 'custom', element: <label>Color of the hair</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'scolp', showClearButton: false, options: [
					{id: 'black', name: 'Black'},
					{id: 'brown', name: 'Brown'},
					{id: 'xxxxx', name: 'xxxxx'},
					{id: 'yyyyy', name: 'yyyyy'},
					{id: 'zzzzz', name: 'zzzzz'}
				]}
			],
			[
				{type: 'custom', element: <label>Donor</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'scolp', showClearButton: false, options: [
					{id: 'aaa1', name: 'aaa1'},
					{id: 'aaa2', name: 'aaa2'},
					{id: 'aaa3', name: 'aaa3'}
				]}
			]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Hair" images={images} values={values} data={data} onChange={this.handleFormChange}>
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
HairPage.contextTypes = {
	ajax: PropTypes.object
};
export default HairPage;
