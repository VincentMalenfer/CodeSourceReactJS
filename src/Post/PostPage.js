import React, { Component } from 'react'
import Comment from './Comment'
import profileImage from '../Images/profile.png'
import Loader from "../Includes/Loader"


class PostPage extends Component {
    constructor(){
        super()

        this.state = {
            post: [],
            comments: []
        }
    }
    componentDidMount(){
        let id = this.props.match.params.id
        fetch('https://jsonplaceholder.typicode.com/posts/'+id)
            .then((response) => response.json())
            .then((response) => setTimeout(() => this.setState({post: response}), 2000))

        fetch('https://jsonplaceholder.typicode.com/posts/'+id+'/comments')
            .then((response) => response.json())
            .then((response) => this.setState({comments: response}))
    }
    render(){

        let comments = this.state.comments.map((element, key) =>
            <Comment key={key} email={element.email} comment={element.body} src={profileImage}/>
        )

        return (
            <div className="container post-container">
                <div className="post">
                    {(this.state.post.length === 0) ? <Loader/> :
                        <div>
                            <h2>{this.state.post.title}</h2>
                            <p>{this.state.post.body}</p>
                        </div>
                    }
                </div>
                <div className="comments-container">
                    <h2 className="comments-title">Commentaires</h2>
                    {(comments.length === 0) ? <Loader/> : comments}
                </div>
            </div>
        )
    }
}

export default PostPage