import React from 'react';
import default_user_image from './image/default_user_image.png';
import './profile.css';
import $ from "jquery";
import classNames from 'classnames';

export default class Profile extends React.Component {
    default_user_name = "Crys"
    default_user_phone = 6466599834
    default_user_email = "crystalyuecenwang1225@outlook.com"
    default_user_password = "test"
    constructor(props) {
        super(props);
        this.state = {
            user_image: default_user_image,
            user_name: this.default_user_name,
            user_phone: this.default_user_phone,
            user_email: this.default_user_email,
            edit_name: true,
            edit_phone: true,
            edit_email: true,
            newName: this.default_user_name,
            newPhone: this.default_user_phone,
            newwEmail: this.default_user_email
        }
    };


    // this method will be called before the page is rendered, 
    // so pre-process the backend data here to get user avatar and user name, email and phonenumber
    componentWillMount() {
        //TODO
        //if(user has avatar){
        // this.setState({
        //     user_image: the user's image
        //      user_name: the user's name,
        //      user_phone: user_phone,
        //      user_email: user_email,
        // });
        // }
       /*
        fetch(`http://localhost:4567/getuser?email=${email}`,{
            method: 'GET',
            mode: 'cors',
            headers:{
               'Accpet': 'application/json',
               'Content-Type': 'application/json'
            }
        }).then((result)=>{
         var response = result.json();
         console.log(response);
        });
        
        */
    }

edit2(type) {
    $("#profile_" + type).prop('disabled', false);
    $("#profile_" + type).removeClass('placeholder_present');
    $("#profile_" + type).focus();
    if(type == "name")
    this.setState({
        edit_name: false
    })
    if(type == "phone")
    this.setState({
        edit_phone: false
    })
    if(type == "email")
    this.setState({
        edit_email: false
    })
};

confirm(type) {
    let newName = null;
    let newPhone = null;
    let newEmail = null;
    $("#profile_" + type).prop('disabled', true);
    $("#profile_" + type).addClass('placeholder_present');
    if(type == "name")
    this.setState({
        edit_name: true,
        newName : $("#profile_" + type).val()
    })
    if(type == "phone")
    newPhone = $("#profile_" + type).val()
    this.setState({
        edit_phone: true,
        newPhone: $("#profile_" + type).val()
    })
    if(type == "email")
  //  newEmail = $("#profile_" + type).val()
    this.setState({
        edit_email: true,
        newEmail: $("#profile_" + type).val()
    })
   
    var load = {
        email : this.default_user_email,
        newName : this.state.newName,
        newPassword: this.default_user_password,
        newPhone: this.state.newPhone
    };
    fetch("http://localhost:4567/update",{
             method: 'PUT',
             mode: 'cors',
             headers:{
                'Accpet': 'application/json',
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(load)
         }).then(response => {
            if(response.ok){
                this.setState({   
                    //showMessage: true
                });
            }
         console.log(load);
    });
}
    

    render() {

        return (

            <div>
                <h1 style={{ textAlign: "center" }}>Profile</h1>
                <img id="profile_img" src={this.state.user_image}></img>
                <div id="profile_user_info">
                    <div>
                        {this.state.edit_name ? <input type="submit" className={classNames('edit_btn', '_btn')} id="edit_btn_name" value="Edit" onClick={() => this.edit2("name")} /> :
                        <input type="submit" className='_btn' id="edit_btn_name" value="Confirm" onClick={() => this.confirm("name")} />}
                        <h2 style={{ display: "inline-block" }}>
                            User Name:
                    </h2>

                        <input className={classNames('profile_edit', 'placeholder_present')} id="profile_name" disabled="true" placeholder={this.state.user_name} />

                    </div>

                    <div>
                    {this.state.edit_phone ? <input type="submit" className={classNames('edit_btn', '_btn')} id="edit_btn_phone" value="Edit" onClick={() => this.edit2("phone")} /> :
                        <input type="submit" className='_btn' id="edit_btn_phone" value="Confirm" onClick={() => this.confirm("phone")} />}
                        <h2>
                            Phone Number:
                    </h2>

                        <input className={classNames('profile_edit', 'placeholder_present')} id="profile_phone" disabled="true" placeholder={this.state.user_phone} />

                    </div>

                    <div style={{ marginTop: "5%" }}>
                    {this.state.edit_email ? <input type="submit" className={classNames('edit_btn', '_btn')} id="edit_btn_email" value="Edit" onClick={() => this.edit2("email")} /> :
                        <input type="submit" className='_btn' id="edit_btn_email" value="Confirm" onClick={() => this.confirm("email")} />}
                        <h2>
                            Email:
                    </h2>
                        <input className={classNames('profile_edit', 'placeholder_present')} id="profile_email" disabled="true" placeholder={this.state.user_email} />
                    </div>
                </div>
                <span style={{ marginLeft: "1600px" }}>Wow! You found me!
                    Enjoy using our project? Rate us! ^O ^</span>
            </div>
        );

    }
}

