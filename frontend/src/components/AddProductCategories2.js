import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const API_URL = `http://${window.location.hostname}:8000`;

function AddProductCategories() {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddForm1, setShowAddForm1] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [state, setState] = useState({
    category_name: '',
  });
  const [state1, setState1] = useState({
    sub_category_name: '',
    category: '',
  });

  useEffect(() => {
    axios.get(`${API_URL}/categoryapi`).then((response) => {
      setCategories(response.data);
    });
    axios.get(`${API_URL}/subcategoryapi`).then((response) => {
      setSubCategories(response.data);
    });
  }, []);

  const handleDelete = (id) => {
    axios
      .delete(`${API_URL}/categorydeleteapi/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const updatedCategories = categories.filter((category) => category.id !== id);
          setCategories(updatedCategories);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete1 = (id) => {
    axios
      .delete(`${API_URL}/subcategorydeleteapi/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const updatedSubCategories = subCategories.filter((subCategory) => subCategory.id !== id);
          setSubCategories(updatedSubCategories);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleChange1 = (event) => {
    setState1({ ...state1, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/categoryapi/`, { category_name: state.category_name })
      .then((response) => {
        const newCategory = response.data;
        setCategories([...categories, newCategory]);
        setState({ category_name: '' });
        setShowAddForm(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit1 = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/subcategoryapi/`, { ...state1, category: selectedCategoryId })
      .then((response) => {
        const newSubCategory = response.data;
        setSubCategories([...subCategories, newSubCategory]);
        setState1({ sub_category_name: '', category: '' });
        setShowAddForm1(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  




  return (
    <div className="register">
      <div className="all-warehouses">
        <h2>All Categories</h2>
        <button className="add-btn" onClick={() => setShowAddForm(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
        <div className="warehouse-list">
{categories.map((category) => (
<div key={category.id} className="category">
<h3>{category.name}</h3>
<p>{category.description}</p>
<button className="delete-btn" onClick={() => handleDelete(category.id)}>Delete</button>
</div>
))}
</div>
</div>
{showAddForm && (
<div className="add-form">
<h2>Add New Category</h2>
<form onSubmit={handleSubmit}>
<label htmlFor="name">Category Name:</label>
<input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required />
<label htmlFor="description">Category Description:</label>
<textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
<button type="submit">Add Category</button>
</form>
<button className="cancel-btn" onClick={() => setShowAddForm(false)}>Cancel</button>
</div>
)}
</div>
);
}

export default AddProductCategories;