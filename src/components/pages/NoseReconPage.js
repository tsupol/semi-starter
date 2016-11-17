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
	optionGrid4 = {xs: '100%', sm: '50%', md: '25%'},
	optionGrid6 = {xs: '100%', sm: '50%', md: '33%'},
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
				{type: 'custom', element: <h3>Information</h3>}
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
				{type: 'custom', element: <h3>Medical histories</h3>}
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
				{type: 'custom', element: <h3>Nose condition</h3>}
			],
			...Array.from(Array(6), (v, k)=>([
				{
					type: 'custom', element: <div>Condition {k+1}</div>, grid: {md: '50%'}
				},
				{
					type: 'radio', name: `nose_conditions[${k}]`, horizontal: true, showClearButton: false, options: [
						{id: 'low', name: 'Low', grid: optionGrid6},
						{id: 'medium', name: 'Medium', grid: optionGrid6},
						{id: 'crisis', name: 'Crisis', grid: optionGrid6}
					]
				}
			])),
			[
				{type: 'custom', element: <h3>Personal condition</h3>}
			],
			...Array.from(Array(2), (v, k)=>(

				{
					separator: true,
					style: {
						paddingTop: 16,
						paddingBottom: 16
					},
					items: [
						{
							type: 'custom', element: <div>Condition {k+1}</div>, grid: {md: '50%'}
						},
						{
							type: 'radio',
							name: `personal_conditions[${k}]`,
							horizontal: true,
							showClearButton: false,
							grid: {md: '50%'},
							options: [
								{id: 'no', name: 'No', grid: optionGrid6},
								{id: 'yes', name: 'Yes', grid: optionGrid6}
							]
						}
					]
				}
			))
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
