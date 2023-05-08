import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPlus, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function AddProductCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function fetchCategoriesData() {
      const response = await fetch(`http://${window.location.hostname}:8000/categoryapi/`);
      const data = await response.json();
      setCategories(data);
    }

    fetchCategoriesData();
  }, []);

  const [state, setState] = useState({
    category_name: '',
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setState({
      ...state,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const userData = {
      category_name: state.category_name,
    };

    axios
      .post(`http://${window.location.hostname}:8000/categoryapi/`, userData)
      .then((response) => {
        if (response.status === 201) {
          const categoryName = state.category_name;
          toast.success(`Category "${categoryName}" has been added successfully!`);

          setState({
            category_name: '',
          });

          // Update the list of categories
          setCategories([...categories, response.data]);

          setTimeout(() => {
            // navigate('/login');
          }, 3000);
        } else {
          toast.error('Category registration error. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('Category registration error. Please try again.');
        console.log(error);
      });
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://${window.location.hostname}:8000/categorydeleteapi/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const updatedCategories = categories.filter((category) => category.id !== id);
          setCategories(updatedCategories);
          const deletedCategory = categories.find((category) => category.id === id);
          const categoryName = deletedCategory ? deletedCategory.category_name : '';
          toast.warning(`Category "${categoryName}" has been deleted successfully!`);
        } else {
          toast.error('Category deletion error. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('Category deletion error. Please try again.');
        console.log(error);
      });
  };

  const [showAddForm, setShowAddForm] = useState(false);

  const handleShowAddForm = () => {
    setShowAddForm(true);
  };

  const handleCloseAddForm = () => {
    setShowAddForm(false);
  };








  //FOR SUB CATEGORIES


  const [categories1, setCategories1] = useState([]);

  useEffect(() => {
    async function fetchCategoriesData1() {
      const response = await fetch(`http://${window.location.hostname}:8000/subcategoryapi/`);
      const data = await response.json();
      setCategories1(data);
    }

    fetchCategoriesData1();
  }, []);

  const [state1, setState1] = useState({
    sub_category_name: '',
  });

  const handleChange1 = (e) => {
    const value = e.target.value;
    setState({
      ...state1,
      [e.target.name]: value,
    });
  };

  const handleSubmit1 = (e) => {
    e.preventDefault();

    const userData = {
      sub_category_name: state1.sub_category_name,
    };

    axios
      .post(`http://${window.location.hostname}:8000/subcategoryapi/`, userData)
      .then((response) => {
        if (response.status === 201) {
          const categoryName1 = state1.sub_category_name;
          toast.success(`Category "${categoryName1}" has been added successfully!`);

          setState({
            sub_category_name: '',
          });

          // Update the list of categories
          setCategories1([...categories1, response.data]);

          setTimeout(() => {
            // navigate('/login');
          }, 3000);
        } else {
          toast.error('Category registration error. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('Category registration error. Please try again.');
        console.log(error);
      });
  };

  const handleDelete1 = (id) => {
    axios
      .delete(`http://${window.location.hostname}:8000/subcategorydeleteapi/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const updatedCategories1 = categories1.filter((category1) => category1.id !== id);
          setCategories1(updatedCategories1);
          const deletedCategory1 = categories1.find((category1) => category1.id === id);
          const categoryName1 = deletedCategory1 ? deletedCategory1.sub_category_name : '';
          toast.warning(`Category "${categoryName1}" has been deleted successfully!`);
        } else {
          toast.error('Category deletion error. Please try again.');
        }
      })
      .catch((error) => {
        toast.error('Category deletion error. Please try again.');
        console.log(error);
      });
  };

  const [showAddForm1, setShowAddForm1] = useState(false);

  const handleShowAddForm1 = () => {
    setShowAddForm1(true);
  };

  const handleCloseAddForm1 = () => {
    setShowAddForm1(false);
  };




    //FOR SUB SUB CATEGORY


    const [categories2, setCategories2] = useState([]);

    useEffect(() => {
      async function fetchCategoriesData1() {
        const response = await fetch(`http://${window.location.hostname}:8000/subsubcategoryapi/`);
        const data = await response.json();
        setCategories1(data);
      }
  
      fetchCategoriesData1();
    }, []);
  
    const [state2, setState2] = useState({
      sub_sub_category_name: '',
    });
  
    const handleChange2 = (e) => {
      const value = e.target.value;
      setState({
        ...state2,
        [e.target.name]: value,
      });
    };
  
    const handleSubmit2 = (e) => {
      e.preventDefault();
  
      const userData = {
        sub_sub_category_name: state1.sub_sub_category_name,
      };
  
      axios
        .post(`http://${window.location.hostname}:8000/subsubcategoryapi/`, userData)
        .then((response) => {
          if (response.status === 201) {
            const categoryName2 = state2.sub_sub_category_name;
            toast.success(`Category "${categoryName2}" has been added successfully!`);
  
            setState({
              sub_sub_category_name: '',
            });
  
            // Update the list of categories
            setCategories1([...categories2, response.data]);
  
            setTimeout(() => {
              // navigate('/login');
            }, 3000);
          } else {
            toast.error('Category registration error. Please try again.');
          }
        })
        .catch((error) => {
          toast.error('Category registration error. Please try again.');
          console.log(error);
        });
    };
  
    const handleDelete2 = (id) => {
      axios
        .delete(`http://${window.location.hostname}:8000/subsubcategorydeleteapi/${id}`)
        .then((response) => {
          if (response.status === 204) {
            const updatedCategories2 = categories2.filter((category2) => category2.id !== id);
            setCategories2(updatedCategories2);
            const deletedCategory2 = categories2.find((category2) => category2.id === id);
            const categoryName2 = deletedCategory2 ? deletedCategory2.sub_category_name : '';
            toast.warning(`Category "${categoryName2}" has been deleted successfully!`);
          } else {
            toast.error('Category deletion error. Please try again.');
          }
        })
        .catch((error) => {
          toast.error('Category deletion error. Please try again.');
          console.log(error);
        });
    };
  
    const [showAddForm2, setShowAddForm2] = useState(false);
  
    const handleShowAddForm2 = () => {
      setShowAddForm2(true);
    };
  
    const handleCloseAddForm2 = () => {
      setShowAddForm2(false);
    };




  return (
    <div className='register'>
      <div className='all-warehouses'>
        <h2>All Categories</h2>
        <button className='add-btn' onClick={() => setShowAddForm(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        
        <ul>
        {categories.map((category) => (
        <div key={category.id} className='categories'>
          {/* Category Data feom below line */}
          <h2>{category.category_name}  </h2>
          
          <button className='add-btn' onClick={() => setShowAddForm1(true)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
          <button className='delete-btn' onClick={() => handleDelete(category.id)}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
          <ul>
            {categories1
              .filter((catrgory1) => catrgory1.category === category.id)
              .map((catrgory1) => (
                <li key={catrgory1.id}>
                  <h3>
                    {catrgory1.sub_category_name}
                  </h3>
                  <button className='delete-btn' onClick={() => handleDelete1(catrgory1.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                  
                </li>
            ))}
            {showAddForm1 && (

<div className='register-inner'>
  <h1>Add a new Sub-Category</h1>
  <button className='close-btn' onClick={() => setShowAddForm1(false)}><FontAwesomeIcon icon={faXmark} /></button>
  <form onSubmit={handleSubmit1} method='post'>
    <div className='cw-add'>
      <div>
        <label htmlFor='sub_category_name'>
          Sub-Category Name
          <input type='text' name='sub_category_name' value={state.sub_category_name} onChange={handleChange1} />
        </label>
      </div>
    </div>
    <button id='cw-add-btn' className='btn btn-primary' type='submit'>
      Add Sub Category
    </button>
  </form>
  <br />
</div>
)}
          </ul>
        </div>
      ))}
        </ul>
      </div>
      {showAddForm && (

        <div className='register-inner'>
          <h1>Add a new Category</h1>
          <button className='close-btn' onClick={() => setShowAddForm(false)}><FontAwesomeIcon icon={faXmark} /></button>
          <form onSubmit={handleSubmit} method='post'>
            <div className='cw-add'>
              <div>
                <label htmlFor='category_name'>
                  Category Name
                  <input type='text' name='category_name' value={state.category_name} onChange={handleChange} />
                </label>
              </div>
            </div>
            <button id='cw-add-btn' className='btn btn-primary' type='submit'>
              Add Category
            </button>
          </form>
          <br />
        </div>
      )}
      </div>
  )
      }


      
      
      