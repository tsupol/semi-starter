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
		//let images = Array.from(Array(6), (v, k)=>({example, thumbnail}));
		let images = [];
		images.push({example: require('../../assets/img/hair/IMG_8042.jpg')});
		images.push({example: require('../../assets/img/hair/PIC_09037.jpg')});
		images.push({example: require('../../assets/img/hair/PIC_09048.jpg')});
		images.push({example: require('../../assets/img/hair/PIC_09055.jpg')});
		images.push({example: require('../../assets/img/hair/PIC_09060.jpg')});
		images.push({example: require('../../assets/img/hair/PIC_09090.jpg')});
		images = images.map((img)=>Object.assign({}, img, {thumbnail}));
		let values = {};
		let data = {};
		let components = [
			[
				{type: 'custom', element: <SemiHeader line="solid" style={marginBottomStyle}>{this.context.translate('current_shape')}</SemiHeader>}
			],
			[
				{type: 'radio', name: 'current_shape', showClearButton: false, horizontal: true,
					options: Array.from(Array(7), (v, k)=>({id: k+1, grid: imgOptionGrid, name: <img style={imgStyle} src={example}/>}))
				}
			]/*,
			[
				{type: 'custom', element: <SemiHeader>{this.context.translate('forehead_filler_histories')}</SemiHeader>}
			],
			...Array.from(Array(5), (v, k) => ([
				{type: 'label', label:`${k+1}.`, grid: {
					xs: '100%', mdAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, label: this.context.translate('forehead_filler_histories:area'), name: `histories[${k}][area]`, grid: {
					xs: '100%', md: `calc(20% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: this.context.translate('forehead_filler_histories:detail'), name: `histories[${k}][detail]`, grid: {
					xs: '100%', md: `calc(30% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: this.context.translate('forehead_filler_histories:date'), name: `histories[${k}][date]`, grid: {
					xs: '100%', md: `calc(20% - ${64/4}px)`
				}},
				{type: 'text', multiLine: true, label: this.context.translate('forehead_filler_histories:rating'), name: `histories[${k}][rating]`, grid: {
					xs: '100%', md: `calc(30% - ${64/4}px)`
				}}
			]))*/,
			[
				{type: 'custom', element: <SemiHeader style={{marginBottom: 24}}>{this.context.translate('rating_of_current_area')}</SemiHeader>}
			],
			[
				{type: 'radio', horizontal: true, name: 'rating', showClearButton: false, options: [
					{id: 5, name: this.context.translate('rating_of_current_area:best'), grid: optionGrid5},
					{id: 4, name: this.context.translate('rating_of_current_area:good'), grid: optionGrid5},
					{id: 3, name: this.context.translate('rating_of_current_area:general'), grid: optionGrid5},
					{id: 2, name: this.context.translate('rating_of_current_area:low'), grid: optionGrid5},
					{id: 1, name: this.context.translate('rating_of_current_area:bad'), grid: optionGrid5}
				]}
			],
			[
				{type: 'custom', element: <SemiHeader>{this.context.translate('requesting_area_and_expectation')}</SemiHeader>}
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
				{type: 'custom', element: <SemiHeader>{this.context.translate('requesting_reason')}</SemiHeader>}
			],
			...Array.from(Array(5), (v, k) => ([
				{type: 'label', style: {paddingTop: 12}, label:`${k+1}.`, grid: {
					xs: '10%', xsAlign: 'right', md: '64px'
				}},
				{type: 'text', multiLine: true, name: `requesting_reasons[${k}]`, grid: {
					xs: '90%', md: `calc(100% - ${64}px)`
				}},
			]))/*,
			[
				{type: 'custom', element: <SemiHeader style={marginBottomStyle}>{this.context.translate('question_before_surgery')}</SemiHeader>}
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
						{id: 'yes', name: this.context.translate('yes')},
						{id: 'no', name: this.context.translate('no')}
					]}
				]}
			))*/,[{type: 'space'}]

		];
		let formTemplate = {components};
		return (
			<MainForm header={this.context.translate('menu:forehead')} images={images} values={values} data={data} onSubmit={this.submit}>
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
	dialog: PropTypes.object,
	translate: PropTypes.func
};
export default ForeheadPage;
