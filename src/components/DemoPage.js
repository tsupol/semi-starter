import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';

class DemoPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			interested_in_liposuction: false,
			interested_in_other: false
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

	handleFormChange = (data)=> {

	};

	submit = (data)=> {
		this.context.ajax.call("post", "submit", data, {files: ['files.face', 'files.body', 'files.normal', 'files.non-exists', 'files2']});
	};

	render() {
		let thumbnail = require('../assets/img/upload-thumbnail.png');
		let example = require('../assets/img/upload-example.png');
		let images = {
			face: [
				require('../assets/img/face1.jpg'),
				require('../assets/img/face2.jpg'),
				require('../assets/img/face3.jpg'),
				require('../assets/img/face4.jpg'),
				require('../assets/img/face5.jpg'),
				require('../assets/img/face6.jpg')
			]
		};
		let formTemplate = {
			values: {
				first_name: '',
				last_name: '',
				nick_name: '',
				facebook: '',
				instagram: '',
				email: '',
				youtube: '',
				website: '',
				lineID: '',
				whatappID: '',
				phone: '',
				mobile: '',
				job: '',
				interested_in: [],
				interested_in_liposuction_check: [],
				interested_in_other_check: [],
				interested_in_liposuction: '',
				interested_in_other: '',
				medical_histories: [],
				congenital_disease: '',
				current_drug: '',
				drug_symptom: '',
				files: []
			},
			components: [
				[
					{type: 'custom', element: <h3>Personal Information</h3>}
				],
				[
					{
						type: 'text', name: 'first_name', label: 'First Name'
					},
					{
						type: 'text', name: 'last_name', label: 'Last Name'
					},
					{
						type: 'text', name: 'nick_name', label: 'Nick Name'
					}
				],
				[
					{
						type: 'text', name: 'job', label: 'Job', grid: {
							md: '50%'
						}
					}
				],
				{
					settings: {
						hide: false
					},
					items: [
						{
							type: 'checkbox', name: 'interested_in_other_check', multiple: true, showClearButton: false, options: [
								{id: 'other', name: 'Align Center'}
							],
							grid: {md: '20%'},
							align: 'center'
						}
					]
				}
			]
		};
		return (
			<div>
				<PageHeading title="Demo Page" description="Note: I will make changes here...." />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel>
								<div className="con-pad">
									<SemiForm
										formTemplate={formTemplate}
										onChange={this.handleFormChange}
										onSubmit={this.submit}
										buttonAlign="center"
										submitLabel="Register"
									/>
								</div>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
		);
	}
}

DemoPage.contextTypes = {
	ajax: PropTypes.object
};
export default DemoPage;
