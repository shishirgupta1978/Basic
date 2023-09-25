import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/Form.scss";
import "../../assets/styles/Utility.scss";

import { BASE_URL,MyContext,axiosApi } from "../../utility";
import { toast } from "react-toastify";
import {Spinner} from "..";
import { Input } from "..";
export const UpdateProducts = () => {
  


  
	const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [saveData, setSaveData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [updateData, setUpdateData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [editData, setEditData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [deleteData, setDeleteData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    
	const { context,setContext } = useContext(MyContext);
    const [ updateId,setUpdateId] = useState(null);

	const [formData, setFormData] = useState({
		name:'',
		img_url:'',
		category:'',
		price:null,
		is_available:null

	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };
	
	

	const navigate = useNavigate();
	useEffect(()=>{
	
    	const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": true } }
		axiosApi(`api/userprofile/getproducts/`, config, setLoadData, setContext);
		
	},[saveData.is_success,deleteData.is_success,updateData.is_success])


	useEffect(()=>{
		if(editData.is_success)
		{
			setFormData({...formData, name:editData.result.name ? editData.result.name:'' });
		}
	},[editData.is_success])

    useEffect(()=>{
		if(updateData.is_success)
		{
			setUpdateId(null);
            setFormData({name:''})
		}
	},[updateData.is_success])


    useEffect(()=>{
		if(deleteData.is_success)
		{
			toast.success("Record deleted successfully.");
		}
	},[deleteData])

    useEffect(()=>{
		if(saveData.is_success)
		{
			toast.success("Record save successfully.");
		}
	},[saveData])



    const submitEdit = (id) => {
        setUpdateId(id)

			const config = { method: "get", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }}
			axiosApi(`api/userprofile/product/${id}/`, config, setEditData,setContext);
		};	

    const submitDelete = (id) => {
           const config = { method: "delete", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true } }
           axiosApi(`api/userprofile/deleteproduct/${id}/`, config, setDeleteData,setContext);
        };	
    


	const submitHandler = (e) => {
		e.preventDefault();
        if(updateId)
        {
			const config = { method: "put", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:formData }
			axiosApi(`api/userprofile/updateproduct/${updateId}/`, config, setUpdateData,setContext);
        }
        else{
            const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:formData }
			axiosApi(`api/userprofile/product/`, config, setSaveData,setContext);
        }
		};	

  return (


    <div className='utility'>
   
    <div className='left'>

	
	{loadData.is_loading && <Spinner />}
	
 <>
			<section className="form" style={{width:'100%'}}>
			
							<h2> Product Category</h2>
						<form onSubmit={submitHandler}>
				<Input  label='Product Name' type='text' name='name' value={formData.name} onChange={handleChange} required/>
				<Input  label='Img Url' type='text' name='img_url' value={formData.img_url} onChange={handleChange} required/>
				<Input  label='price' type='text' name='name' value={formData.price} onChange={handleChange} required/>
				<p style={{textAlign:"left", marginLeft:'10px'}}><input  type='checkbox' name='is_available' value={formData.is_available} onChange={handleChange} /> Is Available</p>
					<button type="submit">{updateId ? "Update": "Add"}</button>
						</form>
			</section></>
      
      
    </div>
    <div className='right'>
    {loadData.is_success && loadData.result.length >0 && 
    <table style={{width:'100%'}}>
        <tbody>
            {
    loadData.result.map((item) =><tr key={item.id}><td>{item.name}</td><td><img width="50px" height="40px" src={item.img_url}/></td><td>{item.price}</td><td>{item.is_available ? "Yes": "No"}</td><td><button onClick={()=>submitEdit(item.id)}>Edit</button></td><td><button onClick={()=>submitDelete(item.id)}>Delete</button></td></tr>)
}
    </tbody>
    </table>
    
    
    }

      
    </div>

  </div>





  )
}

