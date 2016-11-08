import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {SemiGrid, Row, Col} from 'react-semi-theme/grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';

class SemiGridDemo extends Component {
	constructor(props, context) {
		super(props, context);
		this.state = {};
	}

	componentWillMount() {
	}

	submit = (data)=> {
	};

	render() {
		return (
			<div>
				<PageHeading
					title="Grid Demo (Try resizing your browser)"
					description="xl, lg, md, sm, xs (same as BootStrap)"
				/>
				<SemiGrid className="pad-normal" style={{background: '#DDDDDD'}}>
					<Row>
						<Col xs md="40%">
							<div className="test-grid">40%</div>
						</Col>
						<Col xs md="60%">
							<div className="test-grid">60%</div>
						</Col>
					</Row>
					<Row style={{background: '#CCC'}}>
						<Col xs="20%" md="40%">
							<div className="test-grid"></div>
						</Col>
						<Col noPadding xs="80%" md="60%" style={{background: '#BBB'}}>
							<Row style={{background: '#EE5'}}>
								<Col xs md="40%">
									<div className="test-grid">Nested Row 1</div>
								</Col>
								<Col xs md="60%">
									<div className="test-grid"></div>
								</Col>
							</Row>
							<Row style={{background: '#E77'}}>
								<Col xs md="40%">
									<div className="test-grid">Nested Row 2</div>
								</Col>
								<Col xs md="60%">
									<div className="test-grid"></div>
								</Col>
							</Row>
						</Col>
					</Row>
				</SemiGrid>
			</div>
		);
	}
}

SemiGridDemo.contextTypes = {
	ajax: PropTypes.object
};
export default SemiGridDemo;
