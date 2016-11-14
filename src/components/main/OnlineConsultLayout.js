import React, {PropTypes, Component} from 'react';
import Paper from 'material-ui/Paper';
/*
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
*/
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
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
            showMainMenu: false/*,
            languages: {
                items: [
                    {icon: <FontIcon className="flag-icon flag-icon-th" />, name: 'Thai'},
                    {icon: <FontIcon className="flag-icon flag-icon-gb-eng" />, name: 'English'}
                ],
                current: 0,
                openMenu: false,
                anchorEl: null
            }*/
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
        /*
        let languages = this.state.languages.items.map((lang, i)=>{
            return (
                <MenuItem key={i} primaryText={lang.name} onTouchTap={()=>this.setState({languages: Object.assign(this.state.languages, {current: i, openMenu: false, anchorEl: null})})} />
            );
        });
        let lang = this.state.languages.items[this.state.languages.current];
        */

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
                        {<ToolbarGroup firstChild={true} style={{visibility: 'hidden'}}>
                            <FlatButton className="icon-btn left-most" icon={<NavigationMenu />} onTouchTap={this.toggleMainMenu} />
                            <IconButton iconClassName="muidocs-icon-custom-github" />
                        </ToolbarGroup>}
                        {/*
                        <ToolbarGroup firstChild={true}>
                            <FlatButton className="icon-btn left-most" icon={lang.icon} label={lang.name} onTouchTap={(event)=>this.setState({languages: Object.assign(this.state.languages, {openMenu: !this.state.languages.openMenu, anchorEl: event.currentTarget})})}/>
                            <Popover
                                open={this.state.languages.openMenu}
                                anchorEl={this.state.languages.anchorEl}
                                anchorOrigin={{horizontal: 'left', vertical: 'bottom'}}
                                targetOrigin={{horizontal: 'left', vertical: 'top'}}
                                onRequestClose={()=>this.setState({languages: Object.assign(this.state.languages, {openMenu: false, anchorEl: null})})} >
                                <Menu>
                                    {languages}
                                </Menu>
                            </Popover>
                        </ToolbarGroup>
                        */}
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