
import React from 'react' 
import Canvas from '../components/Canvas.js'
import Profile from '../components/Profile.js'
import Topics from '../components/Topics.js'
import Gallery from '../components/Gallery.js'
import YourPaintings from '../components/YourPaintings.js'
import About from '../components/About.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import {Route} from 'react-router-dom'


export default class RightDynamicPane extends React.Component{
   state = {
       allTopics: [],
       allPaintings: [],
       selectedPaintings: [],
       yourPaintings: [],
       yourSelectedPaintings: []
   }


    componentDidMount(){ 
        let token = sessionStorage.getItem('token')
        fetch('http://127.0.0.1:3000/topics', {
            method: "GET",
            headers: {
              Authorization: `bearer ${token}`,
            }
        })
        .then(resp => resp.json())
        .then(topics => {
            this.setState({
                allTopics: topics
            })
        })

        this.fetchPaintings()
      }

      fetchPaintings = () => {
        let token = sessionStorage.getItem('token')
        fetch('http://127.0.0.1:3000/paintings', {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          }
        })
        .then(resp => resp.json())
        .then(paintings => {
          let userPaintings = paintings.filter(p => p.user_id == this.props.userData.id)
          this.setState({
          allPaintings: paintings,
          selectedPaintings: paintings,
          yourPaintings: userPaintings,
          yourSelectedPaintings: userPaintings
        })
      }
      )
      }
      
      addNewPainting = () => {
        this.fetchPaintings()
      }

      filterPaintings =(topicID, topicSelected) => {
        if (topicSelected) {
          let paintings = this.state.allPaintings.filter(p => p.topic_id === topicID)
          this.setState({
           selectedPaintings: paintings
          }) 
        } else {
          this.setState({
            selectedPaintings: this.state.allPaintings
          })

        }
      }

      filterUserPaintings = (topicID, topicSelected) => {
        if (topicSelected) {
          let paintings = this.state.yourPaintings.filter(p => p.topic_id === topicID)
          this.setState({
           yourSelectedPaintings: paintings
          }) 
        } else {
          this.setState({
            yourSelectedPaintings: this.state.yourPaintings
          })

        }
      }

    render(){
      console.log(this.state.allPaintings.filter(p => p.user_id == this.props.userData.id))
      return (
      <div  id="right-pane" className="right-dynamic-pane">

        <Route exact path="/about" component={About} />

        <Route exact path="/profile" render={() => {
          return <Profile userData={this.props.userData} logout={this.props.logout} deleteUser={this.props.deleteUser} /> 
        }} />
        <Route exact path="/paintings/new" render={() => {
            return <Topics userData={this.props.userData} allTopics={this.state.allTopics} addNewPainting={this.addNewPainting}/>}
        }/>
         <Route exact path="/gallery/all" render={() => {
            return <Gallery userData={this.props.userData} paintings={this.state.selectedPaintings} allTopics={this.state.allTopics} filterPaintings={this.filterPaintings}/>}
        }/>

        <Route exact path="/gallery/user" render={() => {
            return <YourPaintings paintings={this.state.yourSelectedPaintings} allTopics={this.state.allTopics} filterUserPaintings={this.filterUserPaintings}/>}
        }/>

      </div>
    );
    }
  }

  