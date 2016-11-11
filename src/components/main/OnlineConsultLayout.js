import React, {PropTypes, Component} from 'react';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import {NavigationMenu, ActionAccountBox, ActionPowerSettingsNew, NavigationMoreVert} from 'material-ui/svg-icons';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import {Confirm, Alert, SideMenu} from 'react-semi-theme/widgets';

class OnlineConsultLayout extends Component {
    constructor(props, context) {
        super(props, context);
        this.linkTo = this.linkTo.bind(this);
        this.openConfirm = this.openConfirm.bind(this);
        this.openAlert = this.openAlert.bind(this);
        this.state = {
            showMainMenu: false
        };
    }

    linkTo(pathname) {
        return this.context.router.push(pathname);
    }

    getChildContext() {
        return { dialog: { confirm: this.openConfirm, alert: this.openAlert } }
    }

    openConfirm(...params) {
        console.log('openConfirm');
        this.refs.confirm.open(params);
    }

    openAlert(...params) {
        // console.log('description', title, description);
        this.refs.alert.open(params);
    }

    toggleMainMenu = () => {
        this.setState({showMainMenu: !this.state.showMainMenu});
    };

    render() {
        // console.log('render: layout', this.props.user);
        let showMainMenu = this.state.showMainMenu;
        let settings = this.props.settings;

        let toolsMenu = null;

        return (
            <div id="layout" className={`${showMainMenu ? '' : 'no-menu'}`}>
                <Confirm ref="confirm" />
                <Alert ref="alert" />
                <Drawer open={showMainMenu} className={`menu-wrapper ${showMainMenu ? '' : 'minimize'}`}>
                    <Toolbar className="side-nav-bar"><ToolbarTitle text="Navigation"/></Toolbar>
                    <SideMenu location={this.props.location} menu={this.props.mainMenu} />
                </Drawer>
                <Paper className="top-nav-wrap" zDepth={1}>
                    <Toolbar className="top-nav-bar">
                        <ToolbarGroup firstChild={true}>
                            <FlatButton className="icon-btn left-most" icon={<NavigationMenu />} onTouchTap={this.toggleMainMenu} />
                            <IconButton iconClassName="muidocs-icon-custom-github" />
                        </ToolbarGroup>
                        <ToolbarGroup>
                            <ToolbarTitle text={settings.toolbarTitle} />
                            {toolsMenu}
                        </ToolbarGroup>
                    </Toolbar>
                </Paper>
                <div className={`main-wrap`}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

OnlineConsultLayout.propTypes = {
    location: PropTypes.object.isRequired,
    appBarTitle: PropTypes.string.isRequired,
    children: PropTypes.object.isRequired
};
OnlineConsultLayout.contextTypes = {
    router: PropTypes.object
};
OnlineConsultLayout.childContextTypes = {
    dialog: PropTypes.object
};
export default OnlineConsultLayout;