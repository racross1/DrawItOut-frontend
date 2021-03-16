import React from "react";
import Image from 'react-bootstrap/Image'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

export default class YourPaintings extends React.Component {
    state = {
        topicID: "",
        topicSelected: false,
        paintings: this.props.allPaintings
    }
    
    handleChange = (e) => {
        this.setState({topicID: e.target.value})
    }

    handleSubmit = (e) => {
        e.preventDefault()
        this.props.filterUserPaintings(parseInt(this.state.topicID), true)
    }

    handleClick = (e) => {
        this.setState({
            topicID: ""
        })
        this.props.filterUserPaintings("", false)
    }


    render(){
        const allTopics = this.props.allTopics
        let topicsKey = {}
        allTopics.forEach(t => {
            topicsKey[t.id] = t.topic
        })

        return(
            <Container fluid>
                <Row>
                    <Col sm={12} className='painting-page-title'>
                        <h2>Gallery - Your Paintings </h2>
                    </Col>
                <div className="col-md-12 text-right">
                        <form onSubmit={(e) => this.handleSubmit(e)}>
                            <label for="topics-filter">Sort your paintings by feeling...</label><br></br>
                            <select onChange={(e) => this.handleChange(e)} className="gallery-topic" id="topics">
                                <option value='blank'></option>
                                {this.props.allTopics.map(t => {
                                    return <option value={`${t.id}`}>{t.topic}</option>
                                    })
                                }
                            </select>
                 
                            <button className="gallery-submit" type="submit" value="Submit">Filter</button>
                        </form>
                        <button className="gallery-all" onClick={(e) => this.handleClick(e)}>See all paintings</button>
                </div>

                </Row>
                <Row>
                    {this.props.paintings.map(p => {
                        return <Col lg={3} md={2} className='hover-zoomin'>
                                <a href="#" title=""></a>
                                <Image src={`http://localhost:3000/${p.image}`} thumbnail className="thumbnail"/>
                                <p className='caption'>{`${topicsKey[p.topic_id]}`}</p>
                            </Col>
                        })}
                </Row>
            </Container>
        )
    }   
    
    
    // render(){
    //     const allTopics = this.props.allTopics
    //     let topicsKey = {}
    //     allTopics.forEach(t => {
    //         topicsKey[t.id] = t.topic
    //     })

    //     return(
    //         <Container fluid>
    //             <h2>Gallery - Your Paintings </h2>
    //             <Row>
    //                 {this.props.yourPaintings.map(p => {
    //                     return <Col lg={3} md={2} className='hover-zoomin'>
    //                             <a href="#" title=""></a>
    //                             <Image src={`http://localhost:3000/${p.image}`} thumbnail className="thumbnail"/>
    //                             <p className='caption'>{`${topicsKey[p.topic_id]}`}</p>
    //                         </Col>
    //                     })}
    //             </Row>
    //         </Container>
    //     )
    // }
}
