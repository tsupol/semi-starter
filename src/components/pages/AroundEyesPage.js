import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';
import $ from 'jquery';

const
	marginBottomStyle = {marginBottom: 24},
	imgOptionGrid = {xs: '100%', sm: '50%', md: '20%'},
	imgStyle = {width: '100%'},
	optionGrid2 = {xs: '100%', sm: '50%'},
	optionGrid3 = {xs: '100%', sm: '50%', md: '33%'},
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

class AroundEyesPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ever_did_surgery_before_check: false,
			surgery_count_before: 0,
			eye_tattoo_other: false,
			vision_issue_short_check: false,
			vision_issue_long_check: false,
			vision_issue_astigmatism_check: false,
			style_expectation_other: false
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
		/*
		for(let i in  data){
			if(typeof data[i] == "string"){
				console.log(this.context.translate(i), this.context.translate(data[i]));
			}else{
				console.log(this.context.translate(i),":");
				for(let j in data[i]){
					if(typeof data[i][j] == "string"){
						console.log(this.context.translate(j), this.context.translate(data[i][j]));
					}else{
						console.log(this.context.translate(i),this.context.translate(j),":");
						for(let k in data[i][j]){
							console.log(this.context.translate(k), this.context.translate(data[i][j][k]));
						}
					}
				}
			}
		}
		*/
		this.context.ajax.call("post", "submit/eye", data, {files: ['files'], remove_fields: ['ever_did_surgery_before_check']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};


	render() {
		let thumbnail = require(this.props.locale=="th" ? '../../assets/img/upload-thumbnail.png': '../../assets/img/upload-thumbnail-en.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/eyelids/0${k+1}.png`), thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('basic_information')}</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'ever_did_surgery_before_check', horizontal: true, showClearButton: false, options: [
						{id: 'no', name: this.context.translate('surgery_history:no', {surgery: this.context.translate('menu:around-eyes')}), grid: optionGrid2},
						{id: 'yes', name: this.context.translate('surgery_history:yes', {surgery: this.context.translate('menu:around-eyes')}), grid: optionGrid2}
					], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes', surgery_count_before: 0})
				}
			],
			{
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{
						type: 'numeric', name: 'surgery_count_before', label: this.context.translate('how_many_time'), onChange: (v)=> this.setState({surgery_count_before: v!='' ? parseInt(v) : 0})
					}
				]
			},
			...Array.from(Array(this.state.surgery_count_before), (v, k)=>(
			{
				hide: !this.state.ever_did_surgery_before_check,
				items:
					[
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
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('which_surgical_you_looking_for')}</SemiHeader>}
			],
			{
				items: [
					{
						type: 'radio', name: 'which_surgical_you_looking_for', horizontal: true, showClearButton: false, options: [
							{id: 'upper_eyelids_surgery', name: this.context.translate('upper_eyelids_surgery'), grid: optionGrid3},
							{id: 'undereye_bag_surgery', name: this.context.translate('undereye_bag_surgery'), grid: optionGrid3},
							{id: 'ptosis', name: this.context.translate('ptosis'), grid: optionGrid3},
							{id: 'undereye_bag_surgery:small_incision', name: this.context.translate('undereye_bag_surgery:small_incision'), grid: optionGrid3},
							{id: 'upper_eyelids_surgery:small_incision', name: this.context.translate('upper_eyelids_surgery:small_incision'), grid: optionGrid3}
						]
					}
				]
			},[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header={this.context.translate('menu:around-eyes')} images={images} values={values} data={data} onSubmit={this.submit}>
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
AroundEyesPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default AroundEyesPage;
