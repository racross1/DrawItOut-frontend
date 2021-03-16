import React from 'react' 
import Navbar from './Navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class LeftSideBox extends React.Component {
    render() {
        return (
            <div className="sidenav"> 
            <Navbar />
                
            </div>
        )
    }
}