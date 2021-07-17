import {Component} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';

import PostItems from '../PostItems'
import Header from '../Header'

import './index.css'

export default class Posts extends Component {
    state = {postData: []}

    componentDidMount(){
        this.renderUserID();
    }

    renderUserID  = async () =>{
        const response = await fetch("http://localhost:3000/posts");
        let data = []
        if(response.ok === true){
            data =await response.json();
            const formatedData = data.map( item =>({
                id: item.id,
                userId: item.userId,
                title: item.title,
                body: item.body,
            }))
            this.setState({postData: formatedData});
        }
    }

    render() {
        const {postData} = this.state;
        const jwtToken = Cookies.get('jwt_token')
        if (jwtToken === undefined) {
          return <Redirect to="/login" />
        }

        return (
            <div className="blog-list-container">
                <Header/>
                <h1 className="posts">Posts</h1>
                {postData.map(item => <PostItems postData={item} key={item.id} />)}
            </div>
        )
    }
}