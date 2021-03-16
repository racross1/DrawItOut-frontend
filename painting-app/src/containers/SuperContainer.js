import React from 'react' 
import RightDynamicPane from './RightDynamicPane.js'
import LeftSideBox from './LeftSideBox.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import Row from 'react-bootstrap/Row'




export default class SuperContainer extends React.Component {

    render(){
        return (
        <div className="super-container">
        <h1 id='site-header' className="col-md-12 text-left">Draw It Out</h1>
        <LeftSideBox />
        <RightDynamicPane deleteUser={this.props.deleteUser} logout={this.props.logout} userData={this.props.userData} />
        </div>
    );
    }
}

