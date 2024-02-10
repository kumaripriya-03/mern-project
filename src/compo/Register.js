import React, { useState } from 'react'
import axios from "axios"
function Register() {
  const [state, setState] = useState({ name: "", email: '', mobile: '', password: "", conpassword: "", address: "" })
  const handler = (e) => {
    //console.log(e.target.value)
    setState({ ...state, [e.target.name]: e.target.value })
  }
  const submitData = () => {
    const { name, email, password, conpassword, mobile, address } = state
    if (password === conpassword) {
      axios({
        method: 'post',
        url: 'http://localhost:5000/register-user',
        data:{ name, email, password, conpassword, mobile, address }
      })
      .then((json) => {
          console.log(json.data)
          alert("register Success")
          setState({ name: "", email: '', mobile: '', password: "", conpassword: "", address: "" })
        })
        .catch(()=>console.log("api call error"))
    }
    else {
      alert("Your password and confirm password is not match")
    }
  }
  return (
    <>

      <div className='container'>
        <h1 className='text-center text-danger'>Register Here</h1>
        <form>
          Name:<input type='text' name='name' value={state.name} onChange={handler} placeholder='Your Name' className='form-control my-3' />
          Email:<input type='email' name='email' value={state.email} onChange={handler} placeholder='Your Email' className='form-control my-3' />
          Mobile: <input className='form-control my-3' name="mobile" value={state.mobile} onChange={handler} type='number' placeholder='Your mobile no' />
          Password:<input type='password' name='password' value={state.password} onChange={handler} placeholder='Your Password' className='form-control my-3' />
          Confirm Password:<input type='password' name='conpassword' value={state.conpassword} onChange={handler} placeholder='Your Confirm Password' className='form-control my-3' />
          Address:<textarea placeholder='Address Here' name="address" value={state.address} onChange={handler} rows={4} className='form-control my-3'></textarea>
          <button type='button' onClick={submitData} className='btn btn-danger'>Contact Us</button>
        </form>
      </div>
    </>
  )
}

export default Register