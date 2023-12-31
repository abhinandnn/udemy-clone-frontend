import React , {useState} from 'react'
import Signup_valid from './Signup_valid';
import Fa from '../../../assets/fa.svg';
import Fahid from '../../../assets/fa-hidden.svg';
import { Link } from 'react-router-dom';
function Signup_form() {
  const { handleChange, handleSubmit,errorEmail,errorName,errorPassword,errorUserName,strength,loading} = Signup_valid();
  const [showPassword, setShowPassword] = useState(false);
 
  const passwordShow = () => {
    setShowPassword(!showPassword);
  };
  return (
      <form onSubmit={handleSubmit}> 
      <div className='form' id='sigUp'>
        <div className='nameSignup'>
        <div className="input-signup-name">
    <input type="text"
    name='username'
    maxLength={30}
    placeholder='Enter Username'
    //username}
    onChange={handleChange}
    style={{ border: errorUserName ? "2px solid red" : "2px solid black"}}
    required /> 
    <label className={errorUserName ? "error-label":""}>Username</label>
    <span className="error-message">{errorUserName}</span>
   </div>
   <div className="input-signup-name">
    <input type="text"
    name='name'
    maxLength={50}
    placeholder='Enter Name'
    //name}
    onChange={handleChange}
    style={{ border: errorName ? "2px solid red" : "2px solid black"}}
    required /> 
    <label className={errorName ? "error-label":""}>Name</label>
    <span className="error-message">{errorName}</span>
   </div>
        </div>
       <div className="input-signup">
    <input type="email"
    name='email'
    maxLength={100}
    placeholder='Enter Email'
    //email}
    onChange={handleChange}
    style={{ border: errorEmail ? "2px solid red" : "2px solid black"}}
    required /> 
    <label className={errorEmail ? "error-label":""}>Email</label>
    <span className="error-message">{errorEmail}</span>
   </div>
  <div className="input-signup">
    <input type={showPassword?"text":"password"}
    name='password'
    maxLength={50}
    placeholder='Enter Password'
    //password}
    onChange={handleChange}
    style={{ border: errorPassword ? "2px solid red" : "2px solid black"}}
    required /> 
    <div className="icon-button" onClick={passwordShow}>
        <img src={showPassword?Fa:Fahid} />
      </div>
    <label className={errorPassword ? "error-label":""}>Password</label>
    <span className="error-message">{errorPassword}</span>
  </div>
  <div className='pwdStrength'>Password Strength
    <div className="strengthBar1"><div style={{background:strength===0?"#6B6D7C":strength===1?"#FF0000":strength===2?"#DEE223":strength===3?"#1D7AE8":strength===4?"#1FE627":"#6B6D7C"}}className="strengthBar">
      </div><div style={{background:strength===1?"#6B6D7C":strength===2?"#DEE223":strength===3?"#1D7AE8":strength===4?"#1FE627":"#6B6D7C"}} className="strengthBar">
      </div><div style={{background:strength===1?"#6B6D7C":strength===2?"#6B6D7C":strength===3?"#1D7AE8":strength===4?"#1FE627":"#6B6D7C"}} className="strengthBar">
      </div><div style={{background:strength===1?"#6B6D7C":strength===2?"#6B6D7C":strength===3?"#6B6D7C":strength===4?"#1FE627":"#6B6D7C"}} className="strengthBar">
      </div></div>
  <div id='signB'>
  <button className='signButton'
  disabled={loading}>
    {loading? (<svg className='sv' width="40"viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45"/>
</svg>)
    :("Sign up")}</button>
  <div className='authFooter'>Already have an account? <Link to={"/"}className='fort'>Log in</Link></div>
  </div>

</div>

  </div>
  </form>
  )
}

export default Signup_form