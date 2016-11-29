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
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('basic_information')}</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'nose_surgery_history', horizontal: true, showClearButton: false, options: [
					{id: 'no', name: this.context.translate('surgery_history:no', {surgery: this.context.translate('menu:nose-recon')}), grid: optionGrid2},
					{id: 'yes', name: this.context.translate('surgery_history:yes', {surgery: this.context.translate('menu:nose-recon')}), grid: optionGrid2}
				]
				}
			],
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('nose:histories')}</SemiHeader>}
			],
			[
				{
					type: 'checkbox', name: 'medical_histories', horizontal: true, showClearButton: false, options: [
						{id: 'allergy', name: this.context.translate('allergy'), grid: optionGrid4},
						{id: 'nasal_congestion', name: this.context.translate('nasal_congestion'), grid: optionGrid4},
						{id: 'sinusitis', name: this.context.translate('sinusitis'), grid: optionGrid4},
						{id: 'accident', name: this.context.translate('accident'), grid: optionGrid4}
					]
				}
			],
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('nose:conditions')}</SemiHeader>}
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
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('personal:conditions')}</SemiHeader>}
			],
			{
				...cbRowParam,
				items: [
					{
						type: 'label', label: 'ท่านมีโรคประจำตัว หรือเคยผ่าตัดโยการดมยาสลบ', style: labelStyle, grid: labelGrid
					},
					{...rowSpace},
					{
						type: 'radio',
						name: `personal_conditions[0]`,
						horizontal: true,
						showClearButton: false,
						grid: radioGrid,
						options: [
							{id: 'no', name: this.context.translate('no'), grid: rightGrid3},
							{id: 'yes', name: this.context.translate('yes'), grid: rightGrid3}
						]
					}
				]
			},
			{
				...cbRowParam,
				items: [
					{
						type: 'label', label: 'ท่านเคมีแผลเป็นนูน ผื่นแพ้สัมผัส ผื่นเริ่ม/งูสวัส', style: labelStyle, grid: labelGrid
					},
					{...rowSpace},
					{
						type: 'radio',
						name: `personal_conditions[1]`,
						horizontal: true,
						showClearButton: false,
						grid: radioGrid,
						options: [
							{id: 'no', name: this.context.translate('no'), grid: rightGrid3},
							{id: 'yes', name: this.context.translate('yes'), grid: rightGrid3}
						]
					}
				]
			},[{type: 'space'}]
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
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default NoseReconPage;
