import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Routes,Route,Navigate} from 'react-router-dom'
import { Header, Footer, Login, Register, ActivateUser,HomePage,ForgetPassword, Dashboard,UpdateProfile,LogViewer,Utility,ChangePassword ,ResetPassword} from './components'
import { ToastContainer } from "react-toastify";

export const Urls=()=> {

  return (
    <>

      <Header />
      <main>
      <Routes>
        <Route path="/" element={<HomePage />}>
        <Route index element={<Login/>}/>
        <Route path="forgetpassword" element={<ForgetPassword/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="activate" element={<ActivateUser/>}/>
        <Route path="resetpassword" element={<ResetPassword/>}/>
        </Route>
        <Route path="/dashboard" element={<Dashboard />}>
        <Route index element={<Utility/>}/>  
        <Route path="profile" element={<UpdateProfile/>}/>
        <Route path="changepassword" element={<ChangePassword/>}/>
        <Route path="utility" element={<Utility/>}/>
        <Route path="task2" element={<LogViewer/>}/>

        </Route>
       </Routes>
       </main>
      <Footer />
      <ToastContainer theme="dark" />
    </>
  )
}

