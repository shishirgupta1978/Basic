import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/Form.scss";
import "../../assets/styles/Utility.scss";

import { BASE_URL,MyContext,axiosApi } from "../../utility";
import { toast } from "react-toastify";
import {Spinner} from "..";
import { Input } from "..";
export const UpdateCategories = () => {
	const ButtonStyles = {
		button: {
		  padding: '8px 16px',
		  marginRight: '8px',
		  backgroundColor: '#007bff',
		  color: '#fff',
		  border: 'none',
		  borderRadius: '4px',
		  cursor: 'pointer',
		  outline: 'none',
		},
		editButton: {
		  backgroundColor: '#28a745',
		},
		deleteButton: {
		  backgroundColor: '#dc3545',
		},
	  };
	  
  


  
	const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [saveData, setSaveData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [updateData, setUpdateData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [editData, setEditData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [deleteData, setDeleteData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    
	const { context,setContext } = useContext(MyContext);
    const [ updateId,setUpdateId] = useState(null);

	const [formData, setFormData] = useState({
		name:''
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
		axiosApi(`api/userprofile/get-product-categories/`, config, setLoadData, setContext);
		
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
			axiosApi(`api/userprofile/category/${id}/`, config, setEditData,setContext);
		};	

    const submitDelete = (id) => {
           const config = { method: "delete", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true } }
           axiosApi(`api/userprofile/deletecategory/${id}/`, config, setDeleteData,setContext);
        };	
    


	const submitHandler = (e) => {
		e.preventDefault();
        if(updateId)
        {
			const config = { method: "put", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:formData }
			axiosApi(`api/userprofile/updatecategory/${updateId}/`, config, setUpdateData,setContext);
        }
        else{
            const config = { method: "post", headers: { 'Content-Type': 'multipart/form-data', "Authorization": true }, data:formData }
			axiosApi(`api/userprofile/category/`, config, setSaveData,setContext);
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
				<Input  label='Category Name' type='text' name='name' value={formData.name} onChange={handleChange} required/>
					<button type="submit">{updateId ? "Update": "Add"}</button>
						</form>
			</section></>
      
      
    </div>
    <div className='right'>
    {loadData.is_success && loadData.result.length >0 && 
    <table style={{width:'100%'}}>
        <tbody>
            {
    loadData.result.map((item) => <tr key={item.id}><td>{item.name}</td> <td style={{width:'150px'}}><button style={{ ...ButtonStyles.button, ...ButtonStyles.editButton }} onClick={()=>submitEdit(item.id)}>Edit</button> <button style={{ ...ButtonStyles.button, ...ButtonStyles.deleteButton }} onClick={()=>submitDelete(item.id)}>Delete</button></td></tr>)}
    </tbody>
    </table>
    
    
    }

      
    </div>

  </div>





  )
}

