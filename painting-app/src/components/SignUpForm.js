import React, { Component } from "react";

export default class SignUpForm extends Component {

    state = {
        user: {
            username: "", 
            password: "", 
            tagline: ""
        }
    }

    handleChangeUsername = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                username: e.target.value
            }
        })
    }

    handleChangePassword = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                password: e.target.value
            }
        })
    }

    handleChangeTag = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                tagline: e.target.value
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault() 
        let newUser = this.state.user
        fetch('http://localhost:3000/users', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(newUser)
        })
        .then(resp => resp.json())
        .then(registeredUser => this.props.handleUserSession(registeredUser))
    }
    render() {
        return (
            <div className="sign-up">
                <form onSubmit={(e) => this.handleSubmit(e)} >
                    <h3>Sign Up</h3>

                    <div className="form-group">
                        <label>Username</label>
                        <input onChange={(e) => this.handleChangeUsername(e)} type="text" className="form-control" placeholder="Enter Username" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input onChange={(e) => this.handleChangePassword(e)} type="password" className="form-control" placeholder="Enter password" />
                    </div>

                    <div className="form-group">
                        <label>Tag Line</label>
                        <input onChange={(e) => this.handleChangeTag(e)} type="tag" className="form-control" placeholder="Enter Tag Line" />
                    </div>
                    <button type="submit" className="btn btn-primary btn-block">Sign Up</button><br></br>
                </form>

             <button  onClick={this.props.showRegisterForm} className="btn btn-primary btn-block">Already registered?</button>
            
            </div> 
        );
    }
}