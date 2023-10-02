import React, { useEffect, useState,useContext } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { Table,Button } from "react-bootstrap";
import { BASE_URL,MyContext,axiosApi } from "../utility";
import { toast } from "react-toastify";
import {Spinner,Input} from ".";
export const UpdateCategories = () => {
  
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
			
						<form onSubmit={submitHandler}>
				<Input  label='Category Name' type='text' name='name' value={formData.name} onChange={handleChange} required/>
					<Button type="submit" className="mt-2" variant="dark" >{updateId ? "Update": "Add"}</Button>
						</form>
			</section></>
      
      
    </div>
    <div className='right'>
    {loadData.is_success && loadData.result.length >0 && 
							<>	
    <Table striped bordered hover variant="light" style={{width:'100%'}}>
		
		<thead><tr><th>Category</th><th>Action</th></tr></thead>
        <tbody>
            {
    loadData.result.map((item) => <tr key={item.id}><td>{item.name}</td> <td style={{width:'170px'}}><Button  type="button" variant="outline-dark" onClick={()=>submitEdit(item.id)}>Edit</Button> <Button type="button" className="mx-2" variant="dark" onClick={()=>submitDelete(item.id)}>Delete</Button></td></tr>)}
    </tbody>
    </Table>
    
    </>
    }

      
    </div>

  </div>





  )
}

