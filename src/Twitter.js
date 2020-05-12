import React from 'react';
import './twitter.css';
export default class Twitter extends React.Component {
    messages =
    [{
        date: '2051.1.2',
        Id: 12345,
        postText: 'I love dumb',
        user: 'DERF'
    },
    {
        date: '2132.21.21',
        Id: 56468,
        postText: 'I love pool',
        user: 'ANDY'
    },
    {
        date: '9876.21.21',
        Id: 97867,
        postText: 'I love steak',
        user: 'JOE'
    },
    {
        date: '1236.21.21',
        Id: 32432,
        postText: 'I love sleep',
        user: 'DERF'
    }];
all_chat = [];


    constructor(props) {
        super(props);
        this.state = {
            empty_msg: false,
            empty_msg: false,
            msg_sent_success: false
        }
    }
    send() {
        var msg = document.getElementById("chat_box").innerHTML;
        var recipient = document.getElementById("recipient").value;
        // if empty message
        if (!recipient) {
            this.setState({
                empty_recipient: true,
                empty_msg: false,
                msg_sent_success: false
            });
        }
        // if no user entered TODO do we need to check wether user is available?
        else if (!msg) {
            this.setState({
                empty_msg: true,
                empty_recipient: false,
                msg_sent_success: false
            });

        } else {
            this.setState({
                empty_msg: false,
                empty_recipient: false,
                msg_sent_success: true
            });
            document.getElementById("warning_twitter").style.color="green";
        }
        console.log(msg);
        var load ={
                email:"crystalyuecenwang1225@outlook.com",
                friendemail:recipient,
                posttext: msg
        };
        fetch("http://localhost:4567/sendPost",{
            method: 'POST',
             mode: 'cors',
            body: JSON.stringify(load)
            }
            ).then(response => {
             if(!response.ok){
                 this.setState({   
                   //  showWarning: true
                 });       
             }
          });
    }

    // this method will be called before the page is rendered, 
    // so pre-process the backend data here to get all messages user received from his/her friends
    componentWillMount() {
        //TODO
        //if(user has friends' messages){
        // this.setState({
        //     messages: the user's received messages(would better to be an array)
        // });
        // }
        if (this.messages) {
        Array.prototype.forEach.call(this.messages, element => {
            var text = element.postText;
            var user = element.user;
            this.all_chat.push(<div><div className="single_msg_box">{text}</div> <div className="said"> Sent By {user}</div></div>);
        });
    }

    }
    render() {
        return (
            <div>
                <h1 style={{ textAlign: "center" }}>Twitter</h1>
                <div id="content_twitter">
                    <h2>Messages From Friends</h2>
                    <div id="border_box">
                        <div id="msg_box" style={{
                            position: 'relative',
                            height: '400px',
                            overflow: 'scroll'
                        }}>
                            <div id="received_msgs">
                                {!this.messages ? <span style={{ fontSize: "20px" }}>Oops, looks like no one sends you message yet <i className="far fa-fw fa-surprise" style={{ fontSize: '1.3em' }} /></span> : this.all_chat}
                            </div>
                        </div>
                    </div>
                    <div style={{ position: "abosulte", display: "inline-block" }}>
                        <input type="text" id="recipient" placeholder="Who would you like to talk to?" required />
                        <div contentEditable="true" id="chat_box" type="text" placeholder="What do you have on your mind?"></div>
                        <input type="submit" value="Send" id="send_btn" onClick={() => this.send()} />
                        <span id="warning_twitter">
                            {this.state.empty_msg || this.state.empty_recipient || this.state.msg_sent_success ?

                                <>{this.state.msg_sent_success ? "Message sent successfully!" : <>{this.state.empty_recipient ? "Who do you want to send exactly ?" : "Nothing to say? Really?"}</>}</>

                                : null}
                        </span>
                    </div>
                </div>
            </div>
        );
    }
    };
