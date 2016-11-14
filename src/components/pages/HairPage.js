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
			testBox: false,
			current_medication_others_check: false,
			allergy_check: false,
			alcohol_check: false,
			smoking_check: false,
			family_history_of_alopecia_check: false,
			scalp: '',
			physical_exam_gender: '',
			color_of_the_hair: ''
		};
	}

	submit = (data)=> {
		/*
		this.context.ajax.call("post", "submit/hair", data, {files: ['files']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
		*/
		console.log(data);
	};

	render() {
		let thumbnail = require('../../assets/img/upload-thumbnail.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let values = {};
		let data = {};

		let optionGrid = {xs: '100%', sm: '50%', md: '25%'},
			grid2 = {xs: '100%', md: '50%'},
			grid3 = {xs: '100%', md: '33.33%'},
			grid4 = {xs: '100%', md: '25%'},
			grid5 = {xs: '100%', md: '20%'},
			imgStyle = {width: '100%'};

		let components = [
			[
				{type: 'custom', element: <h3>Header 1</h3>}
			],
			[
				{type: 'text', label: 'Chief Complaint', name: 'chief_complaint', grid: grid2},
				{type: 'text', label: 'Past illness/surgery', name: 'past_illness', grid: grid2}
			],
			[
				{type: 'text', label: 'Present illness', name: 'present_illness', grid: grid2},
				{type: 'text', label: 'Underlying disease', name: 'underlying_disease', grid: grid2}
			],
			[
				{
					type: 'custom', element: <div style={{height: 36}}></div>
				}
			],
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
				{type: 'custom', element: <label>Current medication</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'current_medication', showClearButton: false, options: [
					{id: 'finasteride', name: 'Finasteride'},
					{id: 'minoxidil', name: 'Minoxidil'},
					{id: 'others', name: 'Others'}
				], onCheck: (v)=>this.setState({current_medication_others_check: v.indexOf('others')!=-1})}
			],
			{
				settings: {
					hide: !this.state.current_medication_others_check
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'current_medication_others', hint: 'Please specify'}
				]
			},
			{
				settings: {
					hide: !this.state.current_medication_others_check
				},
				items: [
					{type: 'space'}
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
				{type: 'custom', element: <label>Family History of alopecia</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'family_history_of_alopecia_check', showClearButton: false, options: [
					{id: 'no', name: 'No'},
					{id: 'yes', name: 'Yes'}
				], onCheck: (v)=>this.setState({family_history_of_alopecia_check: v.indexOf('yes')!=-1})}
			],
			{
				settings: {
					hide: !this.state.family_history_of_alopecia_check
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'family_history_of_alopecia'}
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
					{type: 'radio', name: 'physical_exam', horizontal: true, showClearButton: false, options: Array.from(Array(12), (v, k)=>({
						id: k+1, grid: optionGrid, name: <img style={imgStyle} src={example}/>
					}))}
				]
			},
			{
				settings: {
					hide: this.state.physical_exam_gender != 'women'
				},
				items: [
					{type: 'radio', name: 'physical_exam', horizontal: true, showClearButton: false, options: Array.from(Array(3), (v, k)=>({
						id: k+1, grid: optionGrid, name: <img style={imgStyle} src={example}/>
					}))}
				]
			},
			[
				{type: 'space'}
			],
			[
				{type: 'custom', element: <label>Scalp</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'scalp', showClearButton: false, options: [
					{id: 'erythena', name: 'Erythena'},
					{id: 'scarring', name: 'Scarring'},
					{id: 'scaling', name: 'Scaling'},
					{id: 'others', name: 'Others'}
				], onCheck: (v)=>this.setState({scalp: v})}
			],
			{
				settings: {
					hide: this.state.scalp != 'others'
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'color_of_the_hair_other', hint: 'Please specify'}
				]
			},
			{
				settings: {
					hide: this.state.scalp != 'others'
				},
				items: [
					{type: 'space'}
				]
			},
			[
				{type: 'custom', element: <label>Quality of donor hair</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'quality_of_donor_hair', showClearButton: false, options: [
					{id: 'fine', name: 'Fine'},
					{id: 'medium', name: 'Medium'},
					{id: 'coarse', name: 'Coarse'}
				]}
			],
			[
				{type: 'custom', element: <label>Elasticity</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'elasticity', showClearButton: false, options: [
					{id: 'good', name: 'Good'},
					{id: 'moderate', name: 'Moderate'},
					{id: 'poor', name: 'Poor'}
				]}
			],
			[
				{type: 'custom', element: <label>Texture of the hair</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'texture_of_the_hair', showClearButton: false, options: [
					{id: 'straight', name: 'Straight'},
					{id: 'waves', name: 'Waves'},
					{id: 'curl', name: 'Curl'}
				]}
			],
			[
				{type: 'custom', element: <label>Color of the hair</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'color_of_the_hair', showClearButton: false, options: [
					{id: 'black', name: 'Black'},
					{id: 'brown', name: 'Brown'},
					{id: 'red', name: 'Red'},
					{id: 'blonde', name: 'Blonde'},
					{id: 'others', name: 'Others'}
				], onCheck: (v)=>this.setState({color_of_the_hair: v})}
			],
			{
				settings: {
					hide: this.state.color_of_the_hair != 'others'
				},
				items: [
					{type: 'custom', element: <div style={{height: 36}}></div>, grid: {md: '30%'}},
					{type: 'text', name: 'color_of_the_hair_other', hint: 'Please specify'}
				]
			},
			{
				settings: {
					hide: this.state.color_of_the_hair != 'others'
				},
				items: [
					{type: 'space'}
				]
			},
			[
				{type: 'custom', element: <label>Donor</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'donor', showClearButton: false, options: [
					{id: 'high', name: 'High'},
					{id: 'normal', name: 'Normal'},
					{id: 'low', name: 'Low'}
				]}
			]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Hair" images={images} values={values} data={data} onSubmit={this.submit}>
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
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default HairPage;
