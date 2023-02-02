import React, { useContext, useEffect, useState } from "react";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import Image from '../UIElements/Image';
import { Link } from "react-router-dom";
import MainHeader from "./MainHeader";
import SideDrawer from './SideDrawer';
import BackDrop from '../UIElements/BackDrop'
import "./MainNav.css";
import { AuthContext } from "../Context/auth-context";
import UserMenu from "./UserMenu";
import axios from "axios";
function MainNav() {
  const auth = useContext(AuthContext);
  const [isOpen,setIsOpen] = useState(false);
  const [userData,setUserData] = useState({});
  const {user} = auth;
  const openHandler = ()=>{
    setIsOpen(true);
  }
  const closeHandler = ()=>{
    setIsOpen(false);
  }
  useEffect(()=>{
    const fetchUser = async ()=>{
      const res = await axios.get('/user/'+ user);
      setUserData(res.data.user);
    } 
    fetchUser();
  },[user])
  return (
    <>
      {
        isOpen && <BackDrop onClick={closeHandler} />
      }
      <SideDrawer className={isOpen ? 'drawer show' : 'drawer' }>
        <UserMenu onClick={closeHandler} name={userData.username} />
      </SideDrawer>
    <MainHeader className="mainNav">
      <div className="heading">
        <Link className="main-nav--title" to="/">COMPOSE</Link>
        <div className="searchBar">
          <div className="searchIcon">
            <SearchOutlinedIcon fontSize="small" style={{ fill: "#666" }} />
          </div>
          <input
            type="text"
            placeholder="Compose a search"
            className="searchInput"
          />
        </div>
      </div>
      {!!auth.user && <Link className="write" to="/post/new">
        <EditOutlinedIcon style={{ fontSize: "18px" }} />
        <p>Write</p>
      </Link>}
      {!auth.user && <Link className="login" to="/login">
        <p>Login</p>
      </Link>}
      <div className="hide">
      <SearchOutlinedIcon
        fontSize="small"
      />
      </div>
      { !!auth.user && <button className="userButton" onClick={openHandler}>
          <Image src={userData.image} className="userIcon"/>
        <KeyboardArrowDownOutlinedIcon fontSize="small" />
      </button>}
    </MainHeader>
    </>
  );
}

export default MainNav;
