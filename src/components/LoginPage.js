import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Grid, Row, Col} from 'react-flexbox-grid';
import {login, isAuthenticated, getError} from '../actions/userActions';
import {Alert, Panel} from 'react-semi-theme/widgets';
import {SemiForm} from 'react-semi-theme/forms';

class LoginPage extends Component {
    constructor(props, context) {
        super(props, context);
        this.errorMessages = {
            wordsError: "Please only use letters",
            numericError: "Please provide a number",
            urlError: "Please provide a valid URL"
        };
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.user.error) this.refs.alert.open([nextProps.user.error, 'Login Failed!']);
    }

    componentWillMount() {
        // fix: wrong password no alert (for hashHistory)
        this.context.router.push('/login');
    }

    onSubmit = (data) => {
        // console.log('data', data);
        this.props.actions.login(data.username, data.password).then((json)=> {
            console.log('json', json, this.props.user.error);
            if (this.props.actions.isAuthenticated()) {
                this.context.router.replace(this.props.routing.locationBeforeTransitions.query.ref || '/');
            }
        });
    };

    render() {
        let isTestServer = window.location.host.indexOf('schedule.mspinfo') < 0;
        let formTemplate = {
            data: {},
            values: {username: '', password: ''},
            settings: {showClearButton: false},
            components: isTestServer ?
                [
                    [{
                        type: 'text',
                        name: 'username',
                        label: 'Username (admin, sale1, service1, nurse1)',
                        required: true,
                        hint: 'your username or email',
                        validations: 'isAlphanumeric'
                    }],
                    [{
                        type: 'password',
                        name: 'password',
                        label: 'Password (password)',
                        required: true,
                        inputAttrs: {autocomplete: 'new-password'}
                    }]
                ] : [
                [{
                    type: 'text',
                    name: 'username',
                    label: 'Username',
                    required: true,
                    hint: 'your username or email',
                    validations: 'isAlphanumeric'
                }],
                [{
                    type: 'password',
                    name: 'password',
                    label: 'Password',
                    required: true,
                    inputAttrs: {autocomplete: 'new-password'}
                }]
            ]
        };

        return (
            <Grid className="center">
                <Alert ref='alert'/>
                <Row className="center-inner">
                    <Col xs mdOffset={4} md={4}>
                        <Panel title="Login">
                            <div className="con-pad">
                                <SemiForm onSubmit={this.onSubmit} formTemplate={formTemplate} submitLabel="Login"/>
                            </div>
                        </Panel>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

LoginPage.propTypes = {
    actions: PropTypes.object.isRequired,
    routing: PropTypes.object.isRequired
};
LoginPage.contextTypes = {
    router: PropTypes.object.isRequired
};

const mapStateToProps = ({user, routing}) => ({user, routing});
const mapDispatchToProps = (dispatch) => ({
    actions: {
        getError: bindActionCreators(getError, dispatch),
        login: bindActionCreators(login, dispatch),
        isAuthenticated: bindActionCreators(isAuthenticated, dispatch)
    }
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
