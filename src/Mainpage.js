import React from 'react';
import SideNav, { NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import '@trendmicro/react-sidenav/dist/react-sidenav.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import default_user_image from './image/default_user_image.png';
import './mainpage.css';

import Twitter from './Twitter';
import Friend from './Friend';
import Profile from './Profile';

export default class Mainpage extends React.Component {
    default_user_name = "Demo User"
    constructor(props) {
        super(props);
        this.state = {
            user_image: default_user_image,
            user_name: this.default_user_name
        }
    }

    // this method will be called before the page is rendered, 
    // so pre-process the backend data here to get user avatar and user name
    componentWillMount() {
        //TODO
        //if(user has avatar){
            // this.setState({
            //     user_image: the user's image
            //      user_name: the user's name
            // });
        // }
    }


    render() {

        return (

            <div>
                <Router>
                    <Route render={({ location, history }) => (
                        <React.Fragment>
                            <div className="sidebar">
                                <SideNav
                                    expanded={true}
                                    disabled={true}
                                    onSelect={(selected) => {
                                        const to = '/' + selected;
                                        if (location.pathname !== to) {
                                            history.push(to);
                                        }
                                    }}
                                >
                                    <div style={{ textAlign: "center", margin: "20% 0" }}>
                                        <img id = "user_image_sidenav" src={this.state.user_image}></img>
                                        <h3 id="users_info" style={{ color: "white", textAlign: "center", fontSize: "25px" }}>
                                            {this.state.user_name}
                                            </h3>
                                    </div>
                                    <SideNav.Nav defaultSelected="profile">

                                        <NavItem eventKey="mainpage/profile" style={{ margin: "5px 0" }}>
                                            <NavIcon>
                                                <i className="fas fa-fw fa-id-card" style={{ fontSize: '1.75em' }} />
                                            </NavIcon>
                                            <NavText style={{ fontSize: "20px" }}>
                                                Profile
                                                </NavText>
                                        </NavItem>
                                        <NavItem eventKey="mainpage/twitter" style={{ margin: "5px 0" }}>
                                            <NavIcon>
                                                <i className="fas fa-fw fa-envelope" style={{ fontSize: '1.75em' }} />
                                            </NavIcon>
                                            <NavText style={{ fontSize: "20px" }}>
                                                Twitter
                                            </NavText>
                                        </NavItem>
                                        <NavItem eventKey="mainpage/friend" style={{ margin: "5px 0" }}>
                                            <NavIcon>
                                                <i className="fas fa-fw fa-users" style={{ fontSize: '1.75em' }} />
                                            </NavIcon>
                                            <NavText style={{ fontSize: "20px" }}>
                                                Friend
                                            </NavText>
                                        </NavItem>
                                    </SideNav.Nav>
                                </SideNav>
                            </div>
                            <div className="main">
                                <main >
                                    <Route path="/mainpage/profile" component={Profile} />
                                    <Route path="/mainpage/twitter" component={Twitter} />
                                    <Route path="/mainpage/friend" component={Friend} />
                                </main>
                            </div>
                        </React.Fragment>
                    )}
                    />
                </Router>
            </div>

        );

    }
}