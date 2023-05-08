import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';




export default function AddProductCategories() {
  const [warehouses, setWarehouses] = useState([]);

  useEffect(() => {
    async function fetchWarehouseData() {
      const response = await fetch(`http://${window.location.hostname}:8000/categoryapi/`);
      const data = await response.json();
      setWarehouses(data);
    }

    fetchWarehouseData();
  }, []);


  // const [warehousesaddress, setWarehousesaddress] = useState([]);

  // useEffect(() => {
  //   async function fetchWarehouseaddressData() {
  //     const response = await fetch(`http://${window.location.hostname}:8000/subcategoryapi/`);
  //     const data = await response.json();
  //     setWarehousesaddress(data);
  //   }

  //   fetchWarehouseaddressData();
  // }, []);

  // const [warehouses1, setWarehouses1] = useState([]);

  // useEffect(() => {
  //   async function fetchWarehouseData1() {
  //     const response = await fetch(`http://${window.location.hostname}:8000/subsubcategoryapi/`);
  //     const data = await response.json();
  //     setWarehouses1(data);
  //   }

  //   fetchWarehouseData1();
  // }, []);



    const [state, setState] = useState({
      category_name: "",
       
    });

    


    const handleChange = (e) => {
        const value = e.target.value;
        setState({
            ...state,
            [e.target.name]: value
        });
        
    };

    const handleSubmit = (e) => {
        e.preventDefault();

       

        const userData = {
          category_name: state.category_name,
            
        };

        axios.post(`http://${window.location.hostname}:8000/categoryapi/`, userData)
            .then((response) => {
                if (response.status === 201) {
                    toast.success("You have been successfully registered! Please Wait, redirecting to Login...");
                    setState({
                        category_name: "",
                        
                    });
                    //navigate('/login'); // redirect to login page
                    // Delay the navigation by 5 seconds
                    setTimeout(() => {
                        // navigate('/login');
                    }, 3000);

                } else {
                    toast.error("Registration error. Please try again.");
                }
            })
            .catch((error) => {
                toast.error("Registration error. Please try again.");
                console.log(error);
            });
            
    };


    return (

        

        <div className='register'>
            <div className='all-warehouses'>
      <h2>All Categiries Data</h2>
      <ul>Category
        {warehouses.map((warehouse) => (
          <li key={warehouse.id}>
            <h3>{warehouse.id}. {warehouse.category_name}</h3>
            
            
          </li>
        ))}
        {/* Sub-category
        {warehousesaddress.map((warehouseaddress) => (
          <li key={warehousesaddress.id}>
            <h3>{warehouseaddress.id}. {warehouseaddress.sub_category_name}</h3>
            <h3>{warehouseaddress.pincode}</h3>
            
            
            
          </li>
        ))}
Sub-sub-Category
{warehouses1.map((warehouse1) => (
          <li key={warehouse1.id}>
            <h3>{warehouse1.id}. {warehouse1.sub_sub_category_name}</h3>
            
            
          </li>
        ))} */}
      </ul>
    </div>

    
            <div className='register-inner'>

                

                <h1>Add a new Category</h1>
                
                <form  onSubmit={handleSubmit} method='post'>
                    <div className='cw-add'>
                        <div>
                    <label htmlFor="category_name">
                        Category Name
                        <input
                            type="text"
                            name="category_name"
                            value={state.category_name}
                            onChange={handleChange}
                        />
                    </label>
                    </div>
                    </div>
                    <button id='cw-add-btn' className='btn btn-primary' type="submit" >Add Category</button>
                </form>
                <br></br>
                {/* <ToastContainer autoClose={2000} theme="colored"/> */}
            </div>

            
            
        </div>

    );
};
