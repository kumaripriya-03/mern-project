import React,{useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';

function Update() {
  const params=useParams()
 // console.log(params)
  const initialValue = {
    name: "",
    email: '',
    mobile: "",
    password: "",
    conpassword: "",
    address: ""
}
const [state, setState] = useState(initialValue);
useEffect(()=>{
  fetch(`http://localhost:5000/getDetails/${params.id}`)
  .then(response => response.json())
  .then(json => {
    console.log(json)
    setState(json)
  })
},[]);
const handler = (e) => {
  setState({ ...state, [e.target.name]: e.target.value })
}
const updateData=()=>{
  const { name, email, mobile, address, password, conpassword } = state
  if (password === conpassword) {
      fetch(`http://localhost:5000/update/${params.id}`, {
          method: 'put',
          body: JSON.stringify({ name, email, mobile, address, password, conpassword }),
          headers: {
              'Content-type': 'application/json; charset=UTF-8',
          },
      })
          .then((response) => response.json())
          .then((json) => console.log(json));
      document.getElementById("res").innerHTML="Update Successfully!!!"
           
      setState(initialValue)
  }
  else {
      alert("Your password and confirm password is not match")
  }
}
  return (
    <>

      <div className='container'>
                <div className='row'>
                    <h1 className='text-center text-uppercase'>Update User Details Page</h1>
                    <form >
                        <input
                            type='text'
                            name='name'
                            value={state.name}
                            onChange={handler}
                            placeholder='Your Name'
                            className='form-control my-3' />
                        <input type='number' name='mobile' value={state.mobile}
                            onChange={handler} placeholder='Mobile number' className='form-control my-3 my-3' />
                        <input type='email' disabled value={state.email}
                            onChange={handler} name='email' placeholder='Your Email ID' className='form-control my-3' />
                        <input type='password' name='password' value={state.password}
                            onChange={handler} placeholder='Password' className='form-control my-3' />
                        <input type='password' value={state.conpassword}
                            onChange={handler} name='conpassword' placeholder='Confirm Password' className='form-control my-3' />
                        <textarea rows={'2'} name='address' value={state.address}
                            onChange={handler} placeholder='Your Address' className='form-control my-3'></textarea>
                        <input type='button' className='btn btn-primary' value={"Submit"} onClick={updateData} />


                    </form>
                   
                        <h2 id='res'> </h2> 
                      
                   
                </div>
            </div>
    </>
  )
}

export default Update
