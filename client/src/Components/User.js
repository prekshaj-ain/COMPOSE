import React, { useContext } from 'react'
import axios from 'axios'
import Image from './UIElements/Image'
import './User.css'
import { useHistory } from 'react-router-dom';
import { AuthContext } from './Context/auth-context';
import { Link } from 'react-router-dom';
function User(props) {
  const auth = useContext(AuthContext)
  const history = useHistory();
  return (
    <div className='user'>
        <Image className="user-img" src={props.profile} />
        <Link to={`/user/${props.uid}`} className="user-info">
            <span className='user-info--name'>{props.name}</span>
            <p className='user-info--time'>{new Date(props.time).toDateString()}</p>
        </Link>
    </div>
  )
}

export default User