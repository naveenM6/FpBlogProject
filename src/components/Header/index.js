import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props =>{
    const onclickLogout = () => {
        const {history} = props
        console.log(history);
        Cookies.remove('jwt_token')
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