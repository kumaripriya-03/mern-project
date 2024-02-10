import React from 'react'
import Home from './compo/Home'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import About from './compo/About'
import Contact from './compo/Contact'
import Header from './compo/Header'
import Register from './compo/Register'
import Fetch from './compo/Fetch'
import Update from "./compo/Update"
import Login from "./compo/Login"
import AdmRegister from './compo/Admin/AdmRegister'
function App() {
  return (
    <>
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/fetch' element={<Fetch/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/update/:id' element={<Update/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/admin-register' element={<AdmRegister/>}></Route>
        <Route path='*' element={<h1>404 Error- page not found</h1>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App