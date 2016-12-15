import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel, SemiHeader} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';

const
	marginBottomStyle = {marginBottom: 24},
	grid2 = {xs: '100%', md: '50%'},
	grid1 = {xs: '100%'},
	imgStyle = {width: '100%'},
	optionGrid2 = {xs: '100%', sm: '50%'},
	optionGrid4 = {xs: '100%', sm: '50%', md: '25%'},
	hiddenTextStyle = {paddingTop: 16, paddingBottom: 0},
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

class BeastPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ever_did_surgery_before_check: false,
			any_children_check: false,
			activities: ''
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
		this.context.ajax.call("post", "submit/breast", data, {files: ['files'], remove_fields: ['ever_did_surgery_before_check']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};


	render() {
		let thumbnail = require(this.props.locale=="th" ? '../../assets/img/upload-thumbnail.png': '../../assets/img/upload-thumbnail-en.png');
		let example = require('../../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example: require(`../../assets/img/breast/0${k+1}.png`), thumbnail}));
		let values = {};
		let data = {};
		let components = [

			// Information Section 1
			// ----------------------------------------

			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('basic_information')}</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'ever_did_surgery_before_check', horizontal: true, showClearButton: false, options: [
					{id: 'no', name: this.context.translate('surgery_history:no', {surgery: this.context.translate('menu:breast')}), grid: optionGrid2},
					{id: 'yes', name: this.context.translate('surgery_history:yes', {surgery: this.context.translate('menu:breast')}), grid: optionGrid2}
				], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes'})
				}
			],
			{
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{type: 'numeric', name: 'surgery_count_before', label: this.context.translate('how_many_time:surgery'), grid: grid1},
					{type: 'text', name: 'which_type', label: this.context.translate('which_type'), multiLine: true, grid: grid1},
					{type: 'text', name: 'size', label: this.context.translate('size'), grid: grid2},
					{type: 'text', name: 'brand', label: this.context.translate('brand'), grid: grid2},
					{type: 'text', name: 'place_or_doctor', label: this.context.translate('place_or_doctor'), grid: grid2},
					{type: 'text', name: 'duration', label: this.context.translate('duration'), grid: grid2}
				]
			}/*,

			// Information Section 2
			// ----------------------------------------

			[
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>Activities</SemiHeader>}
			],
			[
				{type: 'checkbox', name: 'activities', showClearButton: false, horizontal: true, options: [
					{id: 'fitness_or_yoga', name: 'Fitness / Yoga', grid: optionGrid4},
					{id: 'swimming', name: 'Swimming', grid: optionGrid4},
					{id: 'running', name: 'Running', grid: optionGrid4},
					{id: 'others', name: 'Others', grid: optionGrid4}
				], onCheck: (activities)=>this.setState({activities})}
			],
			{
				hide: this.state.activities.indexOf('others')==-1,
				items: [
					{
						type: 'text', name: 'other_activity', hint: 'Please specify', style: hiddenTextStyle
					}
				]
			},
			[
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>Occupation</SemiHeader>}
			],
			[
				{type: 'checkbox', name: 'occupation', showClearButton: false, horizontal: true, options: [
					{id: 'pretty_model', name: 'Pretty / Model', grid: optionGrid4},
					{id: 'officer', name: 'Officer', grid: optionGrid4},
					{id: 'student', name: 'Student', grid: optionGrid4},
					{id: 'business_owner', name: 'Business Owner', grid: optionGrid4}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>Type Implant</SemiHeader>}
			],
			[
				{type: 'checkbox', name: 'type_implant', showClearButton: false, horizontal: true, options: [
					{id: 'round', name: 'Round', grid: optionGrid4},
					{id: 'teardrop', name: 'Teardrop', grid: optionGrid4}
				]}
			],

			// Children
			// ----------------------------------------

			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>Do you have any children</SemiHeader>}
			],
			{
				items: [
					{
						type: 'radio', name: 'any_children', horizontal: true, showClearButton: false, options: [
							{id: 'no', name: 'No, I don\'t.', grid: optionGrid4},
							{id: 'yes', name: 'Yes, I have.', grid: optionGrid4}
						], onCheck: (v)=> this.setState({any_children_check: v == 'yes'})
					}
				]
			},
			{
				hide: !this.state.any_children_check,
				items: [
					{
						type: 'numeric', name: 'child_age', label: 'Age of last child', grid: grid2
					},
					{
						type: 'numeric', name: 'child_count', label: 'Number of child', grid: grid2
					}
				]
			}*/,[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header={this.context.translate('menu:breast')} images={images} values={values} data={data} onSubmit={this.submit}>
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
BeastPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default BeastPage;
