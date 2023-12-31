import React, { useState ,useEffect } from 'react'
import axios from '../../../api/axios';
import { ToastContainer ,toast} from 'react-toastify';
let RESEND_URL ='https://ilearn.varankit.tech/resend-otp'
function ResendOtp({email}) {
    const [otp, setOtp] = useState("");
const [seconds, setSeconds] = useState(59);
useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
    }, 1000);
  
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);
  const handleResendOtp=async()=>{
  setSeconds(59);
  try{
    const response = await axios.post(RESEND_URL,{email:email},
      {headers:{'Content-Type':'application/json; charset=utf-8'},
        withCredentials: false});
        console.log(response.data.message)
        toast.info("New OTP sent!")
}catch(err){
  toast.error("No Server response")
  console.log('No Server response');
}
  }
  return (
    <div id='resend' className='belowButton'>
       <div className="countdown">
        <button type='button'
        id="resendButton"
        disabled={seconds > 0}
        style={{
          color: seconds > 0 ? "grey" : "",
        }}
        onClick={handleResendOtp}
      >
        Resend OTP
      </button>
   
    {seconds > 0 ? (
      <p>
         &nbsp; in {seconds} seconds
      </p>
    ) : (
      <p></p>
      
    )}</div>
    
      </div>
  )}


export default ResendOtp