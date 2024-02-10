import React, { useState } from 'react'

function About() {
  const[state,setState]=useState({name:"",email:'',mobile:''})
const handler=(e)=>{
  //console.log(e.target.value)
  setState({...state,[e.target.name]:e.target.value})
}
const submitData=()=>{
  console.log(state)
}
  return (
    <>

<div className='container'>
     <form>
        Name:<input type='text' name='name' value={state.name} onChange={handler} placeholder='Your Name' className='form-control my-3'/>
        Email:<input type='email' name='email' value={state.email} onChange={handler} placeholder='Your Email' className='form-control my-3'/>
        Mobile: <input className='form-control my-3' name="mobile" value={state.mobile} onChange={handler}  type='number' placeholder='Your mobile no'/>
      <button type='button' onClick={submitData} className='btn btn-danger'>Contact Us</button>
      </form>
     </div>
    </>
  )
}

export default About