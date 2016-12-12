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
		//let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let images = [];
		images.push({example: require('../../assets/img/lips/IMG_8034.jpg')});
		images.push({example: require('../../assets/img/lips/PIC_09029.jpg')});
		images.push({example: require('../../assets/img/lips/PIC_09031.jpg')});
		images.push({example: require('../../assets/img/lips/PIC_09032.jpg')});
		images.push({example: require('../../assets/img/lips/PIC_09039.jpg')});
		images.push({example: require('../../assets/img/lips/PIC_09063.jpg')});
		images = images.map((img)=>Object.assign({}, img, {thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('basic_information')}</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'ever_did_surgery_before_check', horizontal: true, showClearButton: false, options: [
						{id: 'no', name: this.context.translate('surgery_history:no', {surgery: this.context.translate('menu:lips')}), grid: optionGrid2},
						{id: 'yes', name: this.context.translate('surgery_history:yes', {surgery: this.context.translate('menu:lips')}), grid: optionGrid2}
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
						type: 'numeric', name: 'surgery_count_before', label: this.context.translate('how_many_time'), onChange: (v)=> this.setState({surgery_count_before: v!='' ? parseInt(v) : 0})
					}
				]
			},
			...Array.from(Array(this.state.surgery_count_before), (v, k)=>(
			{
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{
						type: 'label', label: `${k+1}`, grid: {md: '30px'}
					},
					{
						type: 'text', name: `surgeries_before[${k}][how]`, multiLine: true, label: this.context.translate('surgeries_before:how'), grid: {md: 'calc((100% / 3) - (30px / 3))'}
					},
					{
						type: 'text', name: `surgeries_before[${k}][place]`, multiLine: true, label: this.context.translate('place'), grid: {md: 'calc((100% / 3) - (30px / 3))'}
					},
					{
						type: 'text', name: `surgeries_before[${k}][duration]`, multiLine: true, label: this.context.translate('duration'), grid: {md: 'calc((100% / 3) - (30px / 3))'}
					}
				]
			}
			)),
			{
				hide: !this.state.ever_did_surgery_before_check,
				style: {
					paddingTop: 16,
					paddingBottom: 16
				},
				items: [
					{type: 'label', style: {paddingTop: 3, fontWeight: 'normal'}, label: this.context.translate('know_the_detail'), grid: {
						xs: '100%', md: '50%'
					}},
					{
						type: 'radio', name: 'filler_before_know_details', horizontal: true, showClearButton: false, options: [
							{id: 'yes', name: this.context.translate('yes'), grid: optionGrid2},
							{id: 'no', name: this.context.translate('no'), grid: optionGrid2}
						], onCheck: (v)=> this.setState({filler_before_know_details: v})
					}
				]
			},
			{
				hide: this.state.filler_before_know_details != 'yes',
				items: [
					{
						type: 'text', name: 'brand', multiLine: true, label: this.context.translate('brand')
					},
					{
						type: 'text', name: 'filler_count', multiLine: true, label: this.context.translate('how_many_time:filler')
					}
				]
			},
			{
				hide: this.state.filler_before_know_details != 'yes',
				items: [
					{
						type: 'text', name: 'last_time', multiLine: true, label: this.context.translate('last_time')
					},
					{
						type: 'text', name: 'volume', multiLine: true, label: this.context.translate('volume')
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: this.context.translate('place_or_doctor')
					}
				]
			},
			{
				hide: this.state.filler_before_know_details != 'no',
				items: [
					{
						type: 'text', name: 'filler_count', multiLine: true, label: this.context.translate('how_many_time:filler')
					}
				]
			},
			{
				hide: this.state.filler_before_know_details != 'no',
				items: [
					{
						type: 'text', name: 'last_time', multiLine: true, label: this.context.translate('last_time')
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: this.context.translate('place_or_doctor')
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
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>ข้อควรทราบก่อนการผ่าตัด</SemiHeader>}
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
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default LipsPage;
