import React, { useEffect, useState,useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {Spinner,Title} from "..";
import {MyContext,axiosApi} from "../../utility";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Products } from "./Products";
import { Sidebar } from "./Sidebar";



const StoreHomePage = () => {
    const { id } = useParams();
    const [categoryid, setCategoryid] = useState(0);
	const { context,setContext } = useContext(MyContext);
	const navigate = useNavigate();
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })


	useEffect(() => {

        const config = { method: "get", headers: { "Content-Type": "application/json" } }
        axiosApi(`api/userprofile/get-profile/${id}/`, config, setData, setContext);
    

	}, []);



  return (
    <div>
        {data.is_loading && <Spinner/>}
        {data.is_success && data.result && data.result.profile && <>
        <Header data={data.result.profile} id={id}/>
        <main>
    <div className='dashboard'>
      <div className='left'>
      {data.is_success && data.result && data.result.categories && <Sidebar data={data.result.categories} id={id} setCategoryid={setCategoryid} />}
      </div>
    
    <div className="right" >
     <Products id={categoryid} uid={id} />

      

    </div>
    </div>
    </main>

        <Footer data={data.result.profile}/>
        </>}
        {data.is_error && <p>Failed to Load, Try after Sometime.</p>}
      
    </div>
  )
}

export default StoreHomePage
