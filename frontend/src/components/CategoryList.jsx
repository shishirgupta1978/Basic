import {PiToggleRightFill,PiToggleLeftFill} from 'react-icons/pi'
import React,{useState,useEffect,useContext} from 'react'
import { NavLink } from 'react-router-dom';
import { axiosApi,MyContext } from '../utility';
import { toast } from 'react-toastify';
import { Input } from '.';


export const CategoryList = (props) => {
  const { context,setContext } = useContext(MyContext);
	const [source, setSource] = useState(null);
  console.log(props.data)
  const [isOpen,setIsOpen]=useState(true);
  const toggle =()=>{
    setIsOpen(!isOpen);
  }

  


   
  return (
    <div className={`sidebar ${isOpen ? 'open' : ''}`}>
      
      <button className="toggle-button" onClick={toggle}>
        {isOpen ?        <PiToggleRightFill />:<PiToggleLeftFill   />}
      </button>

      <div className="sidebar-menu">
      <NavLink  onClick={(e)=>{e.preventDefault();props.setCategoryid(0)}}>ALL</NavLink>
		{/*	<NavLink to="/dashboard/utility">Utility</NavLink>
      <NavLink to="/dashboard/task2">Task2</NavLink>*/}
    {props.data.map((key)=><NavLink key={key.id}  onClick={(e)=>{props.setCategoryid(key.id)}} >{key.name}</NavLink> )}
      
      </div>
           
    </div>
  );
};

