import React from 'react';

export default class Friend extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "crystalyuecenwang1225@sdfok.com",
            respond:"accept",
            friendemail: "wang24@cooper.edu"
            

        }
    }

    componentDidMount() {
        var load = {
            email: this.state.email,
            friendemail: this.state.friendemail
        };
        fetch("http://localhost:4567/sendfriendrequest",{
            method: 'PUT',
             mode: 'cors',
            body: JSON.stringify(load)
            }
            );
        var responding = {
            email: this.state.email,
            respond: this.state.respond,
            friendemail: this.state.friendemail
        }
            fetch("http://localhost:4567/respondtofriendrequest",{
            method: 'PUT',
             mode: 'cors',
            body: JSON.stringify(responding)
            }
            );
        }

        
    
    render() {

        return (

                <div>
                    <h2 style={{ textAlign: "center" }}>Friend</h2>

                </div>
        );

    }
}