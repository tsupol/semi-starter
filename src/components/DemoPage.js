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
	};

	handleFormChange = (data)=> {

	};

	submit = (data)=> {
		this.context.ajax.call("post", "submit", data, {files: ['files.face', 'files.body', 'files.normal', 'files.non-exists', 'files2']});
	};

	render() {
		let options = [
			{id:'1', name:'Align Center with Minus Offset'}
		];

		let formTemplate = {
			data: {
				test: [
					{id: 'other', name: 'Align Center with Minus Margin'}
				]
			},
			values: {},
			components: [
				[
					{type: 'custom', element: <h3>Auto Width</h3>}
				],
				[
					{type: 'text', name: 'first_name', label: 'First Name'},
					{type: 'text', name: 'last_name', label: 'Last Name'},
					{type: 'text', name: 'nick_name', label: 'Nick Name'}
				],
				[
					{type: 'custom', element: <h3>Using Grid</h3>}
				],
				[
					{type: 'text', name: 'job', label: 'Right then Middle then Full', grid: {
						xs: '100%', md: '50%', mdOffset: '25%', xl: '40%', xlOffset: '60%'
					}}
				],
				[
					{type: 'text', name: 'job', label: '50px', grid: {
						xs: '50px'
					}},
					{type: 'text', name: 'job', label: 'Calc 50%', grid: {
						xs: 'calc(50% - 25px)'
					}},
					{type: 'text', name: 'job', label: 'Calc 50%', grid: {
						xs: 'calc(50% - 25px)'
					}}
				],
				[
					{type: 'label', label: 'Fixed Label:', grid: {
						xs: '200px'
					}},
					{type: 'text', name: 'job', label: 'Calc 50%', grid: {
						xs: 'calc(50% - 100px)'
					}},
					{type: 'text', name: 'job', label: 'Calc 50%', grid: {
						xs: 'calc(50% - 100px)'
					}}
				],
				[
					{type: 'label'} // empty row
				],
				[
					{type: 'label', grid: {
						xs: '0%', md: '50%'
					}},
					{type: 'checkbox', name: 'test', multiple: true, showClearButton: false, options,  grid: {
						xs: '100%', md: '294px', mdOffset: '-147px'
					}}
				]
			]
		};
		return (
			<div>
				<PageHeading
					title="Demo Page (Try resizing your browser)"
					description="xl, lg, md, sm, xs (same as BootStrap)"
				/>
				<Grid fluid className="content-wrap">
					<Row>
						<Col xs md={9}>
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
