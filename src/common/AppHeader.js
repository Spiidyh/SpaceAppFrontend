import React, {Component} from 'react';
import {
    Link,
    withRouter
} from 'react-router-dom';
import './AppHeader.css';
import {Layout, Menu, Dropdown, Icon} from 'antd';
import NoteDock from "../notes/NoteDock";


const Header = Layout.Header;

class AppHeader extends Component {
    constructor(props) {
        super(props);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    handleMenuClick({key}) {
        if (key === "logout") {
            this.props.onLogout();
        }
    }

    render() {
        let menuItems;
        let noteDock;
        if (this.props.currentUser) {
            noteDock = <NoteDock currentUser={this.props.currentUser}/>;
            menuItems = [
                <Menu.Item key="/">
                    <Link to="/" className="custom-navlink">
                        <label>Home</label>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/apod">
                    <Link to="/apod" className="custom-navlink">
                        <label>APOD</label>
                    </Link>
                </Menu.Item>,
                <Menu.Item key="/profile" className="profile-menu">
                    <ProfileDropdownMenu
                        currentUser={this.props.currentUser}
                        handleMenuClick={this.handleMenuClick}/>
                </Menu.Item>,

            ];
        } else {
            noteDock = ""
            menuItems = [
                <Menu.Item key="/login">
                    <Link to="/login" style={{color: "white"}}>Login</Link>
                </Menu.Item>,
                <Menu.Item key="/signup">
                    <Link to="/signup" style={{color: "white"}}>Signup</Link>
                </Menu.Item>
            ];
        }

        return (
            <Header className="app-header">
                <div className="container">
                    <div className="app-title" style={{color: 'white'}}>
                        <Link to="/" style={{color: 'white', visited: "white", hover: "#61dafb", active: "white"}}>Samppas Super Awesome Space App</Link>
                    </div>
                    {noteDock}
                    <Menu
                        className="app-menu"
                        mode="horizontal"
                        selectedKeys={[this.props.location.pathname]}
                        style={{lineHeight: '64px'}}>
                        {menuItems}
                    </Menu>
                </div>
            </Header>
        );
    }
}

function ProfileDropdownMenu(props) {
    const dropdownMenu = (
        <Menu onClick={props.handleMenuClick} className="profile-dropdown-menu" theme="dark" style={{color: "white"}}>
            <Menu.Item key="user-info" className="dropdown-item" disabled theme="dark" style={{color: 'white'}}>
                <div className="user-full-name-info" style={{color: "white"}}>
                    {props.currentUser.name}
                </div>
                <div className="username-info" style={{color: "white"}}>
                    @{props.currentUser.username}
                </div>
            </Menu.Item>
            <Menu.Divider/>
            <Menu.Item key="profile" className="dropdown-item" style={{color: "white"}} theme="dark">
                <Link to={`/users/${props.currentUser.username}` } style={{color: "white"}}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" className="dropdown-item"   style={{color: 'white'}}>
                Logout
            </Menu.Item>
        </Menu>
    );

    return (
        <Dropdown
            overlay={dropdownMenu}
            trigger={['click']}
            getPopupContainer={() => document.getElementsByClassName('profile-menu')[0]}>
            <a className="ant-dropdown-link">
                <Icon type="user" className="nav-icon" style={{marginRight: 0}}/> <Icon type="down"/>
            </a>
        </Dropdown>
    );
}


export default withRouter(AppHeader);