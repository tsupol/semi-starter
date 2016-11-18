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
	optionGrid5 = {xs: '100%', sm: '20%', md: '20%'},
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

class ForeheadPage extends Component {
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
		this.context.ajax.call("post", "submit/forehead", data, {files: ['files']}).then((data)=>{
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
				{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>Header 1</SemiHeader>}
			],
			[
				{type: 'radio', name: 'forehead_type', showClearButton: false, horizontal: true,
					options: Array.from(Array(7), (v, k)=>({id: k+1, grid: imgOptionGrid, name: <img style={imgStyle} src={example}/>}))
				}
			],
			[
				{type: 'custom', element: <SemiHeader>Header 2</SemiHeader>}
			],
			...Array.from(Array(5), (v, k) => ([
				{type: 'label', label:`${k+1}.`, grid: {
					xs: '100%', mdAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, label: 'Area', name: `histories[${k}][area]`, grid: {
					xs: '100%', md: `calc(20% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: 'Detail', name: `histories[${k}][detail]`, grid: {
					xs: '100%', md: `calc(30% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: 'Date', name: `histories[${k}][date]`, grid: {
					xs: '100%', md: `calc(20% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: 'Rating', name: `histories[${k}][rating]`, grid: {
					xs: '100%', md: `calc(30% - ${64/4}px)`
				}}
			])),
			[
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>Rating of current area</SemiHeader>}
			],
			[
				{type: 'radio', horizontal: true, name: 'rating', showClearButton: false, options: [
					{id: 5, name: 'Best', grid: optionGrid5},
					{id: 4, name: 'Good', grid: optionGrid5},
					{id: 3, name: 'General', grid: optionGrid5},
					{id: 2, name: 'Low', grid: optionGrid5},
					{id: 1, name: 'Bad', grid: optionGrid5}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader>Requesting area &amp; Expectation</SemiHeader>}
			],
			...Array.from(Array(5), (v, k) => ([
				{type: 'label', style: {paddingTop: 12}, label:`${k+1}.`, grid: {
					xs: '10%', xsAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, name: `area_and_expect[${k}]`, grid: {
					xs: '90%', md: `calc(100% - ${64}px)`
				}},
			])),
			[
				{type: 'custom', element: <SemiHeader>Requesting reason</SemiHeader>}
			],
			...Array.from(Array(5), (v, k) => ([
				{type: 'label', style: {paddingTop: 12}, label:`${k+1}.`, grid: {
					xs: '10%', xsAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, name: `requesting_reasons[${k}]`, grid: {
					xs: '90%', md: `calc(100% - ${64}px)`
				}},
			])),
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>Before surgery</SemiHeader>}
			],
			...Array.from(Array(12), (v, k)=>({
				separator: true,
				style: {
					paddingTop: 16,
					paddingBottom: 16
				},
				items: [
					{type: 'label', style: {paddingTop: 3, fontWeight: 'normal'}, label:`${k+1}. Topic ${k+1}`, grid: {
						xs: '100%', md: '50%'
					}},
					{...rowSpace},
					{type: 'radio', name: `before_surgeries[${k}]`, horizontal: true, showClearButton: false, grid: {
						xs: '100%', md: '200px'
					}, options: [
						{id: 'yes', name: 'Yes'},
						{id: 'no', name: 'No'}
					]}
				]}
			)),[{type: 'space'}]
		];
		let formTemplate = {components};
		return (
			<MainForm header="Forehead" images={images} values={values} data={data} onSubmit={this.submit}>
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
ForeheadPage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default ForeheadPage;
