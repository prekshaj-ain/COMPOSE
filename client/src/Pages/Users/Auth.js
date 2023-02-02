import React, { useContext, useState } from 'react'
import Input from '../../Components/FormElement/Input'
import Button from '../../Components/FormElement/Button'
import './Auth.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../Components/Context/auth-context'
function Auth() {

  const [ isLogInMode, setIsLoginMode ] = useState(true);
  const [inputVal,setInputVal] = useState({});
  const [error,setError] = useState();
  const [file,setFile] = useState(null);
  const changeHandler = (e)=>{
    let {name,value} = e.target;
    setInputVal(prevVal =>({
      ...prevVal,
      [name]:value
    }))
  }
  const {Username,Email,password} = inputVal;
  const auth = useContext(AuthContext);
  const submitHandler = async (e)=>{
    e.preventDefault();
    if(isLogInMode){
      try{
        let res = await axios.post('/user/login',{
          email:Email,
          password:password
        })
        auth.login(res.data.userId);
      }catch(err){
        setError(err.response.data.message);
      }
    }else{
      try{
        const formData = new FormData()
        console.log(file);
        formData.append('image',file);
        formData.append('email',Email);
        formData.append('password',password);
        formData.append('username',Username);
        let res = await axios.post('/user/signup',formData)
        auth.login(res.data.userId);
      }catch(err){
        setError(err.response.data.message);
      }
    }
  }
  const switchModeHandler = ()=>{
    if(!isLogInMode){
      setInputVal(prevVal=>({
        ...prevVal,
        Username: ""
      }))
    }
    setIsLoginMode(prevMode => !prevMode)
  }
  return (
    <div className="authenticate">
      <h2 className='auth-heading'>{isLogInMode ? 'LOGIN' : 'SIGNUP'}</h2>
      <hr />
      <form onSubmit={submitHandler} className="auth-form">
        {
          !isLogInMode &&
          <Input
            onChange={changeHandler}
            className="auth-input"
            inputStyle="auth-input-text"
            element="input"
            type="text"
            label="Username"
            placeholder="Enter your name"
            id="username"
            errorMsg="Enter a valid Username"
            name="Username"
            required
          />
        }
        <Input 
          onChange={changeHandler}
          className="auth-input"
          inputStyle="auth-input-text"
          element="input"
          type="email"
          label="Email"
          name="Email"
          placeholder="Enter your Email"
          id="email"
          errorMsg="Enter a valid Email"
          required
        />
        <Input
          onChange={changeHandler}
          className="auth-input"
          inputStyle="auth-input-text"
          element="input"
          type="password"
          name="password"
          label="Password"
          placeholder="Enter your Password"
          id="password"
          pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*[@/$/!/%/*/#/?/&/-/_])(?=.*\d)[A-Za-z\d@$!%*#?&-_].{8,16}$"
          required          
          errorMsg="Enter a valid Password(atleast 8-16 characters, 1 numeric digit, lowercase, uppercase, special character)"
        />
        {!isLogInMode && <Input
            className="auth-input"
            inputStyle="auth-input-text"
            onChange={(e)=>setFile(e.target.files[0])}
            element="input"
            name="file"
            type="file"
            id="file"
            label="Upload Avatar"
            labelStyle={{ textDecoration: "underline", cursor: "pointer", color:"blue" }}
            style={{ display: "none" }}
            errorMsg="Choose a Image"
          />}
        <Button size="big" >{isLogInMode ? 'LOGIN' : 'SIGNUP'}</Button>
      </form>
      <p className='error-msg'>{error}</p>
      <p className='switchMode'>No account? <Link to="/login" onClick={switchModeHandler}>{isLogInMode ? 'Signup' : 'Login'}</Link></p>
    </div>
  )
}

export default Auth