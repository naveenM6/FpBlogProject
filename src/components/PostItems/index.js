import './index.css'

const PostItems = props =>{
    const {postData} = props
    return(
        <div className="postItem-container">
            <h1 className="postId">{postData.id}</h1>
            <div className="title-body">
                <p><span className="postheaders">Title: </span>{postData.title}</p>
                <p><span className="postheaders">Body: </span>{postData.body}</p>
            </div>
        </div> 
    )
}

export default PostItems