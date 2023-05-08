import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faXmark, faSquareCaretDown, faSquareCaretUp } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CategoryExpandButton from './CategoryExpandButton';

const API_URL = `http://${window.location.hostname}:8000`;

function AddProductCategories() {
  const [categories, setCategories] = useState([]);
  const [categories1, setCategories1] = useState([]);
  const [categories2, setCategories2] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showAddForm1, setShowAddForm1] = useState(false);
  const [showAddForm2, setShowAddForm2] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState(null);
  const [selectedSubSubCategoryId, setSelectedSubSubCategoryId] = useState(null);
  const [selectedCategorySubcategories, setSelectedCategorySubcategories] = useState([]);
  const [selectedSubCategorySubcategories, setSelectedSubCategorySubcategories] = useState([]);
  const [isCategoryExpanded, setIsCategoryExpanded] = useState(false);
  const [isSubCategoryExpanded, setIsSubCategoryExpanded] = useState(false);
  const [isSecondCategoryExpanded, setIsSecondCategoryExpanded] = useState(false);
  const [state, setState] = useState({
    category_name: '',
  });
  const [state1, setState1] = useState({
    sub_category_name: '',
    category: '',
  });
  const [state2, setState2] = useState({
    sub_sub_category_name: '',
    sub_category: '',
  });

  useEffect(() => {
    axios.get(`${API_URL}/categoryapi`).then((response) => {
      setCategories(response.data);
    });
    axios.get(`${API_URL}/subcategoryapi`).then((response) => {
      setCategories1(response.data);
    });
    axios.get(`${API_URL}/subsubcategoryapi`).then((response) => {
      setCategories2(response.data);
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
          const updatedCategories1 = categories1.filter((category1) => category1.id !== id);
          setCategories1(updatedCategories1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleDelete2 = (id) => {
    axios
      .delete(`${API_URL}/subsubcategorydeleteapi/${id}`)
      .then((response) => {
        if (response.status === 204) {
          const updatedCategories2 = categories2.filter((category2) => category2.id !== id);
          setCategories1(updatedCategories2);
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

  const handleChange2 = (event) => {
    setState2({ ...state2, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${API_URL}/categoryapi/`, { category_name: state.category_name })
      .then((response) => {
        //console.log(response.data); // Add this line
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
    console.log(state1); // Log the data before posting
    axios
      .post(`${API_URL}/subcategoryapi/`, { ...state1, category: selectedCategoryId })
      .then((response) => {
        //console.log(response.data); // Add this line
        const newCategory1 = response.data;
        setCategories1([...categories1, newCategory1]);
        setState1({ sub_category_name: '', category: '' });
        setShowAddForm1(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubmit2 = (event) => {
    event.preventDefault();
    console.log(state2); // Log the data before posting
    axios
      .post(`${API_URL}/subsubcategoryapi/`, { ...state2, sub_category: selectedSubCategoryId })
      .then((response) => {
        //console.log(response.data); // Add this line
        const newCategory2 = response.data;
        setCategories2([...categories2, newCategory2]);
        setState1({ Sub_sub_category_name: '', sub_category: '' });
        setShowAddForm2(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubcategoryClick = (id) => {
    setSelectedCategoryId(id);
    setSelectedSubCategoryId(null); // Reset selected subcategory ID
    axios
      .get(`${API_URL}/subcategoryapi/?category=${id}`)
      .then((response) => {
        setSelectedCategorySubcategories(response.data);
        setIsCategoryExpanded(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleSubSubcategoryClick = (id) => {
    setSelectedSubCategoryId(id);
    setSelectedSubSubCategoryId(null); // Reset selected subcategory ID
    axios
      .get(`${API_URL}/subcategoryapi/?category=${id}`)
      .then((response) => {
        setSelectedSubCategorySubcategories(response.data);
        setIsCategoryExpanded(true);
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
        {showAddForm && (
    <div className="register-inner">
      <h1>Add a new Category</h1>
      <button
        className="close-btn"
        onClick={() => setShowAddForm(false)}
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>
      <form onSubmit={handleSubmit} method="post">
        <div className="cw-add">
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
        <button
          id="cw-add-btn"
          className="btn btn-primary"
          type="submit"
        >
          Add Category
        </button>
      </form>
      <br />
    </div>
  )}
        <ul>
        {categories.map((category) => (
  <div key={category.id} className="categories">
    <h2>{category.category_name} </h2>
    <button
      className="exp-cat-btn"
      onClick={() => {
        setSelectedCategoryId(category.id);
        setIsCategoryExpanded((prev) =>
          prev && selectedCategoryId === category.id ? false : true
        );
      }}
    >
      <FontAwesomeIcon
        icon={
          category.id === selectedCategoryId
            ? isCategoryExpanded
              ? faSquareCaretUp
              : faSquareCaretDown
            : faSquareCaretDown
        }
      />
    </button>
    <button className="delete-btn-category" onClick={() => handleDelete(category.id)}>
      <FontAwesomeIcon icon={faTrash} />
    </button>

    {isCategoryExpanded && selectedCategoryId === category.id ? (
      <ul>
        {categories1.map((subCategory) =>
          subCategory.category === category.id ? (
            <div key={subCategory.id} className="sub-categories">
              <li>{subCategory.sub_category_name}
              
              {/* THIS PLACE to add Sub Cat Code */}


              <button
      className="exp-cat-btn"
      onClick={() => {
        setSelectedSubCategoryId(subCategory.id);
        setIsSubCategoryExpanded((prev) =>
          prev && selectedCategoryId === subCategory.id ? false : true
        );
      }}
    >
      <FontAwesomeIcon
        icon={
          subCategory.id === selectedSubCategoryId
            ? isSubCategoryExpanded
              ? faSquareCaretUp
              : faSquareCaretDown
            : faSquareCaretDown
        }
      />
    </button>
    <button className="delete-btn-category" onClick={() => handleDelete(subCategory.id)}>
      <FontAwesomeIcon icon={faTrash} />
    </button>

    {isSubCategoryExpanded && selectedSubCategoryId === subCategory.id ? (
      <ul>
        {categories2.map((subSubCategory) =>
          subSubCategory.sub_category === subCategory.id ? (
            <div key={subSubCategory.id} className="sub-categories">
              <li>{subSubCategory.sub_sub_category_name}
              
              {/* THIS PLACE to add Sub Cat Codes */}
              
              </li>
              <button
                className="delete-btn"
                onClick={() => handleDelete1(subCategory.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>





            </div>
          ) : null
        )}
        Add New Sub Category
        <button
          className="sub-cat-add-btn"
          onClick={() => setShowAddForm1(!showAddForm1)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {selectedCategoryId && (
  <div className="sub-categories">
    {selectedCategorySubcategories.map((subcategory) => (
      <div
        key={subcategory.id}
        className={`subcategory ${
          selectedSubCategoryId === subcategory.id ? 'active' : ''
        }`}
        onClick={() => setSelectedSubCategoryId(subcategory.id)}
      >
        {subcategory.sub_category_name}
      </div>
    ))}
    
</div>
)}

        {showAddForm1 && (
          <div className="add-sub-cat-main-div">
            <h1>Add a new Sub-Category</h1>
            <button
              className="close-btn"
              onClick={() => setShowAddForm1(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <form onSubmit={handleSubmit1} method="post">
              <div className="cw-add">
                <div>
                  <label htmlFor="sub_category_name">
                    Sub-Category Name
                    <input
                      type="text"
                      name="sub_category_name"
                      value={state1.sub_category_name}
                      onChange={handleChange1}
                    />
                  </label>
                </div>
              </div>
              <button
                id="cw-add-btn"
                className="btn btn-primary"
                type="submit"
              >
                Add Sub-Category
              </button>
            </form>
            <br />
          </div>
        )}
      </ul>
    ) : null}


              {/* This place subcat end */}
              
              </li>
              <button
                className="delete-btn"
                onClick={() => handleDelete1(subCategory.id)}
              >
                <FontAwesomeIcon icon={faTrash} />
              </button>





            </div>
          ) : null
        )}
        Add New Sub Category
        <button
          className="sub-cat-add-btn"
          onClick={() => setShowAddForm1(!showAddForm1)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </button>

        {selectedCategoryId && (
  <div className="sub-categories">
    {selectedCategorySubcategories.map((subcategory) => (
      <div
        key={subcategory.id}
        className={`subcategory ${
          selectedSubCategoryId === subcategory.id ? 'active' : ''
        }`}
        onClick={() => setSelectedSubCategoryId(subcategory.id)}
      >
        {subcategory.sub_category_name}
      </div>
    ))}
    
</div>
)}

        {showAddForm1 && (
          <div className="add-sub-cat-main-div">
            <h1>Add a new Sub-Category</h1>
            <button
              className="close-btn"
              onClick={() => setShowAddForm1(false)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
            <form onSubmit={handleSubmit1} method="post">
              <div className="cw-add">
                <div>
                  <label htmlFor="sub_category_name">
                    Sub-Category Name
                    <input
                      type="text"
                      name="sub_category_name"
                      value={state1.sub_category_name}
                      onChange={handleChange1}
                    />
                  </label>
                </div>
              </div>
              <button
                id="cw-add-btn"
                className="btn btn-primary"
                type="submit"
              >
                Add Sub-Category
              </button>
            </form>
            <br />
          </div>
        )}
      </ul>
    ) : null}
  </div>
))}
    </ul>
  </div>
  
</div>
);
}

export default AddProductCategories;





