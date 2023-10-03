import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

import {Routes,Route,Navigate} from 'react-router-dom'
import { Layout, Login, Register, ActivateUser,HomePage,ForgetPassword, UpdateProfile,LogViewer,Utility,ChangePassword ,ResetPassword, CreateWebsite,WebsiteProfile,UpdateCategories,UpdateProducts,Cart,Products,Website, WebList } from './components'
import { ToastContainer } from "react-toastify";

import { PrivateRoute } from './utility'

export const Urls=()=> {

  return (
    <>

      
      
      <Routes>
        <Route path="/" element={<Navigate to="/webmaster/" />}/>
        
        <Route path="/:website/" element={<Website />}>
        <Route index element={ <Products/>}/>
        <Route path="weblist" element={<WebList/>}/>
        <Route path="cart" element={<Cart/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="forgetpassword" element={<ForgetPassword/>}/>
        <Route path="register" element={<Register/>}/>
        <Route path="activate/:uid/:token" element={<ActivateUser/>}/>
        <Route path="resetpassword" element={<ResetPassword/>}/>
        <Route path="profile" element={<PrivateRoute><UpdateProfile/></PrivateRoute>}/>
        <Route path="changepassword" element={<PrivateRoute><ChangePassword/></PrivateRoute>}/>
        <Route path="create-website" element={<PrivateRoute><CreateWebsite/></PrivateRoute>}>
        <Route index element={<PrivateRoute><WebsiteProfile/></PrivateRoute>}/>  
        <Route path="update-categories" element={<UpdateCategories/>}/>
        <Route path="update-products" element={<UpdateProducts/>}/>
        <Route path="website" element={<ChangePassword/>}/>
        
        </Route>
      

</Route>

       </Routes>
      <ToastContainer theme="dark" />
    </>
  )
}

