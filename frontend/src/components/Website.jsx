import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Spinner,Title} from ".";
import {MyContext,axiosApi} from "../utility";
import { WebsiteFooter } from "./WebsiteFooter";
import { Outlet } from "react-router-dom";
import { WebsiteHeader } from "./WebsiteHeader";
import { Products } from "./Products";
import { Sidebar } from "./Sidebar";



export const Website = () => {
    const { uid } = useParams();
    
	const { context,setContext } = useContext(MyContext);
	const navigate = useNavigate();
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })


	useEffect(() => {

        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`api/userprofile/get-profile/${uid}/`, config, setData, setContext);
    

	}, []);



  return (
    <div>
        {data.is_loading && <Spinner/>}
        {data.is_success && data.result && data.result.profile && <>
        <WebsiteHeader data={data.result.profile} uid={uid} />
        <main>
    
    <Outlet/>
    
    </main>

        <WebsiteFooter data={data.result.profile}/>
        </>}
        {data.is_error && <p>Failed to Load, Try after Sometime.</p>}
      
    </div>
  )
}

