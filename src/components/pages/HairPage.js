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
	grid1 = {xs: '100%'},

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
		this.context.ajax.call("post", "submit/hair", data, {files: ['files']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};

	render() {
		console.log('this.state', this.state);
		let thumbnail = require(this.props.locale=="th" ? '../../assets/img/upload-thumbnail.png': '../../assets/img/upload-thumbnail-en.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/hair/0${k+1}.png`), thumbnail}));
		let images2 = {men: Array.from(Array(12), (v, k)=>(require(`../../assets/img/hair/men/${('00'+(k+1)).slice(-2)}.png`))), women: Array.from(Array(3), (v, k)=>(require(`../../assets/img/hair/women/${('00'+(k+1)).slice(-2)}.png`)))};
		let values = {};
		let data = {};

		let components = [
			[
				{type: 'custom', element: <SemiHeader>Medical Record</SemiHeader>}
			],
			[
				{type: 'text', label: this.context.translate('presenting_complaint'), name: 'presenting_complaint', grid: grid2},
				{type: 'text', label: this.context.translate('past_illness'), name: 'past_illness', grid: grid2}
			],
			[
				{type: 'text', label: this.context.translate('present_illness'), name: 'present_illness', grid: grid2},
				{type: 'text', label: this.context.translate('underlying_disease'), name: 'underlying_disease', grid: grid2}
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
					{type: 'label', style: labelStyle, label: this.context.translate('allergy'), grid: labelGrid},

					// For space between topic and checkboxes when `md`
					{...rowSpace},

					{
						type: 'radio',
						name: 'allergy',
						showClearButton: false,
						horizontal: true, // must be true
						grid: cbGrid, options: [
							{id: 'no', name: this.context.translate('no'), grid: optionGrid5}, // Give responsiveness for each radio button
							{id: 'yes', name: this.context.translate('yes'), grid: optionGrid5}
						],
						onCheck: (v)=>this.setState({allergy_check: v.indexOf('yes')!=-1})},

					// hidden field can now be in the same row
					{type: 'text', name: 'allergy', hint: this.context.translate('please_specify'), hide: !this.state.allergy_check, grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('current_medication'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'current_medication', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'finasteride', name: this.context.translate('finasteride'), grid: optionGrid5},
						{id: 'minoxidil', name: this.context.translate('minoxidil'), grid: optionGrid5},
						{id: 'others', name: this.context.translate('others')}
					], onCheck: (v)=>this.setState({current_medication_others_check: v.indexOf('others')!=-1})},
					{type: 'text', name: 'current_medication', hint: this.context.translate('please_specify'), hide: !this.state.current_medication_others_check, grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('alcohol'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'alcohol', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'no', name: this.context.translate('no'), grid: optionGrid5},
						{id: 'yes', name: this.context.translate('yes'), grid: optionGrid5}
					]}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('smoking'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'smoking', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'no', name: this.context.translate('no'), grid: optionGrid5},
						{id: 'yes', name: this.context.translate('yes'), grid: optionGrid5}
					]}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('family_history_of_alopecia'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'family_history_of_alopecia', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'no', name: this.context.translate('no'), grid: optionGrid5},
						{id: 'yes', name: this.context.translate('yes'), grid: optionGrid5}
					]}
				]
			},


			// Physical Exam
			// ----------------------------------------

			[
				{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>Physical Exam</SemiHeader>}
			],
			{
				items: [
					{type: 'radio', name: 'gender', horizontal: true, showClearButton: false, options: [
						{id: 'men', name: this.context.translate('men'), grid: grid1},
						{id: 'women', name: this.context.translate('women'), grid: grid1}
					], onCheck: (v)=>this.setState({physical_exam_gender: v})}
				]
			},
			{
				style: {marginTop: 32},
				hide: this.state.physical_exam_gender != 'men',
				items: [
					{type: 'radio', name: 'physical_exam', horizontal: true, showClearButton: false, options: Array.from(Array(12), (v, k)=>({
						id: `men-${k+1}`, grid: optionGrid, name: <img style={imgStyle} src={images2.men[k]}/>
					}))}
				]
			},
			{
				style: {marginTop: 32},
				hide: this.state.physical_exam_gender != 'women',
				items: [
					{type: 'radio', name: 'physical_exam', horizontal: true, showClearButton: false, options: Array.from(Array(3), (v, k)=>({
						id: `women-${k+1}`, grid: optionGrid, name: <img style={imgStyle} src={images2.women[k]}/>
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
					{type: 'label', style: labelStyle, label: this.context.translate('scalp'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'scalp', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'erythena', name: this.context.translate('erythena'), grid: optionGrid5},
						{id: 'scarring', name: this.context.translate('scarring'), grid: optionGrid5},
						{id: 'scaling', name: this.context.translate('scaling'), grid: optionGrid5},
						{id: 'others', name: this.context.translate('others'), grid: optionGrid5}
					], onCheck: (v)=>this.setState({scalp: v})},
					{type: 'text', name: 'scalp', hint: this.context.translate('please_specify'), hide: this.state.scalp != 'others', grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('quality_of_donor_hair'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'quality_of_donor_hair', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'fine', name: this.context.translate('fine'), grid: optionGrid5},
						{id: 'medium', name: this.context.translate('medium'), grid: optionGrid5},
						{id: 'coarse', name: this.context.translate('coarse'), grid: optionGrid5}
					]}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('elasticity'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'elasticity', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'good', name: this.context.translate('good'), grid: optionGrid5},
						{id: 'moderate', name: this.context.translate('moderate'), grid: optionGrid5},
						{id: 'poor', name: this.context.translate('poor'), grid: optionGrid5}
					]}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('texture_of_the_hair'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'texture_of_the_hair', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'straight', name: this.context.translate('straight'), grid: optionGrid5},
						{id: 'waves', name: this.context.translate('waves'), grid: optionGrid5},
						{id: 'curl', name: this.context.translate('curl'), grid: optionGrid5}
					]}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('color_of_the_hair'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'color_of_the_hair', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'black', name: this.context.translate('black'), grid: optionGrid5},
						{id: 'brown', name: this.context.translate('brown'), grid: optionGrid5},
						{id: 'red', name: this.context.translate('red'), grid: optionGrid5},
						{id: 'blonde', name: this.context.translate('blonde'), grid: optionGrid5},
						{id: 'others', name: this.context.translate('others'), grid: optionGrid5}
					], onCheck: (v)=>this.setState({color_of_the_hair: v})},
					{type: 'text', name: 'color_of_the_hair', hint: this.context.translate('please_specify'), hide: this.state.color_of_the_hair != 'others', grid: hiddenTextGrid}
				]
			},
			{
				...cbRowParam,
				items: [
					{type: 'label', style: labelStyle, label: this.context.translate('donor'), grid: labelGrid},
					{...rowSpace},
					{type: 'radio', name: 'donor', showClearButton: false, horizontal: true, grid: cbGrid, options: [
						{id: 'high', name: this.context.translate('high'), grid: optionGrid5},
						{id: 'normal', name: this.context.translate('normal'), grid: optionGrid5},
						{id: 'low', name: this.context.translate('low'), grid: optionGrid5}
					]}
				]
			},[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header={this.context.translate('menu:hair')} images={images} values={values} data={data} onSubmit={this.submit}>
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
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default HairPage;
