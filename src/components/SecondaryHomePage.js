import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {PageHeading, Panel} from 'react-semi-theme/widgets';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';

class HomePage extends Component {
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

	render() {
		let example = require('../assets/img/upload-example.png');
		return (
			<div>
				<PageHeading title="Home" description="description" />
				<Grid fluid className="content-wrap">
					<Row>
						<Col xs lg={10} lgOffset={1}>
							<Panel title="Home">
								<div className="con-pad">
									<Grid>
										<Row>
											<Col xs md={4}>
												<a href="#/hair"><h3>Hair</h3></a>
												<a href="#/hair"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/forehead"><h3>Forehead</h3></a>
												<a href="#/forehead"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/nose"><h3>Nose</h3></a>
												<a href="#/nose"><img src={example} width="100%" /></a>
											</Col>
										</Row>
										<Row>
											<Col xs md={4}>
												<a href="#/nose-recon"><h3>Nose (recon)</h3></a>
												<a href="#/nose-recon"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/eyelids"><h3>Eyelids</h3></a>
												<a href="#/eyelids"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/around-eyes"><h3>Around Eyes</h3></a>
												<a href="#/around-eyes"><img src={example} width="100%" /></a>
											</Col>
										</Row>
										<Row>
											<Col xs md={4}>
												<a href="#/eyebrow"><h3>Eyebrow</h3></a>
												<a href="#/eyebrow"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/lips"><h3>Lips</h3></a>
												<a href="#/lips"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/breast"><h3>Breast</h3></a>
												<a href="#/breast"><img src={example} width="100%" /></a>
											</Col>
										</Row>
										<Row>
											<Col xs md={4}>
												<a href="#/chin"><h3>Chin</h3></a>
												<a href="#/chin"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/cheek-bulge"><h3>Cheek Bulge</h3></a>
												<a href="#/cheek-bulge"><img src={example} width="100%" /></a>
											</Col>
											<Col xs md={4}>
												<a href="#/liposuction"><h3>Liposuction</h3></a>
												<a href="#/liposuction"><img src={example} width="100%" /></a>
											</Col>
										</Row>
										<Row>
											<Col xs md={4}>
												<a href="#/implants"><h3>Implants</h3></a>
												<a href="#/implants"><img src={example} width="100%" /></a>
											</Col>
										</Row>
									</Grid>
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
HomePage.contextTypes = {
	ajax: PropTypes.object,
	dialog: PropTypes.object
};
export default HomePage;
