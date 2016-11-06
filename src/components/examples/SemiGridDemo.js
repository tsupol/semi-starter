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
							<div className="test-grid">1</div>
						</Col>
						<Col xs md="60%">
							<div className="test-grid">1</div>
						</Col>
					</Row>
					<Row>
						<SemiGrid style={{background: '#CCCCCC'}}>
							<Row>
								<Col xs md="40%">
									<div className="test-grid">1</div>
								</Col>
								<Col xs md="60%">
									<div className="test-grid">1</div>
								</Col>
							</Row>
							<Row>
								<Col xs md="50%" mdOffset="50%">
									<div className="test-grid">2</div>
								</Col>
							</Row>
						</SemiGrid>
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
