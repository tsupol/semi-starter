import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import commonForm from '../settings/commonForm';

class ForeheadPage extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
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
		this.context.ajax.call("post", "submit", data, {files: ['files']});
	};

	render() {
		let thumbnail = require('../assets/img/upload-thumbnail.png');
		let example = require('../assets/img/upload-example.png');
		let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let components = [
			[
				{type: 'custom', element: <h3>Header 1</h3>}
			],
			[
				{type: 'custom', element: <label>Type</label>, grid: {md: '30%'}},
				{type: 'radio', name: 'forehead_type', showClearButton: false, options: Array.from(Array(7), (v, k)=>({id: k+1, name: <img style={{width: '200px'}} src={example}/>}))}
			],
			[
				{type: 'custom', element: <h3>Header 2</h3>}
			],
			[
				{type: 'custom', element: <div>&nbsp;</div>},
				{type: 'custom', element: <label>Area</label>},
				{type: 'custom', element: <label>Detail</label>},
				{type: 'custom', element: <label>Date</label>},
				{type: 'custom', element: <label>Rating</label>}
			],
			...Array.from(Array(4), (v, k)=>([
				{
					type: 'custom', element: <div  style={{height: '36px', textAlign: 'right'}}><label style={{position: 'relative', top: '50%'}}>{k+1}</label></div>
				},
				{
					type: 'text', name: `histories[${k}][area]`
				},
				{
					type: 'text', name: `histories[${k}][detail]`
				},
				{
					type: 'text', name: `histories[${k}][date]`
				},
				{
					type: 'text', name: `histories[${k}][rating]`
				}
			])),
			[
				{type: 'custom', element: <div  style={{height: '72px'}}></div>}
			],
			[
				{
					type: 'custom', element: <label>Rating of current area</label>, grid: {md: '30%'}
				},
				{
					type: 'radio', name: 'rating', options: [
						{id: 5, name: 'Best'},
						{id: 4, name: 'Good'},
						{id: 3, name: 'General'},
						{id: 2, name: 'Low'},
						{id: 1, name: 'Bad'}
					]
				}
			],
			[
				{type: 'custom', element: <div  style={{height: '36px'}}></div>}
			],
			[
				{
					type: 'custom', element: <label>Requesting area &amp; Expectation</label>
				}
			],
			...Array.from(Array(5), (v, k)=>([
				{
					type: 'custom', element: <div  style={{height: '36px', textAlign: 'right'}}><label style={{position: 'relative', top: '50%'}}>{k+1}</label></div>, grid: {md: '30%'}
				},
				{
					type: 'text', name: `area_and_expect[${k}]`, multiLine: true, grid: {md: '70%'}
				}
			])),
			[
				{type: 'custom', element: <div  style={{height: '36px'}}></div>}
			],
			[
				{
					type: 'custom', element: <label>Requesting reason</label>
				}
			],
			...Array.from(Array(5), (v, k)=>([
				{
					type: 'custom', element: <div  style={{height: '36px', textAlign: 'right'}}><label style={{position: 'relative', top: '50%'}}>{k+1}</label></div>, grid: {md: '30%'}
				},
				{
					type: 'text', name: `requesting_reasons[${k}]`, multiLine: true, grid: {md: '70%'}
				}
			])),
			[
				{type: 'custom', element: <div  style={{height: '36px'}}></div>}
			],
			[
				{
					type: 'custom', element: <b>Before surgery</b>
				}
			],
			[
				{type: 'custom', element: <div  style={{height: '18px'}}></div>}
			],
			...Array.from(Array(12), (v, k)=>([
				{
					type: 'custom', element: <label>{k+1}: Question</label>
				},
				{
					type: 'radio', name: `before_surgeries[${k}]`, showClearButton: false, options: [
						{id: 'yes', name: 'Yes'},
						{id: 'no', name: 'No'}
					]
				}
			]))
		];
		let formTemplate = commonForm(this, images, components);
		return (
			<div>
				<PageHeading title="Home" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel title="Home">
								<div className="con-pad">
									<SemiForm formTemplate={formTemplate} buttonAlign="center" onChange={this.handleFormChange} onSubmit={this.submit} />
								</div>
							</Panel>
						</Col>
					</Row>
				</Grid>
			</div>
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
ForeheadPage.contextTypes = {
	ajax: PropTypes.object
};
export default ForeheadPage;
