import React from 'react';
import './friend.css';
import $ from "jquery";

export default class Friend extends React.Component {

    all_email = [];

    constructor(props) {
        super(props);
        this.state = {
            email: "crystalyuecenwang1225@sdfok.com",
            respond:"accept",
            friendemail: "wang24@cooper.edu",
            requests:
            [{
                email: '123@ABC.com'
            },
            {
                email: '123456@ABCDEF.com'
            },
            {
                email: '1sadas23@ABasdasC.com'
            }]

        }
    }

    componentDidMount() {
        var load = {
            email: this.state.email,
            friendemail: this.state.friendemail
        };
        /*
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
*/
            if (this.state.requests) {// Attention!!!!changed to this.state.requests like we did in twitter.js, remember to change the constructor as well
                var counter = 0;
                Array.prototype.forEach.call(this.state.requests, element => {
                    var email = element.email;
                    const temp = counter;
                    this.all_email.push(<div id={"Req_" + temp}><div className="single_friendReq_box">{email}</div>
                        <input type="submit" className="accept" value="Accept" onClick={() => this.accept(temp, email)} />
                        <input type="submit" className="decline" value="Decline" onClick={() => this.decline(temp, email)} /></div>);
                    counter++;
                });
            }
    }

        
    
    send(){
            var sent_req_email = $("#addFriend").val();
            console.log(sent_req_email)
    }
        accept(counter, email) {
            console.log("accpet", counter, email);
            $("#Req_" + counter).hide('slow', function () { $("#Req_" + counter).remove(); });// remember to dequeue the request from backend
        }
        decline(counter, email) {
            console.log("decline", counter, email);
            $("#Req_" + counter).hide('slow', function () { $("#Req_" + counter).remove(); });// remember to dequeue the request from backend
        }
        render() {
            return (
                <div>
                    <h1 style={{ textAlign: "center" }}>Friend</h1>
                    <div id="content_friend">
                        <h2>Check Out Your Friends</h2>
                        <div style={{ position: "abosulte", display: "inline-block" }}>
                            <input type="text" id="addFriend" placeholder="What's your friend's email?" required />
                            <input type="submit" value="Send" id="send_btn_FReuqest" onClick={() => this.send()} />
                        </div>
                        <div id="border_box">
                            <div id="friend_box" style={{
                                position: 'relative',
                                height: '600px',
                                overflow: 'scroll'
                            }}>
                                <div id="received_requests">
                                    {!this.state.requests ? <span style={{ fontSize: "20px" }}>Oops, looks like no one sends you friend request yet <i className="far fa-fw fa-surprise" style={{ fontSize: '1.3em' }} /></span> : this.all_email}
                                </div>
                            </div>
                        </div>
    
                    </div>
                </div>
            );
        }
}