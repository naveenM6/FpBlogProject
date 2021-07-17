import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props =>{

    const clearDatabase = async () =>{
        const url = "http://localhost:5000"
        const options = {
            headers:{
                "content-type": "application/json"
            },
            method: 'DELETE',
        }
        await fetch(url, options);
    }

    const onclickLogout = () => {

        clearDatabase()

        Cookies.remove('jwt_token')
        const {history} = props
        history.replace('/login')
    }

    return(
        <nav className="navbar-header">
            <div className="nav-content">
                <ul className="navbar-list-container">
                    <Link to="/" className="link">
                        <li>Upload</li>
                    </Link>
                    <Link to="/posts" className="link">
                        <li>Posts</li>
                    </Link>
                    <li onClick={onclickLogout}>Logout</li>
                </ul>
            </div>
        </nav>
    )
}

export default withRouter(Header);