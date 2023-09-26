import React, { useEffect, useState,useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../assets/styles/Form.scss";
import "../../assets/styles/Utility.scss";
import '../../assets/styles/Input.scss';
import { BASE_URL,MyContext,axiosApi } from "../../utility";
import { toast } from "react-toastify";
import {Spinner} from "..";
import { Input } from "..";
export const UpdateProducts = () => {
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
		category:null,
		price:0,
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
			setFormData({...formData, name:editData.result.name ,img_url:editData.result.img_url, is_available: editData.result.is_available,price: editData.result.price,category:editData.result.category });
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
				category:null,
				price:0,
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
			
							<h2> Product Category</h2>
							<img height="50px" width="50px"  src={formData.img_url} alt="product image"/>
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
				<Input  label='Img Url' type='text' name='img_url' value={formData.img_url} onChange={handleChange} required/>
				<Input  label='price' type='number' name='price' value={formData.price} onChange={handleChange} required/>
				<p style={{textAlign:"left", marginLeft:'10px'}}><input  type='checkbox'  onChange={()=>setFormData({...formData,is_available:(!formData.is_available)})} checked={formData.is_available} /> Is Available</p>
					<button type="submit">{updateId ? "Update": "Add"}</button>
						</form>
			</section></>
      
      
    </div>
    <div className='right'>
    {loadData.is_success && loadData.result.length >0 && 
    <table style={{width:'100%'}}>
        <tbody>
            {
    loadData.result.map((item) =><tr key={item.id}><td>{item.name}</td><td><img width="50px" height="40px" src={item.img_url}/></td><td>{item.price}</td><td>{item.is_available ? "Yes": "No"}</td><td style={{width:'150px'}}><button style={{ ...ButtonStyles.button, ...ButtonStyles.editButton }}
	onClick={()=>submitEdit(item.id)}>Edit</button> <button style={{ ...ButtonStyles.button, ...ButtonStyles.deleteButton }}
	onClick={()=>submitDelete(item.id)}>Delete</button></td></tr>)
}
    </tbody>
    </table>
    
    
    }

      
    </div>

  </div>





  )
}

