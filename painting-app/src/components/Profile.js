import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Profile extends React.Component {

    state = {
       user: {
           username: this.props.userData.username,
            tagline: this.props.userData.tagline
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

    handleChangeTagline = (e) => {
        this.setState({
            user: {
                ...this.state.user, 
                tagline: e.target.value
            }
        })
    } 

    updateUser = (e) => {
        e.preventDefault() 
        let updatedUser = this.state.user
        let token = sessionStorage.getItem('token')
            fetch(`http://localhost:3000/users/${this.props.userData.id}`, {
                method: "PATCH",
                headers: {
                  Authorization: `bearer ${token}`,
                  "Content-Type": "application/json"           
                }, 
                body: JSON.stringify(updatedUser)
            })
            .then(resp => resp.json())
            .then(updated => alert("You've successfully updated your profile!"))
        }


    render() {
        
        return(
            <div className="profile-container">
                
            <h2>This is your profile</h2><br></br>
            <div>
            <form className="profile-form" onSubmit={(e) => this.updateUser(e)}>
                <div className="form-group">
                    <label>Username</label>
                    <input onChange={(e) => this.handleChangeUsername(e)} type="text" className="form-control" defaultValue={this.props.userData.username} />
                </div>

                <div className="form-group">
                    <label>Tag Line</label>
                    <input onChange={(e) => this.handleChangeTagline(e)} type="tag" className="form-control" defaultValue={this.props.userData.tagline} />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Update Profile</button><br></br>
                <button onClick={() => this.props.deleteUser()} className="btn btn-primary btn-block">Delete Account?</button><br></br>
                <button onClick={() => this.props.logout()} className="btn btn-primary btn-block">Logout</button>
            </form>
            </div> 
               
            </div>
        )
    }
}