import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {FormGenerator} from 'react-semi-theme/forms';
import MainForm from '../main/MainForm';
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
		let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <h3>Information</h3>}
			],
			[
				{
					type: 'radio', name: 'chin_surgery_history', showClearButton: false, options: [
					{id: 'no', name: 'No, Never have chin surgery.'},
					{id: 'yes', name: 'Yes, Ever did before.'}
				], onCheck: (v)=> this.setState({ever_did_surgery_before_check: v=='yes'})
				}
			],
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'numeric', name: 'surgery_count_before', label: 'How many time'
					}
				]
			},
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'text', name: 'surgery_type', label: 'Type', multiLine: true
					}
				]
			},
			{
				settings: {
					hide: !this.state.ever_did_surgery_before_check
				},
				items: [
					{
						type: 'text', name: 'place_or_doctor', label: 'Place / Doctor'
					},
					{
						type: 'text', name: 'duration', label: 'Duration'
					}
				]
			}
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
	dialog: PropTypes.object
};
export default ChinPage;
