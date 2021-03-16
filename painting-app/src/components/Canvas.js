import React from 'react'
import { Painterro } from 'painterro' 



 

export default class Canvas extends React.Component {
  
  constructor(props){
    super(props)

    const userID = this.props.userData.id
    const topicID = this.props.topicID
    console.log(topicID)
    const PTRO = Painterro({
      hiddenTools: ['crop', 'close', 'settings', 'resize'],
      saveHandler: function (image, done) {
        var formData = new FormData();
        formData.append("image", image.asBlob(), image.suggestedFileName());
        formData.append("user_id", userID)
        formData.append("topic_id", topicID)
        fetch('http://127.0.0.1:3000/paintings', {
          method: 'POST',
          body: formData
        })
        .then(response => response.json())
        .then(console.log)
        .catch((error) => {
          console.error('Error:', error);
        });
      }, 

    })
    this.state = {
      ptro: PTRO,
    }
  }

  componentWillUnmount() {
    this.props.addNewPainting()
    this.state.ptro.hide()
  
    
  }


    render() {
       
  
      this.state.ptro.show()
      
      return (
        <div >
              <h3 className='canvas'>All done! </h3>
              <h5 className='canvas'> Go check out your painting in your paintings gallery, or alongside all the other paintings in the main gallery :)</h5>
           
        </div>
      )
    }
}