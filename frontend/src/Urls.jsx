import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route,Navigate} from 'react-router-dom'
import { Header, Footer, Login, Register, ActivateUser,HomePage,ForgetPassword, Dashboard,UpdateProfile,LogViewer,Utility,ChangePassword ,ResetPassword} from './components'
import StoreHomePage from './components/userprofile/StoreHomePage'
import { ToastContainer } from "react-toastify";
import { UpdateUserProfile }   from './components/userprofile/UpdateUserProfile'
import { UpdateCategories } from './components/userprofile/UpdateCategies'
import { UpdateProducts } from './components/userprofile/UpdateProducts'

export const Urls=()=> {

  return (
    <>

      
      
      <Routes>
        <Route path="/" element={<HomePage />}>
        <Route index element={<Login/>}/>
        <Route path="forgetpassword" element={<ForgetPassword/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="activate/:uid/:token" element={<ActivateUser/>}/>
        <Route path="resetpassword" element={<ResetPassword/>}/>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Utility/>}/>  
        <Route path="profile" element={<UpdateProfile/>}/>
        <Route path="changepassword" element={<ChangePassword/>}/>
        <Route path="utility" element={<Utility/>}/>
        <Route path="task2" element={<LogViewer/>}/>
        <Route path="updateprofile" element={<UpdateUserProfile/>}/>
        <Route path="updatecategories" element={<UpdateCategories/>}/>
        <Route path="updateproducts" element={<UpdateProducts/>}/>
        
        </Route>

        <Route path="/user/:id/" element={<StoreHomePage />}/>


       </Routes>
      <ToastContainer theme="dark" />
    </>
  )
}

