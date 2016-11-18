import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';

const
	// Common grid rules
	optionGrid = {xs: '100%', sm: '50%', md: '25%'}, // for horizontal radio button image
	grid2 = {xs: '100%', md: '50%'},
	grid3 = {xs: '100%', md: '33.33%'},
	grid4 = {xs: '100%', md: '25%'},
	grid5 = {xs: '100%', md: '20%'},

	// todo: read here!
	// Note: all constants below are used in every horizontal checkboxes row

	// 30:70 proportion of label and checkboxes
	labelGrid = {xs: '100%', md: '30%'},
	cbGrid = {xs: '100%', md: '70%'},

	// adjust hidden text field +1% for better alignment
	hiddenTextGrid = {xs: '100%', md: '69%', mdOffset: '31%'},

	labelStyle = {paddingTop: 3, fontWeight: 'normal'},

	// Because this form has no more than 5 radio buttons
	optionGrid5 = {xs: '100%', sm: '25%', md: '20%'},

	// For space between topic and checkboxes when `md`
	rowSpace = {type: 'space', height: '16px', noPadding: true, grid: {
		xs: '100%', md: '0%'
	}},

	// todo: change image dimension according to real image here...
	imgStyle = {width: '100%'},

	// For some headers (often one with checkboxes row below)
	marginBottomStyle = {marginBottom: 24},

	// Row properties, horizontal
	cbRowParam = {
		separator: true,
		style: {
			paddingTop: 16,
			paddingBottom: 16
		}
	};

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
			// bottom section
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
		console.log('this.state', this.state);
		let thumbnail = require('../../assets/img/upload-thumbnail.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let values = {};
		let data = {};

		let components = [
			[
				{type: 'custom', element: <SemiHeader>Header 1</SemiHeader>}
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
				{type: 'custom', element: <div style={{height: 36}}></div>}
			],


			// Medical Radio Selects
			// ----------------------------------------

			// todo: read here!
			/**
			 * Note: how to make good looking and responsive checkboxes row
			 * 1. use constants I wrote above the class
			 * 2. add `horizontal: true` to item type radio
			 * 3. you can now move hidden text field to the same row (as you can see)
			 */

			{
				// todo: read here!
				...cbRowParam, // frequently used parameters
				items: [

					// I recommend using type `label` instead of `custom`
					{type: 'label', style: labelStyle, label:`Allergy`, grid: labelGrid},

					// For space between topic and checkboxes when `md`
					{...rowSpace},

					{
						type: 'radio',
						name: 'allergy_check',
						showClearButton: false,
						horizontal: true, // must be true
						grid: cbGrid, options: [
							{id: 'no', name: 'No', grid: optionGrid5}, // Give responsiveness for each radio button
							{id: 'yes', name: 'Yes', grid: optionGrid5}
						],
						onCheck: (v)=>this.setState({allergy_check: v.indexOf('yes')!=-1})},

					// hidden field can now be in the same row
					{type: 'text', name: 'allergy', hint: 'Please specify', hide: !this.state.allergy_check, grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'custom', element: <label>Current medication</label>, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'current_medication', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'finasteride', name: 'Finasteride', grid: optionGrid5},
						{id: 'minoxidil', name: 'Minoxidil', grid: optionGrid5},
						{id: 'others', name: 'Others'}
					], onCheck: (v)=>this.setState({current_medication_others_check: v.indexOf('others')!=-1})},
					{type: 'text', name: 'current_medication_others', hint: 'Please specify', hide: !this.state.current_medication_others_check, grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Alcohol`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'alcohol_check', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'no', name: 'No', grid: optionGrid5},
						{id: 'yes', name: 'Yes', grid: optionGrid5}
					], onCheck: (v)=>this.setState({alcohol_check: v.indexOf('yes')!=-1})},
					{type: 'text', name: 'alcohol', hint: 'Please specify', hide: !this.state.alcohol_check, grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Smoking`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'smoking_check', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'no', name: 'No', grid: optionGrid5},
						{id: 'yes', name: 'Yes', grid: optionGrid5}
					], onCheck: (v)=>this.setState({smoking_check: v.indexOf('yes')!=-1})},
					{type: 'text', name: 'smoking', hint: 'Please specify', hide: !this.state.smoking_check, grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Family History of alopecia`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'family_history_of_alopecia_check', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'no', name: 'No', grid: optionGrid5},
						{id: 'yes', name: 'Yes', grid: optionGrid5}
					], onCheck: (v)=>this.setState({family_history_of_alopecia_check: v.indexOf('yes')!=-1})},
					{type: 'text', name: 'family_history_of_alopecia', hint: 'Please specify', hide: !this.state.family_history_of_alopecia_check, grid: hiddenTextGrid}
				]
			},


			// Physical Exam
			// ----------------------------------------

			[
				{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>Physical Exam</SemiHeader>}
			],
			{
				items: [
					{type: 'radio', name: 'physical_exam_gender', showClearButton: false, options: [
						{id: 'men', name: 'Men', grid: grid4},
						{id: 'women', name: 'Women', grid: grid4}
					], onCheck: (v)=>this.setState({physical_exam_gender: v})}
				]
			},
			{
				style: {marginTop: 32},
				hide: this.state.physical_exam_gender != 'men',
				items: [
					{type: 'radio', name: 'physical_exam', horizontal: true, showClearButton: false, options: Array.from(Array(12), (v, k)=>({
						id: k+1, grid: optionGrid, name: <img style={imgStyle} src={example}/>
					}))}
				]
			},
			{
				style: {marginTop: 32},
				hide: this.state.physical_exam_gender != 'women',
				items: [
					{type: 'radio', name: 'physical_exam', horizontal: true, showClearButton: false, options: Array.from(Array(3), (v, k)=>({
						id: k+1, grid: optionGrid, name: <img style={imgStyle} src={example}/>
					}))}
				]
			},
			[
				{type: 'space'}
			],


			// Hair Radio Selects
			// ----------------------------------------

			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Scalp`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'scalp', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'erythena', name: 'Erythena', grid: optionGrid5},
						{id: 'scarring', name: 'Scarring', grid: optionGrid5},
						{id: 'scaling', name: 'Scaling', grid: optionGrid5},
						{id: 'others', name: 'Others', grid: optionGrid5}
					], onCheck: (v)=>this.setState({scalp: v})},
					{type: 'text', name: 'scalp_other', hint: 'Please specify', hide: this.state.scalp != 'others', grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Quality of donor hair`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'quality_of_donor_hair', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'fine', name: 'Fine', grid: optionGrid5},
						{id: 'medium', name: 'Medium', grid: optionGrid5},
						{id: 'coarse', name: 'Coarse', grid: optionGrid5}
					]}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Elasticity`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'elasticity', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'good', name: 'Good', grid: optionGrid5},
						{id: 'moderate', name: 'Moderate', grid: optionGrid5},
						{id: 'poor', name: 'Poor', grid: optionGrid5}
					]}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Texture of the hair`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'texture_of_the_hair', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'straight', name: 'Straight', grid: optionGrid5},
						{id: 'waves', name: 'Waves', grid: optionGrid5},
						{id: 'curl', name: 'Curl', grid: optionGrid5}
					]}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Color of the hair`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'color_of_the_hair', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'black', name: 'Black', grid: optionGrid5},
						{id: 'brown', name: 'Brown', grid: optionGrid5},
						{id: 'red', name: 'Red', grid: optionGrid5},
						{id: 'blonde', name: 'Blonde', grid: optionGrid5},
						{id: 'others', name: 'Others', grid: optionGrid5}
					], onCheck: (v)=>this.setState({color_of_the_hair: v})},
					{type: 'text', name: 'color_of_the_hair_other', hint: 'Please specify', hide: this.state.color_of_the_hair != 'others', grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label:`Donor`, grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'donor', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'high', name: 'High', grid: optionGrid5},
						{id: 'normal', name: 'Normal', grid: optionGrid5},
						{id: 'low', name: 'Low', grid: optionGrid5}
					]}
				]
			},[{type: 'space'}]
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
