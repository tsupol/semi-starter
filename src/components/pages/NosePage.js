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

class NosePage extends Component {
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
		this.context.ajax.call("post", "submit/nose", data, {files: ['files']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};


	render() {
		let thumbnail = require('../../assets/img/upload-thumbnail.png');
		let example = require('../../assets/img/upload-example.png');
		//let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let images = [];
		images.push({example: require('../../assets/img/nose/IMG_8034.jpg')});
		images.push({example: require('../../assets/img/nose/IMG_8035.jpg')});
		images.push({example: require('../../assets/img/nose/IMG_8036.jpg')});
		images.push({example: require('../../assets/img/nose/IMG_8038.jpg')});
		images.push({example: require('../../assets/img/nose/IMG_8044.jpg')});
		images.push({example: require('../../assets/img/nose/IMG_8046.jpg')});
		images = images.map((img)=>Object.assign({}, img, {thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('basic_information')}</SemiHeader>}
			],
			[
				{
					type: 'radio', name: 'nose_surgery_history', horizontal: true, showClearButton: false, options: [
						{id: 'no', name: this.context.translate('surgery_history:no', {surgery: this.context.translate('menu:nose')}), grid: optionGrid2},
						{id: 'yes', name: this.context.translate('surgery_history:yes', {surgery: this.context.translate('menu:nose')}), grid: optionGrid2}
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
			],[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Nose" images={images} values={values} data={data} onSubmit={this.submit}>
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
NosePage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default NosePage;
