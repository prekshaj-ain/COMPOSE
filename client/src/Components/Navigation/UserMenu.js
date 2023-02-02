import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import './UserMenu.css';
import { AuthContext } from '../Context/auth-context';
function UserMenu(props){
    const auth = useContext(AuthContext);
    const logoutHandler = ()=>{
        auth.logout()
    }
    return (
        <div className='userMenu' onClick={props.onClick}>
            <div className="options">
                <Link className='profile' onClick={props.onClick}>
                    <PersonIcon fontSize="small"/>
                    <p>Profile</p>
                </Link>
                <Link className="stories" onClick={props.onClick}>
                    <ArticleIcon fontSize="small"/>
                    <p>Blogs</p>
                </Link>
            </div>
            <div className='logout' onClick={logoutHandler} >
                <p>Logout</p>
                <p>{props.name}</p>
            </div>
        </div>
    );
}
export default UserMenu;