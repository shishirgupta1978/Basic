import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL,MyContext,axiosApi } from "../../utility";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import {Spinner} from "..";
import { Input } from "..";
export const UpdateUserProfile = () => {
  


  
	const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const { context,setContext } = useContext(MyContext);

	const [formData, setFormData] = useState({
		logo_img_url: '',
		brand_name: '',
		contact_no:'',
		footnote:''
		
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };
	
	

	const navigate = useNavigate();
	useEffect(()=>{
		if(data.is_success)
		{
			toast.success("Record update successfully.")
			setLoadData({...data})
		}
		else{
		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`api/userprofile/get-user-profile/`, config, setLoadData, setContext);
		}
		
	},[data.is_success])


	useEffect(()=>{
		if(loadData.is_success)
		{
			setFormData({...formData, logo_img_url:loadData.result.logo_img_url ? loadData.result.logo_img_url:'' ,brand_name:loadData.result.brand_name ? loadData.result.brand_name : '',contact_no:loadData.result.contact_no ? loadData.result.contact_no : '',footnote:loadData.result.footnote ? loadData.result.footnote : ''});
		}
	},[loadData])




	const submitHandler = (e) => {
		e.preventDefault();
			const config = { method: "put", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:formData }
			axiosApi(`api/userprofile/update/`, config, setData,setContext);
		};	

  return (
	<div className="form-container">
	{loadData.is_loading && <Spinner />}
	
	{loadData.is_success && <>
			<section className="form">
			
							<h2> Update Profile</h2>
						<form onSubmit={submitHandler}>
				<Input  label='Logo Image Url' type='text' name='logo_img_url' value={formData.logo_img_url} onChange={handleChange}/>
				<Input  label='Brand Name' type='text' name='brand_name' value={formData.brand_name} onChange={handleChange}/>
				<Input  label='Contact No' type='text' name='contact_no' value={formData.contact_no} onChange={handleChange}/>
				<Input  label='Footnote Text' type='text' name='footnote' value={formData.footnote} onChange={handleChange}/>
					<Button type="submit" className="my-2" variant="dark">Update</Button>
						</form>
			</section></>}
		</div>


  )
}

