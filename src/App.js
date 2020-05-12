import React, { Component } from 'react';

export default class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad: false,
            error: false
        };
    }

    componentDidMount() {
        fetch('http://localhost:4567/ping')
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,

                    });
                },

                (error) =>{
                    this.setState({
                        isLoaded: true,
                        error
                    } );
                }
            )
    }


    render() {
        const{error, isLoaded} = this.state;
        if(error){
            return <div>Error:{error.message}</div>;
        }
        else if (!isLoaded){
            return <div>Is Loading</div>;
        }
        else{
            return (
                <ul>
                   Hello everyone!!!
                </ul>
            );
        }
    }
}