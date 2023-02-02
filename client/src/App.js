import React, { useEffect, useState } from 'react'
import {
  Switch,
  Route,
  Redirect,
  BrowserRouter as Router
} from 'react-router-dom'
import Blogs from './Pages/Blogs/Blogs';
import Auth from './Pages/Users/Auth';
import SingleBlog from './Pages/Blogs/SingleBlog';
import NewBlog from './Pages/Blogs/NewBlog';
import MainNav from './Components/Navigation/MainNav';
import { AuthContext } from './Components/Context/auth-context';
import { useCallback } from 'react';
import axios from 'axios';
import UserBlog from './Pages/Users/UserBlog';


function App() {
  const [user,setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const login = useCallback((uid)=>{
    setUser(uid);
  },[])
  const logout = useCallback(()=>{
    const Logout = async ()=>{
      await axios.post('/user/logout');
      setUser(null);
    }
    Logout();
  },[])
  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(user))
  },[user])
  let routes;
  if(!!user){
    routes = (
      <Switch>
      <Route path='/' exact>
          <Blogs/>
        </Route>
        <Route path='/user/:id'>
        <UserBlog/>
        </Route>
        <Route path='/post/new'>
          <NewBlog/>
        </Route>
        <Route path='/post/:id' >
          <SingleBlog/>
        </Route>
        <Redirect to="/"/>
      </Switch>
    )
  }else{
    routes = (
      <Switch>
        <Route path='/' exact>
          <Blogs/>
        </Route>
        <Route path='/user/:id'>
          <UserBlog/>
        </Route>
        <Route path='/post/new' exact>
          <Auth/>
        </Route>
        <Route path='/post/:id'>
          <SingleBlog/>
        </Route>
        <Route path='/login' exact>
          <Auth/>
        </Route>
        <Redirect to='/login' />
      </Switch>
    )
  }
  return (
    <AuthContext.Provider value={{user:user,login:login,logout:logout}}>
    <Router>
    <MainNav />
      {routes}
    </Router>
    </AuthContext.Provider>
  )
}

export default App