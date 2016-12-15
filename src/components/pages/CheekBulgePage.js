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
		this.context.ajax.call("post", "submit/cheekbulge", data, {files: ['files'], remove_fields: ['ever_did_surgery_before_check']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};


	render() {
		let thumbnail = require(this.props.locale=="th" ? '../../assets/img/upload-thumbnail.png': '../../assets/img/upload-thumbnail-en.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/cheek-bulge/0${k+1}.png`), thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('basic_information')}</SemiHeader>}
			],
			{
				items: [
					{
						type: 'radio', name: 'ever_did_surgery_before_check', horizontal: true, showClearButton: false, options: [
						{id: 'no', name: this.context.translate('surgery_history:no', {surgery: this.context.translate('menu:cheek-bulge')}), grid: optionGrid2},
						{id: 'yes', name: this.context.translate('surgery_history:yes', {surgery: this.context.translate('menu:cheek-bulge')}), grid: optionGrid2}
						], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes', before_know_details: ''})
					}
				]
			},
			{
				hide: !this.state.ever_did_surgery_before_check,
				style: {
					paddingTop: 16,
					paddingBottom: 16
				},
				items: [
					{
						type: 'text', name: 'brand', multiLine: true, label: this.context.translate('brand'), grid: grid2
					},
					{
						type: 'numeric', name: 'how_many_time', multiLine: true, label: this.context.translate('how_many_time'), grid: grid2
					},
					{
						type: 'text', name: 'last_time', multiLine: true, label: this.context.translate('last_time'), grid: grid3
					},
					{
						type: 'text', name: 'volume', multiLine: true, label: this.context.translate('volume'), grid: grid3
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: this.context.translate('place_or_doctor'), grid: grid3
					}
				]
			}/*,
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
						type: 'radio', name: 'before_know_details', horizontal: true, showClearButton: false, options: [
						{id: 'yes', name: this.context.translate('yes'), grid: optionGrid2},
						{id: 'no', name: this.context.translate('no'), grid: optionGrid2}
					], onCheck: (v)=> this.setState({before_know_details: v})
					}
				]
			},
			{
				hide: this.state.before_know_details != 'yes',
				items: [
					{
						type: 'text', name: 'brand', multiLine: true, label: this.context.translate('brand'), grid: grid2
					},
					{
						type: 'text', name: 'count', multiLine: true, label: this.context.translate('how_many_time'), grid: grid2
					},
					{
						type: 'text', name: 'last_time', multiLine: true, label: this.context.translate('last_time'), grid: grid3
					},
					{
						type: 'text', name: 'volume', multiLine: true, label: this.context.translate('volume'), grid: grid3
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: this.context.translate('place_or_doctor'), grid: grid3
					}
				]
			},
			{
				hide: this.state.before_know_details != 'no',
				items: [
					{
						type: 'text', name: 'count', multiLine: true, label: this.context.translate('how_many_time'), grid: grid2
					},
					{
						type: 'text', name: 'last_time', multiLine: true, label: this.context.translate('last_time'), grid: grid2
					},
					{
						type: 'text', name: 'volume', multiLine: true, label: this.context.translate('volume'), grid: grid2
					},
					{
						type: 'text', name: 'place_or_doctor', multiLine: true, label: this.context.translate('place_or_doctor'), grid: grid2
					}
				]
			}*/,[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header={this.context.translate('menu:cheek-bulge')} images={images} values={values} data={data} onSubmit={this.submit}>
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
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default CheekBulgePage;
