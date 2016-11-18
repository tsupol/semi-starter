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
	optionGrid4 = {xs: '100%', sm: '50%', md: '25%'},
	optionGrid6 = {xs: '100%', sm: '50%', md: '33%'},

	// 50/50 proportion (Nose/Personal Condition)
	labelGrid = {xs: '100%', md: '50%'},
	radioGrid = {xs: '100%', md: '50%'},
	rightGrid3 = {xs: '100%', sm: '33.33%', md: '25%'},

	hiddenTextGrid = {xs: '100%', md: '69%', mdOffset: '31%'},
	hiddenTextStyle = {paddingTop: 16, paddingBottom: 0},
	labelStyle = {paddingTop: 3, fontWeight: 'normal'},

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

class NoseReconPage extends Component {
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
		this.context.ajax.call("post", "submit/nose-recon", data, {files: ['files']}).then((data)=>{
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
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>Information</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'nose_surgery_history', horizontal: true, showClearButton: false, options: [
						{id: 'no', name: 'No, Never have nose surgery.', grid: optionGrid4},
						{id: 'yes', name: 'Yes, Ever did before.', grid: optionGrid4}
					]
				}
			],
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>Medical histories</SemiHeader>}
			],
			[
				{
					type: 'checkbox', name: 'medical_histories', horizontal: true, showClearButton: false, options: [
						{id: 'allergy', name: 'Allergy', grid: optionGrid4},
						{id: 'nasal_congestion', name: 'Nasal congestion', grid: optionGrid4},
						{id: 'sinusitis', name: 'Sinusitis', grid: optionGrid4},
						{id: 'accident', name: 'Accident', grid: optionGrid4}
					]
				}
			],
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>Nose condition</SemiHeader>}
			],
			...Array.from(Array(6), (v, k)=>({
				...cbRowParam,
				items: [
					{
						type: 'label', label: `Condition ${k+1}`, style: labelStyle, grid: labelGrid
					},
					{...rowSpace},
					{
						type: 'radio', name: `nose_conditions[${k}]`, horizontal: true, showClearButton:false, grid:radioGrid, options: [
						{id: 'low', name: 'Low', grid: rightGrid3},
						{id: 'medium', name: 'Medium', grid: rightGrid3},
						{id: 'crisis', name: 'Crisis', grid: rightGrid3}
					]
					}
				]
			})),
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>Personal condition</SemiHeader>}
			],
			...Array.from(Array(2), (v, k)=>(
				{
					...cbRowParam,
					items: [
						{
							type: 'label', label: `Condition ${k+1}`, style: labelStyle, grid: labelGrid
						},
						{...rowSpace},
						{
							type: 'radio',
							name: `personal_conditions[${k}]`,
							horizontal: true,
							showClearButton: false,
							grid: radioGrid,
							options: [
								{id: 'no', name: 'No', grid: rightGrid3},
								{id: 'yes', name: 'Yes', grid: rightGrid3}
							]
						}
					]
				}
			)),[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Nose (Recon)" images={images} values={values} data={data} onSubmit={this.submit}>
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
NoseReconPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default NoseReconPage;
