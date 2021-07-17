import {Component} from 'react';
import Cookies from 'js-cookie';
import {Redirect} from 'react-router-dom';
/* import Loader from 'react-loader-spinner' */

import PostItems from '../PostItems'
import Header from '../Header'

import './index.css'

export default class Posts extends Component {
    state = {postData: []}

    componentDidMount(){
        this.renderUserID();
    }

    renderUserID  = async () =>{
        const response = await fetch("https://polar-savannah-20729.herokuapp.com/posts");
        let data = []
        if(response.ok === true){
            data = await response.json();
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
                {/* {apiStatus?
                 (
                    <div className="loader-container">
                        <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
                    </div>
                 ):(postData.length === 0?
                 (<h1 className="nodata">No Data Found</h1>):
                 (postData.map(item => <PostItems postData={item} key={item.id} />)))} */}
                {postData.length === 0?
                 (<h1 className="nodata">No Data Found</h1>):
                 (postData.map(item => <PostItems postData={item} key={item.id} />))}
            </div>
        )
    }
}