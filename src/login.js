import React from 'react';
// import { Redirect } from "react-router-dom";
import './login.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Mainpage from './Mainpage';
import Twitter from './Twitter';	
import Friend from './Friend';	
import Profile from './Profile';

function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

/*
function checkIfCanLogin(currThis, callback){
    if (document.cookie == "") {
        callback(currThis, false);
    } else {
        // check if the cookie is a valid on
        apiCall("isValidUser", "POST", {"userSesh": getCookie("sessid")}, currThis, function (status, response, currThis) {
            if (status != 200) {
                callback(currThis, false, response);
            } else {
                callback(currThis, true, response);
            }
        });
    }
}

*/

 class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showWarning: false,
            warning_nameExisted: false,
           //  name: "",
             //password:"",
             //phone:"",
             //email:""
        }
    }

    componentDidMount() {
      
        
    }

    login() {
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        
        this.setState({   
                  email: this.state.email,
                  password: this.state.password
              });

              var load = {
                email : email,
                password : password
             };
                 
/*
               fetch(`http://localhost:4567/getuser?email=${email}`,{
                method: 'GET',
                mode: 'cors',
                headers:{
                   'Accpet': 'application/json',
                   'Content-Type': 'application/json'
                },
            }).then(response => {
                if(!response.ok){
                    this.setState({   
                        showWarning: true
                    });
                }
            });

                  */       
             fetch("http://localhost:4567/login",{
                   method: 'POST',
                    mode: 'cors',
                   body: JSON.stringify(load)
                   }
                   ).then(response => {
                    if(!response.ok){
                        this.setState({   
                            showWarning: true,
                            warning_nameExisted:false
                        });
                    }
                    else{
                        console.log("Login clicked with email: " + load.email + "and password: " + load.password);//TODO eliminate after finish the page
                        window.location.replace("/mainpage");
                    }
                });
                    }
                
                
    componentDidMount(){
       
    }
    register() {
        const name = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const phone = document.getElementById("phoneNo").value;
        const email = document.getElementById("email").value;
        //check if user already registered
        //TODO: put ajax here
        //if so prompt warning
        if (true) {
            this.setState({
                showWarning: false,
                warning_nameExisted: false,
           //     name: name,
             //   password: password,
               // phone: phone,
                //email: email
            });
        } else {

        }

        var load = {
            name :name,
            password : password,
            phone : phone,
            email : email
        };
        //check if user already registered
        //TODO: put ajax here
        fetch("http://localhost:4567/register",{
             method: 'POST',
             mode: 'cors',
             headers:{
                'Accpet': 'application/json',
                'Content-Type': 'application/json'
             },
             body: JSON.stringify(load)
         }
         ).then(response =>{
             console.log(response.status);
             if (response.status == 401){
             this.setState({
                 showWarning: true,
                 warning_nameExisted: true
             });
             console.log(this.state.warning_nameExisted);
            }
         });
        console.log("register clicked with username: " + name + "and password: " + password);
        console.log("constructior" + load.name + "and password: " +  load.password);
        console.log(JSON.stringify(load));
        // 
        //otherwise continue the register process
    
    }
    showRegister() {
        this.setState({
            isRegister: true,
            showWarning: false
        });
    }
    hideRegister() {
        this.setState({
            isRegister: false,
            showWarning: false
        });
    }
    render() {

        return (
            <div>
                    <div className="container">
                        <div className="row">
                            <h2 style={{ textAlign: "center" }}>{!this.state.isRegister ? "Login" : "Register"}</h2>

                            <div className="col">
                                {this.state.showWarning ? <>{this.state.warning_nameExisted ? <span style={{ color: "red" }}>Username Already Exited, Please Choose Another One</span> : <span style={{ color: "red" }}>Email or password Doesn't Exist/wrong password, Please Check Again</span>}</> : <span style={{ width: "640px", height: "40px" }}> </span>}
                                <input id="email" type="text" name="email" placeholder="E-mail Address" required />
                                <input id="password" type="password" name="password" placeholder="Password" required />

                                {!this.state.isRegister ? <input type="submit" value="Login" onClick={() => this.login()} /> :
                                    <div><input id="phoneNo" type="text" name="phoneNo" placeholder="Phone Number" required />
                                        <input id="username" type="text" name="name" placeholder="User name" required /></div>}

                                {this.state.isRegister ? <input style={{ backgroundColor: "rgb(105, 184, 229)" }} type="submit" value="Register" onClick={() => this.register()} /> : <span id="showRegister" onClick={() => this.showRegister()}>Don't have an account yet? CLICK ME!</span>}
                                {this.state.isRegister ? <span id="showRegister" onClick={() => this.hideRegister()}>Back to Login!</span> : null}
                            </div>

                        </div>
                    </div>
            </div>
        );

    }
}

export default function App() {
    return (
        <Router>
            <Switch>
                <Route path="/mainpage" component={Mainpage} />	
                <Route exact path="/" component={Login} />	
                <Route path="/mainpage/profile" component={Profile} />	
                <Route path="/mainpage/twitter" component={Twitter} />	
                <Route path="/mainpage/friend" component={Friend} />
            </Switch>
        </Router>
    );
  }