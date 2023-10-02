import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL,MyContext,axiosApi } from "../utility";
import { Table,Button } from "react-bootstrap";

import { toast } from "react-toastify";
import {Spinner,Input} from ".";
export const UpdateProducts = () => {
		


	const [categories, setCategories]=useState([])
	const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const [loadCategory, setLoadCategory] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [saveData, setSaveData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [updateData, setUpdateData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [editData, setEditData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    const [deleteData, setDeleteData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
    
	const { context,setContext } = useContext(MyContext);
    const [ updateId,setUpdateId] = useState(null);

	const [formData, setFormData] = useState({
		name:'',
		img_url:'',
		img_url2:'',
		img_url3:'',
		img_url4:'',
		description:'',
		category:null,
		price:0,
		discount:0,
		is_available:true

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

		axiosApi(`api/userprofile/get-product-categories/`, config, setLoadCategory, setContext);

		
	},[saveData.is_success,deleteData.is_success,updateData.is_success])


	useEffect(()=>{
		if(editData.is_success)
		{
			setFormData({...formData, name:editData.result.name ,img_url:editData.result.img_url,img_url2:editData.result.img_url2,img_url3:editData.result.img_url3,img_url4:editData.result.img_url4, is_available: editData.result.is_available,price: editData.result.price,discount: editData.result.discount,category:editData.result.category });
		}
	},[editData.is_success])


	useEffect(()=>{
		if(loadCategory.is_success)
		{
			setCategories(loadCategory.result);
			if(loadCategory.result.length >0)
			{
				setFormData({...formData,category:loadCategory.result[0].id})
			}
		}
	},[loadCategory.is_success])

    useEffect(()=>{
		if(updateData.is_success)
		{
			toast.success("Record updated successfully.");
			setUpdateId(null);
            setFormData({
				name:'',
				img_url:'',
				img_url2:'',
				img_url3:'',
				img_url4:'',
				description:'',
				category:null,
				price:0,
				discount:0,
				is_available:true		
			  })
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
			
						{formData.img_url &&	<img height="50px" width="50px"  src={formData.img_url} alt="product image"/>}
						<form onSubmit={submitHandler}>
	{formData.category &&		<>			<div className="material-input">
      <label>Select Category</label>
      <div className="input-container">
	  <select
        value={formData.category}
        onChange={(e) => {
          setFormData({...formData, category:e.target.value});
        }}
      required >

	 { categories && categories.length > 0 && categories.map((category)=><option key={category.id} value={category.id} defaultValue={formData.category == category.name? true :false }>{category.name}</option>)}
	</select>


      </div>
    </div></>}
				<Input  label='Product Name' type='text' name='name' value={formData.name} onChange={handleChange} required/>
				<div className="material-input">
				<label>Description</label>
				
		      <div className="input-container"><textarea name='description' value={formData.description} rows="3" onChange={handleChange}/></div></div>


				<Input  label='Img Url' type='text' name='img_url' value={formData.img_url} onChange={handleChange} required/>
				<Input  label='Img Url2' type='text' name='img_url2' value={formData.img_url2} onChange={handleChange}/>
				<Input  label='Img Url3' type='text' name='img_url3' value={formData.img_url3} onChange={handleChange}/>
				<Input  label='Img Url4' type='text' name='img_url4' value={formData.img_url4} onChange={handleChange}/>
				<Input  label='Price(Rs.)' type='number' name='price' value={formData.price} onChange={handleChange}/>
				<Input  label='Discount(%)' type='number' name='discount' value={formData.discount} onChange={handleChange}/>
				<p style={{textAlign:"left", marginLeft:'10px'}}><input  type='checkbox'  onChange={()=>setFormData({...formData,is_available:(!formData.is_available)})} checked={formData.is_available} /> Is Available</p>
					<Button type="submit" className="mt-2" variant="dark">{updateId ? "Update": "Add"} Product</Button>
						</form>
			</section></>
      
      
    </div>
    <div className='right'>
    {loadData.is_success && loadData.result.length >0 && 
    <Table striped bordered hover variant="light" style={{width:'100%'}}>
	<thead><tr><th>Name</th><th>Pic</th><th>Price</th><th>Availablity</th><th>Category</th><th>Action</th></tr></thead>
        <tbody>
            {
    loadData.result.map((item) =><tr key={item.id}><td>{item.name}</td><td><img width="50px" height="40px" src={item.img_url}/></td><td>{item.price}</td><td>{item.is_available ? "Yes": "No"}</td><td>{item.category_name}</td><td style={{width:'170px'}}><Button type="button" variant="outline-dark" onClick={()=>submitEdit(item.id)}>Edit</Button> <Button  type="button" className="mx-2" variant="dark" onClick={()=>submitDelete(item.id)}>Delete</Button></td></tr>)
}
    </tbody>
    </Table>
    
    
    }

      
    </div>

  </div>





  )
}

