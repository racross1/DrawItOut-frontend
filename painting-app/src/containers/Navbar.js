import React from 'react' 
import {Link} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

export default class Navbar extends React.Component {


    render () {
        return (
            <div>
                <Link to='/paintings/new' className='ui-button'>
                Create New Painting
                </Link>
                <Link to='/profile' className='ui-button'>
                    Profile
                </Link>
                <Link to='/gallery/all' className='ui-button'>
                All Paintings Gallery
                </Link>
                <Link to='/gallery/user' className='ui-button'>
                Your Paintings
                </Link>
                <Link to='/about' className='ui-button'>
                About Us
                </Link>
            </div>
        )
    }
}