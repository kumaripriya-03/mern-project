import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Fetch() {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
    
  }, []);
  const getData = () => {
    fetch('http://localhost:5000/fetch')
      .then(response => response.json())
      .then(json => {
        console.log(json)
        setData(json)
      })
  }
  const deleteData=async(id)=>{
    
    let de=await fetch('http://localhost:5000/delete/'+id, {
     method: 'DELETE',
    });
    if(de){
      getData();
    }
  }
  return (
    <>
      <div className='container my-5'>
        <div className='row'>
          <h1 className='text-success text-center'>Fetch All Details</h1>
          <table className="table">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Address</th>
                {/* <th>Salary</th> */}
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                data.length>0?
                data.map((val, ind) =>
                  <tr key={ind}>
                    <th>{++ind}</th>
                    <td>{val.name}</td>
                    <td>{val.email}</td>
                    <td>{val.mobile}</td>
                    <td>{val.address}</td>
                    {/* <td>{val.anyname[0].salary}</td> */}
                    <td>
                      <button className='btn btn-danger' onClick={()=> 
                       {
                        if(window.confirm("delete this user?"))
                        deleteData(val._id)
                       } 
                        }>Delete</button>
                      <Link to={"/update/"+val._id}><button className='btn btn-warning' style={{marginLeft:"10px"}}>Update</button></Link>
                    </td>
                  </tr>


                )
                :
                <tr><th colSpan={6} className='text-center text-danger'>No Data</th></tr>
              }

            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Fetch
