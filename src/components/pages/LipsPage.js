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
		this.context.ajax.call("post", "submit/lips", data, {files: ['files']}).then((data)=>{
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
					type: 'radio', name: 'ever_did_surgery_before_check', horizontal: true, showClearButton: false, options: [
						{id: 'no', name: 'No, Never have lips surgery.', grid: optionGrid4},
						{id: 'yes', name: 'Yes, Ever did before.', grid: optionGrid4}
					], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes', surgery_count_before: 0, filler_before_know_details: ''})
				}
			],
			{
				hide: !this.state.ever_did_surgery_before_check,
				style: {
					paddingTop: 16,
					paddingBottom: 16
				},
				items: [
					{
						type: 'numeric', name: 'surgery_count_before', label: 'How many time', onChange: (v)=> this.setState({surgery_count_before: v!='' ? parseInt(v) : 0})
					}
				]
			},
			...Array.from(Array(this.state.surgery_count_before), (v, k)=>(
			{
				hide: !this.state.ever_did_surgery_before_check,
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
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{type: 'label', style: {paddingTop: 3, fontWeight: 'normal'}, label: 'Know the detail', grid: {
						xs: '100%', md: '50%'
					}},
					{
						type: 'radio', name: 'filler_before_know_details', horizontal: true, showClearButton: false, options: [
							{id: 'yes', name: 'Yes', grid: optionGrid4},
							{id: 'no', name: 'No', grid: optionGrid4}
						], onCheck: (v)=> this.setState({filler_before_know_details: v})
					}
				]
			},
			{
				hide: this.state.filler_before_know_details != 'yes',
				items: [
					{
						type: 'text', name: 'filler_brand', multiLine: true, label: 'Filler (brand)'
					},
					{
						type: 'text', name: 'filler_count', multiLine: true, label: 'How many times'
					}
				]
			},
			{
				hide: this.state.filler_before_know_details != 'yes',
				items: [
					{
						type: 'text', name: 'filler_last_time', multiLine: true, label: 'Last time'
					},
					{
						type: 'text', name: 'filler_volume', multiLine: true, label: 'Filler volume'
					},
					{
						type: 'text', name: 'filler_place_or_doctor', multiLine: true, label: 'Place / Doctor'
					}
				]
			},
			{
				hide: this.state.filler_before_know_details != 'no',
				items: [
					{
						type: 'text', name: 'filler_count', multiLine: true, label: 'How many times'
					}
				]
			},
			{
				hide: this.state.filler_before_know_details != 'no',
				items: [
					{
						type: 'text', name: 'filler_last_time', multiLine: true, label: 'Last time'
					},
					{
						type: 'text', name: 'filler_place_or_doctor', multiLine: true, label: 'Place / Doctor'
					}
				]
			},
			{
				hide: !this.state.ever_did_surgery_before_check,
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
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default LipsPage;
