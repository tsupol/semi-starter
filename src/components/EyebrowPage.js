import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

import commonForm from '../settings/commonForm';

class Eyebrow extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {
			eyebrow_issue_other: false,
			eyes_issue_other: false,
			wrinkle_issue_other: false
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
				{type: 'custom', element: <h3>ปัญหาที่พบ (ช่วงคิ้ว)</h3>}
			],
			[
				{
					type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
				},
				{
					type: 'checkbox', name: 'eyebrow_issue', showClearButton: false, options: [
						{id: 'ช่วงคิ้วกับดวงตาแคบ', name: <div><label>ช่วงคิ้วกับดวงตาแคบ</label><br/><img src={example} style={{width: '200px'}} /></div>},
						{id: 'คิ้วไม่เท่ากัน', name: <div><label>คิ้วไม่เท่ากัน</label><br/><img src={example} style={{width: '200px'}} /></div>},
						{id: 'หัวคิ้วตก', name: <div><label>หัวคิ้วตก</label><br/><img src={example} style={{width: '200px'}} /></div>},
						{id: 'หางคิ้วตก', name: <div><label>หางคิ้วตก</label><br/><img src={example} style={{width: '200px'}} /></div>},
						{id: 'ไรผมสูง', name: <div><label>ไรผมสูง</label><br/><img src={example} style={{width: '200px'}} /></div>},
						{id: 'other', name: 'อื่นๆ'}
					], onCheck: (v)=> this.setState({eyebrow_issue_other: v.indexOf('other')!=-1})
				}
			],
			{
				settings: {
					hide: !this.state.eyebrow_issue_other
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'eyebrow_issue_other', multiLine: true, grid: {md: '70%'}
					}
				]
			},
			[
				{type: 'custom', element: <h3>ปัญหาที่พบ (ช่วงดวงตา)</h3>}
			],
			[
				{
					type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
				},
				{
					type: 'checkbox', name: 'eyes_issue', showClearButton: false, options: [
					{id: 'หัวตาตก', name: <div><label>หัวตาตก</label><br/><img src={example} style={{width: '200px'}} /></div>},
					{id: 'หางตาตก', name: <div><label>หางตาตก</label><br/><img src={example} style={{width: '200px'}} /></div>},
					{id: 'ชั้นตาหลบใน', name: <div><label>ชั้นตาหลบใน</label><br/><img src={example} style={{width: '200px'}} /></div>},
					{id: 'ชั้นตาไม่เท่ากัน', name: <div><label>ชั้นตาไม่เท่ากัน</label><br/><img src={example} style={{width: '200px'}} /></div>},
					{id: 'other', name: 'อื่นๆ'}
				], onCheck: (v)=> this.setState({eyes_issue_other: v.indexOf('other')!=-1})
				}
			],
			{
				settings: {
					hide: !this.state.eyes_issue_other
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'eyes_issue_other', multiLine: true, grid: {md: '70%'}
					}
				]
			},
			[
				{type: 'custom', element: <h3>ปัญหาที่พบ (ริ้วรอย)</h3>}
			],
			[
				{
					type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
				},
				{
					type: 'checkbox', name: 'wrinkle_issue', showClearButton: false, options: [
					{id: 'ริ้วรอยบริเวณหางตา', name: 'ริ้วรอยบริเวณหางตา'},
					{id: 'ริ้วรอยบริเวณเปลือกตา', name: 'ริ้วรอยบริเวณเปลือกตา'},
					{id: 'ริ้วรอยใต้ตา', name: 'ริ้วรอยใต้ตา'},
					{id: 'ริ้วรอยหน้าผาก', name: 'ริ้วรอยหน้าผาก'},
					{id: 'ริ้วรอยขมวดคิ้ว', name: 'ริ้วรอยขมวดคิ้ว'},
					{id: 'other', name: 'อื่นๆ'}
				], onCheck: (v)=> this.setState({wrinkle_issue_other: v.indexOf('other')!=-1})
				}
			],
			{
				settings: {
					hide: !this.state.wrinkle_issue_other
				},
				items: [
					{
						type: 'custom', element: <div>&nbsp;</div>, grid: {md: '30%'}
					},
					{
						type: 'text', name: 'wrinkle_issue_other', multiLine: true, grid: {md: '70%'}
					}
				]
			}
		];
		let formTemplate = commonForm(this, images, {components});
		return (
			<div>
				<PageHeading title="Eyebrow" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col md={9}>
							<Panel title="Eyebrow">
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
Eyebrow.contextTypes = {
	ajax: PropTypes.object
};
export default Eyebrow;

