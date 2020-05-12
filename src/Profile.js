import React from 'react';
import default_user_image from './image/default_user_image.png';
import './profile.css';

export default class Profile extends React.Component {
    default_user_name = "Demo User"
    default_user_phone = 123456789
    default_user_email = "crystalyuecenwang1225@outlook.com"
    constructor(props) {
        super(props);
        this.state = {
            user_image: default_user_image,
            user_name: this.default_user_name,
            user_phone: this.default_user_phone,
            user_email: this.default_user_email,
            showMessage: false
        }
    }


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
        const email = this.state.user_email;
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
        
    }

    edit(){
        /*
        const name = document.getElementById("username").value;
        const phone = document.getElementById("phoneNo").value;
        const email = document.getElementById("email").value;
        */
        var load ={
            email: "crystalyuecenwang1225@outlook.com",
            newName: "Crys",
            newPassword: "test",
            newPhone: "6466599834" 
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
                    showMessage: true
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
                    <h2>
                        User Name:    {this.state.user_name}
                    </h2>
                    <h2>
                        Phone Number: {this.state.user_phone}
                    </h2>
                    <h2>
                        Email:        {this.state.user_email}
                    </h2>
                    <h2>
                    <input type="submit" value="EditYourInfo" id="send_btn" onClick={() => this.edit()} />
                    {this.state.showMessage ?  <span style={{ width: "640px", height: "40px" }}> Update Successfully</span> : <span style={{ width: "640px", height: "40px" }}> EditMe</span>}
                    </h2>
                </div>
                    <span style={{marginLeft: "1600px"}}>Wow! You found me! 
                    Enjoy using our project? Rate us! ^O ^</span>
            </div>
        );

    }
}

