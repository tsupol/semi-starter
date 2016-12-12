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

class ChinPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			ever_did_surgery_before_check: false
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
		this.context.ajax.call("post", "submit/chin", data, {files: ['files']}).then((data)=>{
			this.context.dialog.alert("E-Mail was sent", "Success", "success");
		});
	};


	render() {
		let thumbnail = require('../../assets/img/upload-thumbnail.png');
		let example = require('../../assets/img/upload-example.png');
		//let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let images = [];
		images.push({example: require('../../assets/img/chin/PIC_09025.jpg')});
		images.push({example: require('../../assets/img/chin/PIC_09028.jpg')});
		images.push({example: require('../../assets/img/chin/PIC_09038.jpg')});
		images.push({example: require('../../assets/img/chin/PIC_09044.jpg')});
		images.push({example: require('../../assets/img/chin/PIC_09054.jpg')});
		images.push({example: require('../../assets/img/chin/PIC_09064.jpg')});
		images = images.map((img)=>Object.assign({}, img, {thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('basic_information')}</SemiHeader>}
			],
			{
				items: [
					{
						type: 'radio', name: 'chin_surgery_history', horizontal: true, showClearButton: false, options: [
						{id: 'no', name: this.context.translate('surgery_history:no', {surgery: this.context.translate('menu:chin')}), grid: optionGrid2},
						{id: 'yes', name: this.context.translate('surgery_history:yes', {surgery: this.context.translate('menu:chin')}), grid: optionGrid2}
						], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v == 'yes'})
					}
				]
			},
			{
				hide: !this.state.ever_did_surgery_before_check,
				items: [
					{
						type: 'numeric', name: 'surgery_count_before', label: this.context.translate('how_many_time'), grid: grid1
					},
					{
						type: 'text', name: 'surgery_type', label: this.context.translate('surgeries_before:how'), multiLine: true, grid: grid1
					},
					{
						type: 'text', name: 'place_or_doctor', label: this.context.translate('place_or_doctor'), grid: grid2
					},
					{
						type: 'text', name: 'duration', label: this.context.translate('duration'), grid: grid2
					}
				]
			},[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Chin" images={images} values={values} data={data} onSubmit={this.submit}>
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
ChinPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default ChinPage;
