import React, { useState } from 'react'
import { json } from 'react-router-dom';

function AdmRegister() {

    const [state, setState] = useState({
        name: "",
        email: '',
        password: "",
        conpassword: "",
        img: ""
    });
    const handler = (e) => {
        setState({ ...state, [e.target.name]: e.target.value })
    }
    const fileHandler=(e)=>{
        //console.log(e.target.files[0])
        setState({...state,img:e.target.files[0]})
    }
    const submitData = () => {
        const { name, email, address, password, conpassword,img } = state
        let formData=new FormData()
        formData.append("name", name);
        formData.append("email", email);
        formData.append("address", address);
        formData.append("password", password);
        formData.append("conpassword", conpassword);
        formData.append("img", img);
        if (password === conpassword) {
            fetch('http://localhost:5000/admregis', {
                method: 'POST',
                body: formData
            }) 
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                document.getElementById("res").innerHTML=json.message
            })
            .catch(() => console.log("Api call error"))
            
           
            setState({
                name: "",
                email: '',
                password: "",
                conpassword: "",
                img: ""
            })
        }
        else {
            document.getElementById("res").innerHTML="Your password and confirm password is not match"
        }
    }
    return (
        <>
            <div className='container'>
                <div className='row'>
                    <h1 className='text-center text-uppercase'>Admin Register Page</h1>
                    <form method='post' encType='multipart/form-data'>

                        <input
                            type='text'
                            name='name'
                            value={state.name}
                            onChange={handler}
                            placeholder='Your Name'
                            className='form-control my-3' />
                       
                        <input type='email' value={state.email}
                            onChange={handler} name='email' placeholder='Your Email ID' className='form-control my-3' />
                        <input type='password' name='password' value={state.password}
                            onChange={handler} placeholder='Password' className='form-control my-3' />
                        <input type='password' value={state.conpassword}
                            onChange={handler} name='conpassword' placeholder='Confirm Password' className='form-control my-3' />
                        <input type="file" name="img" onChange={fileHandler}/><br/><br/>
                        <input type='button' className='btn btn-primary' value={"Submit"} onClick={submitData} />


                    </form>
                   
                        <h2 id='res'> </h2> 
                      
                   
                </div>
            </div>
        </>
    )
}

export default AdmRegister
