import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';

const
	marginBottomStyle = {marginBottom: 24},
	grid3 = {xs: '100%', md: '33.33%'},
	grid2 = {xs: '100%', md: '50%'},
	grid1 = {xs: '100%'},
	imgOptionGrid = {xs: '100%', sm: '50%', md: '20%'},
	imgStyle = {width: '100%'},
	optionGrid4 = {xs: '100%', sm: '50%', md: '25%'},
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

class CheekBulgePage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ever_did_surgery_before_check: false,
			before_know_details: ''
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
		this.context.ajax.call("post", "submit/cheekbulge", data, {files: ['files']}).then((data)=>{
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
			{
				items: [
					{
						type: 'radio', name: 'surgery_history', horizontal: true, showClearButton: false, options: [
							{id: 'no', name: 'No, Never have surgery.', grid: optionGrid4},
							{id: 'yes', name: 'Yes, Ever did before.', grid: optionGrid4}
						], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes', before_know_details: ''})
					}
				]
			},
			{
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{type: 'custom', element: <div>Know the detail?</div>, style: {
						marginTop: 16, marginBottom: 16,
					}}
				]
			},
			{
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{
						type: 'radio', name: 'before_know_details', horizontal: true, showClearButton: false, options: [
							{id: 'yes', name: 'Yes', grid: optionGrid4},
							{id: 'no', name: 'No', grid: optionGrid4}
						], onCheck: (v)=> this.setState({before_know_details: v})
					}
				]
			},
			{
				hide: this.state.before_know_details != 'yes',
				items: [
					{
						type: 'text', name: 'brand', multiLine: true, label: 'Brand', grid: grid2
					},
					{
						type: 'text', name: 'count', multiLine: true, label: 'How many times', grid: grid2
					},
					{
						type: 'text', name: 'last_time', multiLine: true, label: 'Last time', grid: grid3
					},
					{
						type: 'text', name: 'volume', multiLine: true, label: 'Volume', grid: grid3
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: 'Place / Doctor', grid: grid3
					}
				]
			},
			{
				hide: this.state.before_know_details != 'no',
				items: [
					{
						type: 'text', name: 'count', multiLine: true, label: 'How many times', grid: grid2
					},
					{
						type: 'text', name: 'last_time', multiLine: true, label: 'Last time', grid: grid2
					},
					{
						type: 'text', name: 'volume', multiLine: true, label: 'Volume', grid: grid2
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: 'Place / Doctor', grid: grid2
					}
				]
			},[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header="CheekBulge" images={images} values={values} data={data} onSubmit={this.submit}>
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
CheekBulgePage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default CheekBulgePage;
